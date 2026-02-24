FROM node:24-alpine

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Set the working directory
WORKDIR /app