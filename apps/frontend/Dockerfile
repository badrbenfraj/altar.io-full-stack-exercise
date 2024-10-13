# Stage 1: Build the Angular app
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json ./

COPY pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm build --prod

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

COPY --from=build /app/dist/apps/frontend /usr/share/nginx/html

COPY --from=build /app/apps/frontend/nginx.conf /etc/nginx/nginx.conf  # Copy nginx.conf from the frontend project

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
