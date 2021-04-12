FROM node:12-slim as base
WORKDIR /app
RUN apt-get update && apt-get install -y \
    git gcc python3 build-essential bzip2 \
    libudev-dev libusb-1.0-0-dev
COPY package.json yarn.lock ./
RUN yarn install
COPY . /app
ARG ENVIRONMENT=prod
RUN yarn run build

FROM nginx:stable-alpine as prod
COPY --from=base /app/build /usr/share/nginx/html
WORKDIR /app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
