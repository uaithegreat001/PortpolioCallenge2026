# Tiny web server to serve files
FROM nginx:alpine
# HTML/CSS/JS files into the server
COPY . /usr/share/nginx/html
# Listen on port 8080
EXPOSE 8080
# Update nginx config to use port 8080
RUN sed -i 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf