# Use an official Node.js runtime as a base image
FROM node:18

# Set environment variables
ENV JWT_SECRET=mysecretkey
ENV JWT_LIFETIME=1d
ENV MONGO_URL='mongodb+srv://f200282:Ahmed9211@cluster0.jtmatto.mongodb.net/Revelio?retryWrites=true&w=majority'
ENV PORT=5000

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the application port
EXPOSE $PORT

# Command to run the application
CMD ["npm", "start"]
