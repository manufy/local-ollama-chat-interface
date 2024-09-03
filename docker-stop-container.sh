#!/bin/bash
# stop running ollama-chat-interface container 
docker stop $(docker ps -q --filter name=ollama-chat-interface)