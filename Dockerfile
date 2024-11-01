FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install --force
RUN npm install -g nodemon
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg
COPY . .
CMD ["nodemon", "Anibot.js"]