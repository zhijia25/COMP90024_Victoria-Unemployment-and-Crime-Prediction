# base image
FROM python:3.6.4

RUN printf "deb http://archive.debian.org/debian/ jessie main\ndeb-src http://archive.debian.org/debian/ jessie main\ndeb http://security.debian.org jessie/updates main\ndeb-src http://security.debian.org jessie/updates main" > /etc/apt/sources.list

MAINTAINER team11

ENV DEBIAN_FRONTEND noninteractive

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
COPY . /usr/src/app/

RUN apt-get -o Acquire::http::proxy="http://wwwproxy.unimelb.edu.au:8000/" update
RUN apt-get -o Acquire::http::proxy="http://wwwproxy.unimelb.edu.au:8000/" install python3-pip -y
RUN pip install --upgrade --proxy http://wwwproxy.unimelb.edu.au:8000 pip
RUN pip3 install --proxy http://wwwproxy.unimelb.edu.au:8000 flask
RUN pip3 install --proxy http://wwwproxy.unimelb.edu.au:8000 flask-cors
RUN pip3 install --proxy http://wwwproxy.unimelb.edu.au:8000 flask_httpauth
RUN pip3 install --proxy http://wwwproxy.unimelb.edu.au:8000 urllib3

ENV DEBIAN_FRONTEND teletype

# start app
CMD ["python3", "/usr/src/app/server.py"]