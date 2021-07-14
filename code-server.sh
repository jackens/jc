#!/bin/sh

export SERVICE_URL="https://marketplace.visualstudio.com/_apis/public/gallery"
export ITEM_URL="https://marketplace.visualstudio.com/items"

code-server \
  --auth none \
  --bind-addr 192.168.1.110:443 \
  --cert \
  --disable-telemetry \
  --extensions-dir /mnt/c/Users/jackens/.vscode/extensions \
  ..
