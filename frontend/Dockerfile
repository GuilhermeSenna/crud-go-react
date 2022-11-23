FROM node:16.3.0-alpine

WORKDIR /frontend
COPY package.json /frontend/package.json
# COPY package.json /frontend/package.json
RUN npm install

# COPY . ./frontend
COPY . ./

EXPOSE 3000

CMD ["npm", "start"]