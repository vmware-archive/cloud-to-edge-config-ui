#!/usr/bin/env bash

ng build
docker build -t skyway-config-ui-image:v1  .
docker run -d -p 80:80 --name skyway-config-ui skyway-config-ui-image:v1
