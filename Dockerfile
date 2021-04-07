FROM nginx:alpine

# adding this package as it contains 'envsubst' which is used for environment variable substitution
RUN apk add gettext
ENV FEATURE_STORAGE=disabled
ENV FEATURE_TIME_TO_LIVE=disabled
ENV FEATURE_MULTI_CLOUD=disabled

RUN mkdir -p /run/nginx
COPY ./deployment/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY ./build/ .

EXPOSE 80


CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/env_token.js > /usr/share/nginx/html/env.js; nginx -g 'daemon off;'"]
# Make nginx behave in pid 1
STOPSIGNAL SIGTERM