FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3000
ENV MONGO_URL=mongodb://localhost:27017/AvanceAcademicoTecNM
ENV REDIS_HOST=localhost
ENV REDIS_PORT=6379
EXPOSE 3000
CMD ["npm","start"]