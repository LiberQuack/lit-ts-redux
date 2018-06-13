#!/usr/bin/env bash

if [[ ! -f /tmp/compiled ]]; then
    npm run dist &&
    rm -rf /var/www/html &&
    ln -sf /app/dist /var/www/html &&
    echo "" > /tmp/compiled &&
    echo "Project compiled"
else
    echo "Project already compiled"
fi

if [[ "$@" == 'bash' || "$@" == 'sh' ]]; then
    "$@"
else
    "$@" &
    wait
fi
