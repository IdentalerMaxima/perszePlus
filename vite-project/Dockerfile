# Use the official Node.js image as the base image
FROM node:14 as build

# Set the working directory
WORKDIR /app

# Define the build argument
ARG VITE_BACKEND_URL

# Set the environment variable for the build
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight server to serve the static files
FROM nginx:alpine

# Copy the build files to the nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration to handle SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
