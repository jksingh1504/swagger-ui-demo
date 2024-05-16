FROM node:20

COPY package*.json ./

WORKDIR /opt/server/backend-test

COPY . .

RUN npm install
EXPOSE 8000
CMD [ "npm", "start" ]
