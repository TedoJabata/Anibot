FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install --force
RUN npm install -g nodemon
COPY . .
CMD ["nodemon", "Anibot.js"]