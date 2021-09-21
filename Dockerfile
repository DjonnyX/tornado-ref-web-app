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

### STAGE 2: Run ###
FROM nginx:1.19.9-alpine

RUN mkdir -p /usr/share/nginx/html/admin
RUN mkdir -p /usr/share/nginx/html/cms
COPY --from=builder /usr/src/app/dist/tornado-admin /usr/share/nginx/html/admin
COPY --from=builder /usr/src/app/dist/tornado-cms /usr/share/nginx/html/cms
ENV API_ADDRESS 192.168.8.110:8080
COPY nginx/templates /etc/nginx/templates/