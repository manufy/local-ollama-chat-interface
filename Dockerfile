# Use an official Node runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the ollama-chat-interface directory
COPY ollama-chat-interface ./ollama-chat-interface

# Set working directory to the ollama-chat-interface
WORKDIR /app/ollama-chat-interface

# Install dependencies
RUN npm install

# Build the Astro project
RUN npm run build

# Install a simple server to serve static content
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "dist", "-l", "3000"]