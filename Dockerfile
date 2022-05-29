FROM node:latest
WORKDIR /usr/src/app
#COPY package*.json ./
#RUN npm install
COPY $CI_PROJECT_DIR /usr/src/app
CMD [ "node", "." ]
