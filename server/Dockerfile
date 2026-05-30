# Simple production Dockerfile for RoadSoS backend
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --production

# Copy server files
COPY . .

# Create uploads dir
RUN mkdir -p uploads

EXPOSE 5000

CMD ["node", "index.js"]
