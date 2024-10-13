# Use the official Node.js image
FROM node:lts-Hydrogen

# Create a directory for the app
WORKDIR /usr/src/app

# Copy the package files and install dependencies
COPY ../../package.json ./

RUN npm install -g pnpm

RUN npm install -g nx

RUN pnpm install --prod=true --ignore-scripts

# Copy the rest of the app's code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the NestJS app
CMD ["nx", "serve", "backend"]
