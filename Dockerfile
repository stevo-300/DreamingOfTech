# specify the node base image with your desired version node:<version>
FROM node:latest
# replace this with your application's default port
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]