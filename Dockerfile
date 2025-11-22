# Build stage
FROM node:24 AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code and the OpenAPI file
COPY . .
COPY openapi.yaml ./openapi.yaml

# Build the TypeScript project
RUN npm run build

# Production stage
FROM node:24 AS production
WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy compiled output and OpenAPI YAML file from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/openapi.yaml ./openapi.yaml

# Expose your application port
EXPOSE 3000

# Start the app
CMD ["node", "dist/app.js"]
