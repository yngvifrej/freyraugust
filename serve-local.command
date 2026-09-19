#!/bin/bash
set -e
cd "$(dirname "$0")"
mkdir -p models assets/sound
if [ ! -s models/brain.glb ]; then
  curl -L --fail --retry 3 "https://raw.githubusercontent.com/itayinbarr/brainproject/main/brain-atlas/models/brain.glb" -o models/brain.glb
fi
if [ ! -s assets/sound/ayakashi.jpg ]; then
  curl -L --fail --retry 3 "https://static.common-ground.io/shops/6/items/1654858928/img-wxe7uk9Mu8.jpg" -o assets/sound/ayakashi.jpg || true
fi
python3 -m http.server 8000
