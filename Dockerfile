FROM node:14
WORKDIR /app
COPY . .
RUN npm --clean install
RUN npm run build

EXPOSE 8000

ENV NODE_ENV dev

CMD [ "npm", "run", "dev"]