# Use an official Node.js runtime as the base image
FROM node:20.7.0 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code including production .env
COPY . .
COPY .env.production .env

# Build the Vite app for production
RUN npm run build

# Use Nginx to serve the app
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
