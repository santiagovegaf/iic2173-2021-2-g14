#!/bin/bash
pwd=$( aws ecr get-login-password )
docker container stop $(docker container ls -aq)
docker login -u AWS -p $pwd 238507319080.dkr.ecr.us-east-2.amazonaws.com
docker pull 238507319080.dkr.ecr.us-east-2.amazonaws.com/f1ntu4l:latest
