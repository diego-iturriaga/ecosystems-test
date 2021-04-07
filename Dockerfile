FROM node:10-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY src /app/dist

# check files list
RUN ls -a

RUN npm install --only=production
RUN npm run build

EXPOSE 7777

CMD [ "node", "./dist/server.js" ]