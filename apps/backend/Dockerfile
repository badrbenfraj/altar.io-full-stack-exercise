# Use the official Node.js image
FROM node:18-alpine

# Create a directory for the app
WORKDIR /usr/src/app

# Copy the package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Copy the rest of the app's code
COPY . .

# Build the app
RUN pnpm build

# Expose the application port
EXPOSE 3000

# Start the NestJS app
CMD ["pnpm", "start:prod"]
