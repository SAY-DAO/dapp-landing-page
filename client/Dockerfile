FROM node:12-slim as style
ENV ENVIRONMENT=development
WORKDIR /app
COPY package.json package-lock*.json ./
RUN npm install --only=development
COPY . /app
RUN npm run lint:prettier

FROM node:12-slim as base
RUN apt-get update && apt-get install -y \
    git gcc python3 build-essential bzip2
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json package-lock*.json ./
RUN npm ci --only=production

FROM base as source
COPY --chown=node:node . /app

FROM source as build
ARG ENVIRONMENT=prod
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
WORKDIR /app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
