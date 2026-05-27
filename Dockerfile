FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
 
COPY . .

ARG BUILD_MODE
ARG REACT_APP_URL
ARG REACT_APP_NAME

ENV REACT_APP_URL=${REACT_APP_URL}
ENV REACT_APP_NAME=${REACT_APP_NAME}

RUN npm run build:${BUILD_MODE}
 
# ---
 
FROM nginx:alpine AS runner
# Копируем с явным указанием текущей директории
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]