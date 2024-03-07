FROM node:18-alpine3.16

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

RUN npm install

ENV URI=mongodb+srv

EXPOSE 3000
EXPOSE 27017


CMD [ "npm","run","start"]