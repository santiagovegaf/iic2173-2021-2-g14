#!/bin/bash
docker-compose -f /home/ubuntu/aws-codedeploy/docker-compose.yml down
docker stop $(docker ps -a -q)