# Build
FROM node:lts-alpine as builder

WORKDIR /app/

COPY . .
RUN yarn
RUN yarn generate

# Deploy
FROM nginx:stable-alpine

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html/
