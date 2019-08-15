# base image
FROM node:10.15.3

MAINTAINER team11

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . /usr/src/app/
RUN npm config set http-proxy http://wwwproxy.unimelb.edu.au:8000
RUN npm config set https-proxy http://wwwproxy.unimelb.edu.au:8000
RUN npm install

# expose port for external network
EXPOSE 3000
# start app
CMD ["npm", "start"]


