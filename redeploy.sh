#!/bin/bash

sudo lsof -i:27017 | awk '{print $2}' | awk 'NR==2' | xargs -I {} sudo kill -9 {}
sudo docker compose up --build
