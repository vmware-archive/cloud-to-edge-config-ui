FROM nginx:alpine
COPY ./dist/* /usr/share/nginx/html/

COPY ./docker/nginx/etc/nginx/conf.d* /etc/nginx/conf.d/