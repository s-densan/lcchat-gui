:: electronプログラムをexeにする
set name=lcchat-gui
yarn run electron-packager . %name% --platform=darwin,win32 --arch=x64 --overwrite
copy aaa.db %name%-win32-x64
copy appconfig.toml %name%-win32-x64
copy ../lcchat/bin/cpp/Sqltest.exe %name%-win32-x64
