FROM node:15.13.0-alpine3.13
RUN apk update 
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
ADD . /usr/src/app
RUN npm run build
CMD [ "npm", "run", "start" ]
EXPOSE 8000