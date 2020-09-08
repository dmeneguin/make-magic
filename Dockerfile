FROM node:11-alpine

WORKDIR /node-app

COPY package.json .

RUN npm install --quiet

COPY . .

EXPOSE 3000

CMD ["npm","start"]