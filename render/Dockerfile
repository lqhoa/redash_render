FROM node:alpine
WORKDIR /app
ENV SLIMERJSLAUNCHER=/usr/bin/firefox

COPY . /app
RUN apk add --no-cache bash \
    firefox-esr xvfb bash dbus ttf-freefont fontconfig
RUN \
# Create firefox + xvfb runner
mv /usr/bin/firefox /usr/bin/firefox-origin && \
echo $'#!/usr/bin/env sh\n\
Xvfb :0 -screen 0 1920x1080x24 -ac +extension GLX +render -noreset & \n\
DISPLAY=:0.0 firefox-origin $@ \n\
killall Xvfb' > /usr/bin/firefox && \
chmod +x /usr/bin/firefox
RUN npm install

RUN echo "0  12,18  *  *  *  cd /app && npm start" > /etc/crontabs/root
CMD crond -d 0 -f
