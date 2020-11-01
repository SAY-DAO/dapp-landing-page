#!/bin/bash

set -e

cd client

sh ./scripts/build.sh

docker push $BASE_IMAGE

docker push $CONTAINER_IMAGE
