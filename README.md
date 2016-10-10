studio# chessIonic
chess in ionic framework

## to host:
- git clone ...
- cd chessIonic
- npm i
- npm start

## to compile (to Android on Ubuntu)
tutorial at https://ccoenraets.github.io/ionic-tutorial/

- for 64 bit machines (only) install ia32-libs:
```sh
sudo dpkg --add-architecture i386 && 
sudo apt-get update &&
sudo apt-get install ia32-libs
```

- git clone
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
```sh
sudo wget "https://dl.google.com/dl/android/studio/ide-zips/2.2.1.0/android-studio-ide-145.3330264-linux.zip" -P "/opt" && sudo unzip /opt/android-studio-ide-145.3330264-linux.zip -d /opt
```
- install ANT
```sh
sudo wget "http://apache.mirror.anlx.net//ant/binaries/apache-ant-1.9.7-bin.zip" -P "/opt" &&
sudo unzip /opt/apache-ant-1.9.7-bin.zip -d /opt
```
- configure path
add the below to .bashrc
```sh
export DEV_HOME="/opt"
export ANT_HOME="$DEV_HOME/apache-ant-1.9.7"
export ANDROID_HOME="$DEV_HOME/adt-bundle-linux-x86_64-20131030/sdk"
export PATH="$PATH:$ANT_HOME/bin:$JAVA_HOME/bin:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools"
```
