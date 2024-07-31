FROM node:latest
WORKDIR /invoices-api
COPY . .
RUN npm i
EXPOSE 8080
CMD ["npm", "start"]