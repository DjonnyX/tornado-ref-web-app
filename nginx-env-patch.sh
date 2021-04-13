#!/usr/bin/env sh
set -eu

envsubst '${API_ADDRESS}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"