FROM node:16.3.0-alpine

WORKDIR /app

COPY package.json /app/package.json
RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]