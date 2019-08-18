FROM node:10
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 80
CMD [ "node", "./dist/index.js"]