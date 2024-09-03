# Ollama Chat Interface

This project is a chat interface for Ollama, built with Astro and packaged in a Docker container for easy deployment.

## Prerequisites

- Docker
- Kubernetes cluster (optional, for Kubernetes deployment)

## Local Development

1. Clone the repository:
   ```
   git clone <repository-url>
   cd ollama-chat-interface
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

## Docker Deployment

1. Build the Docker image:
   ```
   docker build -t ollama-chat-interface .
   ```

2. Run the Docker container:
   ```
   docker run -d -p 3000:3000 --name ollama-chat-interface ollama-chat-interface
   ```

3. Access the application at `http://localhost:3000`.

To stop the container:
```
docker stop ollama-chat-interface
```

## Kubernetes Deployment

1. Ensure your Kubernetes cluster is set up and `kubectl` is configured.

2. Apply the Kubernetes configurations:
   ```
   kubectl apply -f kubernetes-deployment.yaml
   kubectl apply -f kubernetes-service.yaml
   ```

3. Check the status of your deployment and service:
   ```
   kubectl get deployments
   kubectl get services
   ```

4. If using
