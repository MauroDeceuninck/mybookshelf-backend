FROM node:18

WORKDIR /app

COPY . .

RUN npm install

# Expose default Express port
EXPOSE 3000

CMD ["npm", "start"]
