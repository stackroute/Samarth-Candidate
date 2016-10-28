FROM mhart/alpine-node
 
RUN apk add --update git

# Create app directory
RUN mkdir -p /usr/src/app && echo "Samarth Webapp"

WORKDIR /usr/src/app

COPY . .

#COPY package.json /usr/src/app/
RUN npm install

#COPY bower.json /usr/src/app/
RUN npm install bower -g && bower install --allow-root

#COPY . .

#ADD https://github.com/stackroute/Samarth-WebComponents.git#intgbranch_wave10 /usr/src/app/

#ADD https://github.com/stackroute/Samarth-WebComponents/tree/intgbranch_wave10 /usr/src/app/

EXPOSE 8080

WORKDIR /usr/src/app

CMD ["npm", "start"]

