FROM node:14-alpine

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

USER node
ENV CI=true
COPY --chown=node:node ./package.json /home/node/app/
WORKDIR /home/node/app
RUN npm install
COPY --chown=node:node . .
RUN npm run build

CMD ["npm", "run", "start:prod"]
