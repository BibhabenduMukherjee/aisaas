FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .

RUN npx prisma db push
RUN npm run build
EXPOSE 8080
CMD ["npm" , "start"]


