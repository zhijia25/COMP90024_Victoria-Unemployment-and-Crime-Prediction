# base image
FROM python:3.6.4

RUN printf "deb http://archive.debian.org/debian/ jessie main\ndeb-src http://archive.debian.org/debian/ jessie main\ndeb http://security.debian.org jessie/updates main\ndeb-src http://security.debi$
MAINTAINER team11

ENV DEBIAN_FRONTEND noninteractive

RUN mkdir /usr/src/app/
WORKDIR /usr/src/app/
COPY . /usr/src/app/

RUN apt-get -o Acquire::http::proxy="http://wwwproxy.unimelb.edu.au:8000/" update
RUN apt-get -o Acquire::http::proxy="http://wwwproxy.unimelb.edu.au:8000/" install python3-pip -y
RUN pip install --upgrade --proxy http://wwwproxy.unimelb.edu.au:8000 pip
RUN pip3 install --upgrade --proxy http://wwwproxy.unimelb.edu.au:8000 tweepy
RUN pip3 install --upgrade --proxy http://wwwproxy.unimelb.edu.au:8000 shapely
RUN pip3 install --upgrade --proxy http://wwwproxy.unimelb.edu.au:8000 python-twitter
RUN pip3 install --upgrade --proxy http://wwwproxy.unimelb.edu.au:8000 urllib3
RUN pip3 install --upgrade --proxy http://wwwproxy.unimelb.edu.au:8000 vaderSentiment
RUN pip3 install --upgrade --proxy http://wwwproxy.unimelb.edu.au:8000 Couchdb
RUN export http_proxy="http://wwwproxy.unimelb.edu.au:8000"
RUN export https_proxy="http://wwwproxy.unimelb.edu.au:8000"

#VOLUME /usr/src/app/

ENV DEBIAN_FRONTEND teletype

# start app
CMD ["bash", "run.sh"]