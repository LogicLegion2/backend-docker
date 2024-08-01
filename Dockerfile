FROM node:20

WORKDIR /dist

COPY package*.json ./

RUN git clone https://github.com/LogicLegion2/backend-docker.git

COPY . .

ENV PORT=3000

CMD ["npm", "start"]