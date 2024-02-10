# Use an official lightweight Node.js image as a parent image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock if using Yarn)
COPY package*.json ./
# If using yarn, copy yarn.lock as well
# COPY package.json yarn.lock ./

# Install dependencies in the container
RUN npm install
# If using yarn, run `yarn install` instead
# RUN yarn install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the app for production
RUN npm run build
# If using yarn, run `yarn build` instead
# RUN yarn build

# Install a simple server for serving static content
RUN npm install -g serve
# If using yarn, run `yarn global add serve` instead
# RUN yarn global add serve

# Set the container to listen on port 3000 at runtime.
EXPOSE 3000

# Define the command to run the app using `serve`
CMD ["serve", "-s", "build", "-l", "3000"]
# CMD ["npm", "start"]