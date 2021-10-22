### STAGE 1: Build ###
FROM node:10-alpine AS builder

LABEL Maintainer="Grebennikov Eugene"
LABEL Name="TornadoSST Ref Web App"
LABEL Email="djonnyx@gmail.com"
WORKDIR /usr/src/app
COPY package*.json .npmrc ./
RUN npm ci
COPY . .
RUN npm run build:cms
RUN npm run build:admin
RUN npm run build:documentation

### STAGE 2: Run ###
FROM nginx:1.19.9-alpine

# Create a self-signed certificate
# RUN apk add --update openssl
# RUN mkdir -p /etc/ssl/certificates/
# RUN openssl req -newkey rsa:4096 \
#             -x509 \
#             -sha256 \
#             -days 3650 \
#             -nodes \
#             -out /etc/ssl/certificates/tornado_cms.crt \
#             -keyout /etc/ssl/certificates/tornado_cms.key \
#             -subj "/C=RU/ST=Voronezh/L=Voronezh/O=SOFT3S/OU=IT Department/CN=178.234.43.158:3000"
# RUN openssl req -newkey rsa:4096 \
#             -x509 \
#             -sha256 \
#             -days 3650 \
#             -nodes \
#             -out /etc/ssl/certificates/tornado_admin.crt \
#             -keyout /etc/ssl/certificates/tornado_admin.key \
#             -subj "/C=RU/ST=Voronezh/L=Voronezh/O=SOFT3S/OU=IT Department/CN=178.234.43.158:3000"

# Deploy
RUN mkdir -p /usr/share/nginx/html/cms
COPY --from=builder /usr/src/app/dist/tornado-cms /usr/share/nginx/html/cms
RUN mkdir -p /usr/share/nginx/html/admin
COPY --from=builder /usr/src/app/dist/tornado-admin /usr/share/nginx/html/admin
RUN mkdir -p /usr/share/nginx/html/documentation
COPY --from=builder /usr/src/app/dist/tornado-documentation /usr/share/nginx/html/documentation
ENV API_ADDRESS 127.0.0.1:8080
COPY nginx/templates /etc/nginx/templates/