


FROM mhart/alpine-node
 
RUN apk add --update git

# Create app directory
RUN mkdir -p /usr/src/app && echo "Samarth Webapp"

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY bower.json /usr/src/app/
RUN npm install bower -g && bower install --allow-root

COPY . /usr/src/app/

EXPOSE 8080

WORKDIR /usr/src/app

CMD ["npm", "start"]

