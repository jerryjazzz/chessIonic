studio# chessIonic
chess in ionic framework

## requirements
- node v6.3.1
- mongodb on localhost:27017

## to host:
```sh
git clone https://github.com/mikilukasik/chessIonic.git &&
cd chessIonic &&
npm i &&
npm start
```
## to compile (to Android on Ubuntu)
tutorial at https://ccoenraets.github.io/ionic-tutorial/

- for 64 bit machines (only) install ia32-libs:
```sh
sudo dpkg --add-architecture i386 && 
sudo apt-get update &&
sudo apt-get install ia32-libs
```

- git clone https://github.com/mikilukasik/chessIonic.git
- cd chessIonic
- npm i -g cordova ionic
- install java:
```sh
sudo add-apt-repository ppa:webupd8team/java &&
sudo apt-get update &&
sudo apt-get install oracle-java8-installer &&
sudo apt-get install oracle-java8-set-default
```
- install android SDK (link is for 64bit Ubuntu v16)
  link from https://developer.android.com/studio/index.html#downloads
```sh
wget "https://dl.google.com/android/android-sdk_r24.4.1-linux.tgz" -P ~/builder &&
tar -xvzf ~/builder/android-sdk_r24.4.1-linux.tgz -C ~/builder
```
- install ANT
  link from https://ant.apache.org/bindownload.cgi
```sh
wget "http://apache.mirror.anlx.net//ant/binaries/apache-ant-1.9.7-bin.zip" -P ~/builder &&
unzip ~/builder/apache-ant-1.9.7-bin.zip -d ~/builder

```
- configure path
add the below to .bashrc
```sh
export DEV_HOME="~/builder"
export ANT_HOME="$DEV_HOME/apache-ant-1.9.7"
export ANDROID_HOME="$DEV_HOME/android-sdk-linux"
export PATH="$PATH:$ANT_HOME/bin:$JAVA_HOME/bin:$ANDROID_HOME/tools"
```

## install full ubuntu server with docker and cordova builder

install ubuntu server
install docker

```sh
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates

sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D

create /etc/apt/sources.list.d/docker.list with the content:
ubuntu 14:   deb https://apt.dockerproject.org/repo ubuntu-trusty main

sudo apt-get install linux-image-extra-$(uname -r) linux-image-extra-virtual

sudo apt-get install docker-engine

sudo service docker start
sudo docker run hello-world
```

start mongo in docker
```sh
docker pull mongo:latest
docker run -v "$(pwd)":/data --name mongo -d mongo mongod --smallfiles

```

install cordova builder container
```sh
git clone https://github.com/mikilukasik/docker-cordova.git
cd docker-cordova
docker build -t cordova .
alias mine='sudo chown -R $USER'
alias drun='docker run -it --rm'
alias cordova='drun --privileged -v /dev/bus/usb:/dev/bus/usb -v $PWD:/src cordova cordova'
```

install distelli agent
```sh
wget -qO- https://www.distelli.com/download/client | sh
sudo /usr/local/bin/distelli agent install

```