FROM node:12

RUN apt update && apt install vim -y

WORKDIR /usr/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]

EXPOSE 3000