# Stage 1: Build the Angular app
FROM node:lts-hydrogen AS build

WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY ../../package.json ./
COPY ../../pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --ignore-scripts

# Stage 2: Build the Angular app
FROM build AS frontend-build

# Copy the frontend source code
COPY . .

# Build the Angular app
RUN npm run build

# Stage 3: Serve the Angular app using Nginx
FROM nginx:alpine

# Copy the built Angular app to Nginx HTML directory
COPY --from=frontend-build /app/dist/apps/frontend/browser/* /usr/share/nginx/html

# Copy Nginx configuration
COPY ./apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
