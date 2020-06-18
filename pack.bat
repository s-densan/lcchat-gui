:: electronプログラムをexeにする
:: yarn build
set name=lcchat-gui
set dirname=%name%-win32-x64
yarn run electron-packager . %name% --platform=darwin,win32 --arch=x64 --overwrite
copy aaa.db %dirname%
copy appconfig.toml %dirname%
mkdir %dirname%\sql
xcopy sql %dirname%\sql /s
copy ../lcchat/bin/cpp/Sqltest.exe %dirname%
