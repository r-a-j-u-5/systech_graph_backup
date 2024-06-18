FROM node:22

WORKDIR /workspaces/systech_graph

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "ts-node", "server.ts" ]