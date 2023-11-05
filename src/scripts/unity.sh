#!/usr/bin/env bash

# Get file sizes
unityDataSize=$(wc -c <src/assets/Build/unity_build.data)
unityWasmSize=$(wc -c <src/assets/Build/unity_build.wasm)

# Create JSON
json=$(jq -n \
  --arg udSize "$unityDataSize" \
  --arg uwSize "$unityWasmSize" \
  '{
    "unity_build.data": $udSize,
    "unity_build.wasm": $uwSize
  }')

# Write JSON to file
echo "$json" > dist/unity/UnityBuildSize.json
