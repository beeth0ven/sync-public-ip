FROM node:8.14.1-jessie

WORKDIR /server
COPY . /server

RUN npm install
RUN npm run build

CMD ["npm", "start"]
