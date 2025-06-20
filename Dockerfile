# Base image
FROM node:20-alpine

# Uygulama dizinine geç
WORKDIR /app

# Paketleri kopyala ve yükle
COPY package*.json ./
RUN npm install

# Kodu kopyala ve derle
COPY . .
RUN npm run build

# Uygulamanın dışa açılacağı port
EXPOSE 4000

# Başlatıcı komut
CMD ["node", "dist/server.js"]
