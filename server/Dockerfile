FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --production=false

COPY . .
RUN npm run build

# Make sure the app listens on the port Render expects
ENV PORT=10000
EXPOSE 10000

CMD ["npm", "start"] 