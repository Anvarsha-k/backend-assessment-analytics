# Use official Node.js LTS
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json + lock files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy entire source
COPY . .

# Expose Render's port (Render sets PORT env)
EXPOSE 10000

# Start the backend
CMD ["npm", "start"]
