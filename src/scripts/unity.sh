#!/usr/bin/env bash

watch_and_run() {
  while inotifywait -r -e modify,create,delete src/assets/Build/; do
    sleep 3

    buildName=$(ls src/assets/Build/*.loader.js | sed 's/.*\/\(.*\)\.loader\.js/\1/')

    # Your existing script logic here
    # Check for compression format
    if [ -f "src/assets/Build/${buildName}.framework.js.gz" ]; then
        compressionExt=".gz"
    elif [ -f "src/assets/Build/${buildName}.framework.js.br" ]; then
        compressionExt=".br"
    else
        compressionExt=""
    fi

    # Get file sizes using the buildName and compressionExt
    unityDataSize=$(wc -c <"src/assets/Build/${buildName}.data${compressionExt}" 2>/dev/null || echo "0")
    unityWasmSize=$(wc -c <"src/assets/Build/${buildName}.wasm${compressionExt}" 2>/dev/null || echo "0")

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
  done
}

# Run the watch function
watch_and_run
