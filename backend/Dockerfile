FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ./.sequelizerc /app
COPY ./package.json /app
RUN npm install
COPY ./src/ /app/src
EXPOSE 80
CMD ["npm","run", "prod"]
