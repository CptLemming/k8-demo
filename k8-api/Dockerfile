FROM node:8-alpine

WORKDIR /home/k8-api

COPY package.json .
COPY yarn.lock .
COPY .yarnrc .

RUN yarn install

COPY . .

ENV PORT 3500

EXPOSE 3500

CMD ["yarn", "start"]
