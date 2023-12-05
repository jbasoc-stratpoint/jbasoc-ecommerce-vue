# Stage 1: Build the Vue.js application using Node.js
FROM node:latest as build-stage

# Set the working directory in the Docker container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the project files into the Docker container
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:stable-alpine as production-stage

# Copy the built app to the Nginx server
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 to the Docker host, so we can access the container
EXPOSE 80

# Start Nginx when the container has provisioned.
CMD ["nginx", "-g", "daemon off;"]
