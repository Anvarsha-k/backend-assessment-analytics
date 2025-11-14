# Use official Node.js LTS
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install ALL dependencies (Render handles pruning itself)
RUN npm install

# Copy the rest of the code
COPY . .

# Render will detect the port automatically
EXPOSE 10000

# Start the backend
CMD ["npm", "start"]
