FROM node:12-slim as style
ENV ENVIRONMENT=development
WORKDIR /app
COPY package.json package-lock*.json ./
RUN npm install --only=development
COPY . /app
RUN npm run lint:prettier

FROM node:12-slim as base
WORKDIR /app
RUN apt-get update && apt-get install -y \
    git gcc python3 build-essential bzip2
COPY package.json package-lock*.json ./
COPY . /app
ARG ENVIRONMENT=prod
RUN npm install
RUN npm run build

FROM nginx:stable-alpine as prod
COPY --from=base /app/build /usr/share/nginx/html
WORKDIR /app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
