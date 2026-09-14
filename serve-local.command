#!/bin/bash
set -e
cd "$(dirname "$0")"
mkdir -p models
if [ ! -s models/brain.glb ]; then
  echo "Downloading brain model..."
  curl -L --fail --retry 5 --retry-delay 2     "https://raw.githubusercontent.com/itayinbarr/brainproject/main/brain-atlas/models/brain.glb"     -o models/brain.glb
fi
printf "\nLocal site: http://localhost:8000\nPress Control-C to stop.\n\n"
python3 -m http.server 8000
