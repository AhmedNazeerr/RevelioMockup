# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript application
RUN npm run build

# Expose the port that the app will run on
EXPOSE 4173

# Set the command to run your production server
CMD ["npm", "run", "preview"]
