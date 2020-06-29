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
del %dirname%\locales /q /s
set app=%dirname%\resources\app
del %app%\doc /q /s
del %app%\memo /q /s
del %app%\node_modules /q /s
del %app%\sql /q /s
del %app%\src /q /s
del %app%\.gitignore /q
del %app%\.yarnclean /q
