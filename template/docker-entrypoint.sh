#!/bin/sh

# Based on https://success.docker.com/article/use-a-script-to-initialize-stateful-container-data

# Properly handle shutdowns
trap 'echo "Sending QUIT to nginx..."; pkill -QUIT nginx; exit 0' INT QUIT TERM

# Modify main entry file
mainFileName="$(ls /usr/share/nginx/html/static/js/main*.js)"
echo "Updating ${mainFileName}..."
envsubst '$DEPLOYMENT_ENV' < ${mainFileName} > main.tmp
mv main.tmp ${mainFileName}

# Run command
echo "Executing command: $@"
exec "$@"
