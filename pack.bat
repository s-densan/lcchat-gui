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

:: 不要ファイル削除
del %dirname%\locales
set app=%dirname%\resources\app
del %app%\doc
del %app%\memo
del %app%\node_modules
del %app%\sql
del %app%\src
del %app%\.gitignore
del %app%\.yarnclean
