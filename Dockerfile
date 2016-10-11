FROM ubuntu

# install node and npm
RUN apt-get update
RUN apt-get -qq update
RUN apt-get install -y nodejs npm

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install

# Bundle app source
COPY . /src

EXPOSE  8080
# EXPOSE  27017

# RUN cd /src; npm start
# CMD cd /src; npm start #

RUN sudo add-apt-repository ppa:webupd8team/java && sudo apt-get update && sudo apt-get install oracle-java8-installer && sudo apt-get install oracle-java8-set-default