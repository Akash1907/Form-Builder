# Use official Node.js image as base
FROM node:20.11.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js application
#RUN npm run build

# Expose the port that the Next.js application will run on
EXPOSE 3000

# Command to run the Next.js application
CMD ["npm", "run", "dev"]
