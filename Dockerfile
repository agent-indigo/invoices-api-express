FROM node:lts
WORKDIR /invoices-api
COPY . .
RUN npm i --production
RUN npm cache clean -f
RUN sudo npm cache clean -f
EXPOSE 8080
CMD ["npm", "start"]