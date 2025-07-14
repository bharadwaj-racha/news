# Step 1: Build the React app
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the React app
RUN npm run build


# Step 2: Serve the app using Nginx
FROM nginx:alpine

# Copy build output from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config (for React Router support)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
