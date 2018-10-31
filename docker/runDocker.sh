#!/usr/bin/env bash

ng build
docker build -t c2e-config-ui-image:v1  .
docker run -d -p 80:80 --name c2e-config-ui c2e-config-ui-image:v1
