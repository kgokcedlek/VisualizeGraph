# Use a Node.js base image
FROM node:18 as build-stage

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code and build the Angular app
COPY . .
RUN npm run build -- --output-path=dist

# Use a lightweight Nginx image to serve the static files
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose the port the app will run on
EXPOSE 80
