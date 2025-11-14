# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the app source code
COPY . .

# Expose app port
EXPOSE 5000

# Start the server
CMD ["node", "src/server.js"]
