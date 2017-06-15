#/bin/sh
set -e
# install the sdk
brew install android-sdk
# ensure sdk binaries are made available
brew link android-sdk
# ensure PATH is set correctly
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
# install basic SDK tools
echo y | android update sdk --no-ui --all --filter "android-23"
echo y | android update sdk --no-ui --all --filter "platform-tools"
echo y | android update sdk --no-ui --all --filter "tools"
echo y | android update sdk --no-ui --all --filter "build-tools-23.0.3"
echo y | android update sdk -u -a -t tool
# ensure licenses are already accepted
mkdir -p $ANDROID_HOME/licenses
cp ./android-licenses/* $ANDROID_HOME/licenses