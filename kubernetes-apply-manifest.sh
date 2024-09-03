#!/bin/bash

# Apply the Kubernetes configuration
kubectl apply -f kubernetes-deployment.yaml
kubectl apply -f kubernetes-service.yaml