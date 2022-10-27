FROM node:14
WORKDIR /app
COPY . .
RUN npm --clean install
RUN npm run build

EXPOSE 3000

ENV NODE_ENV production

CMD [ "npm", "run", "dev"]
