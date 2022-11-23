FROM node:16.3.0-alpine

WORKDIR /frontend
COPY package.json /frontend/package.json
RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]