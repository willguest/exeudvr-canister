#!/usr/bin/env bash

# Ensure UnityBuildInfo.json exists
if [ ! -f "src/unity/UnityBuildInfo.json" ]; then
    echo '{}' > src/unity/UnityBuildInfo.json
fi

check_files() {
    if ! ls src/assets/Build/*.loader.js* 1> /dev/null 2>&1; then
        echo "Error: Unity build not found, please add your files to the 'src/assets/Build' folder" >&2
        return 1
    else
      process_files
    fi
}

process_files() {
    buildName=$(ls src/assets/Build/*.loader.js | sed 's/.*\/\(.*\)\.loader\.js/\1/')

    # Check compression format
    if [ -f "src/assets/Build/${buildName}.framework.js.gz" ]; then
        compressionExt=".gz"
    elif [ -f "src/assets/Build/${buildName}.framework.js.br" ]; then
        compressionExt=".br"
    elif [ -f "src/assets/Build/${buildName}.framework.js.unityweb" ]; then
        echo "ERROR: Decompression fallback is not supported. Please disable this option in Unity's player settings and rebuild." | tee -a src/unity/unity_watch.log
        exit 1
    else
        compressionExt=""
    fi

    # Get build size
    unityDataSize=$(wc -c <"src/assets/Build/${buildName}.data${compressionExt}" 2>/dev/null || echo "0")
    unityWasmSize=$(wc -c <"src/assets/Build/${buildName}.wasm${compressionExt}" 2>/dev/null || echo "0")

    # Warn if total size exceeds 100MB
    if [ $(( (unityDataSize + unityWasmSize) / 1024 / 1024 )) -gt 100 ]; then
        echo "WARNING: Build exceeds 100MB. It may be slow to load." | tee -a src/unity/unity_watch.log
    fi

    # Create JSON
    json=$(jq -n \
      --arg udSize "$unityDataSize" \
      --arg uwSize "$unityWasmSize" \
      --arg bName "$buildName" \
      --arg cExt "$compressionExt" \
      '{
        "buildName": $bName,
        "compressionExt": $cExt,
        "dataSize": $udSize,
        "wasmSize": $uwSize
      }')

    # Write JSON to file
    echo "$json" > src/unity/UnityBuildInfo.json
}

watch_and_run() {
  while true; do
    inotifywait -e modify,create,delete src/assets/Build/
    sleep 3
    process_files
  done
}

# Run initial check and processing
check_files

# Run the watch function
watch_and_run