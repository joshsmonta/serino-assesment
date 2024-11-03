# Use the official Node.js LTS image as the base
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the server will run on
EXPOSE 3000

# Define the command to run the server
CMD ["node", "server.js"]