# Base image for backend
FROM node:lts-hydrogen AS build

WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY ../../package.json ./
COPY ../../pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --ignore-scripts

# Copy the backend source code
COPY . .

# Build the backend (replace with your actual build command)
RUN npm run build:backend

CMD ["node", "dist/apps/backend/main.js"]
