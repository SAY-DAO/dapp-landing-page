#!/bin/bash

set -e

cd client

docker-compose \
    -f docker-compose.yml \
    config > docker-stack.yml

docker stack deploy \
    --prune \
    --with-registry-auth \
    --resolve-image=always \
    -c docker-stack.yml \
    $STACK_NAME