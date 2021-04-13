### STAGE 1: Build ###
FROM node:10-alpine AS build

LABEL Maintainer="Grebennikov Eugene"
LABEL Name="TornadoSST Ref Web App"
LABEL Email="djonnyx@gmail.com"
WORKDIR /usr/src/app
COPY package*.json .npmrc ./
RUN npm ci
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.19.9-alpine
COPY --from=build /usr/src/app/dist/tornado-ref-web-app /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx-env-patch.sh /
ENTRYPOINT ["/nginx-env-patch.sh"]
CMD ["nginx", "-g", "daemon off;"]