#!/bin/sh
set -e
chown -R node:node /app/node_modules
[ -f /app/package-lock.json ] && chown node:node /app/package-lock.json
su-exec node npm install
exec su-exec node "$@"
