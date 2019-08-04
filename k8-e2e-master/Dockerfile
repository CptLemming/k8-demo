FROM node:8-alpine

WORKDIR /home/k8-e2e

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

ENV PORT 4000

EXPOSE 4000

CMD ["yarn", "start"]
