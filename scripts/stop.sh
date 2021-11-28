#!/bin/bash
docker-compose -f /home/ubuntu/iic2173-2021-2-g14/docker-compose.yml down
docker stop $(docker ps -a -q)