# Use a Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code and start the Express server
COPY . .
CMD ["node", "index.js"] # Change "index.js" to your server.js entry file

# Expose the port the app will run on
EXPOSE 3000
