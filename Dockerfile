FROM node:lts
WORKDIR /app
COPY nextjs-build/ ./public/
COPY package*.json ./
RUN yarn install
COPY . .

EXPOSE 8080
CMD ["yarn" , "start"]


