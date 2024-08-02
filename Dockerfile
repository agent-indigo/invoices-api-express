FROM node:latest
WORKDIR /invoices-api
COPY . .
RUN npm i --production
EXPOSE 8080
CMD ["npm", "start"]