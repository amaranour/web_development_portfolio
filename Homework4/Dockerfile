# Use the official Node.js 16 LTS image as the base
FROM node:16

# Set the working directory inside the container to /Homework3
WORKDIR /Homework4

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install project dependencies using npm
RUN npm install

# Copy the rest of the app's source code from your project's directory to the container
COPY . .

#  exclude files and directories like node_modules or .git by using .dockerignore



# Command to run your app, replace server.js with your app's entry point if different
CMD ["npm", "start"]