# Two-stage  docker container for mermaid-js/mermaid-live-editor
# Build              : docker build -t mermaid-js/mermaid-live-editor .
# Run                : docker run --name mermaid-live-editor --publish 8080:80 mermaid-js/mermaid-live-editor
# Start              : docker start mermaid-live-editor
# Use webbrowser     : http://localhost:8080
# Stop               : press ctrl + c 
#                                     or 
#                                        docker stop mermaid-live-editor


FROM node:14.5.0-alpine as mermaid-live-editor-builder
COPY --chown=node:node . /home
WORKDIR /home
RUN yarn install
RUN yarn build

FROM nginx:alpine as mermaid-live-editor-runner
WORKDIR /usr/share/nginx/html
RUN apk add --no-cache gettext
RUN sed -i "s/events/load_module modules\/ngx_http_js_module.so;\nevents/" /etc/nginx/nginx.conf
COPY nginx-entrypoint.sh /

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./config.js /etc/nginx/config.js
COPY --from=mermaid-live-editor-builder --chown=nginx:nginx /home/docs ./

ENTRYPOINT [ "sh", "/nginx-entrypoint.sh" ]