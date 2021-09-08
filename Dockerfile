FROM node:16.8.0-alpine3.13
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV TZ Africa/Nairobi
CMD [ "npm", "start" ]