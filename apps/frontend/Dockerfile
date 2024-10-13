# Stage 1: Build the Angular app
FROM node:lts-Hydrogen AS build

WORKDIR /app

COPY ../../package.json ./

RUN npm install -g pnpm

RUN npm install -g nx@19

RUN pnpm install --prod=true --ignore-scripts

COPY . .

CMD ["nx", "run", "frontend:build"]

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

COPY --from=build /app/dist/apps/frontend/browser/* /usr/share/nginx/html

COPY --from=build /app/apps/frontend/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
