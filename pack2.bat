:: electronプログラムをexeにする
:: yarn build
set name=lcchat-gui
set dirname=%name%-win32-x64
yarn run electron-packager . %name% --platform=darwin,win32 --arch=x64 --overwrite ^
  --ignore="^/\.gitignore" ^
  --ignore="^/doc" ^
  --ignore="^/memo" ^
  --ignore="^/src" ^
  --ignore="^/.*\.bat" ^
  --ignore="^/yarn.*" ^
  --ignore="^/.*\.code-workspace" ^
  --ignore="^/\.vscode" ^
  --ignore="^/\.yarnclean" ^
  --ignore="^/node_modules.*"
copy aaa.db %dirname%
copy appconfig.toml %dirname%
mkdir %dirname%\sql
echo D | xcopy sql %dirname%\sql /s /y /e
echo D | xcopy img %dirname%\img /s /y /e
copy ../lcchat/bin/cpp/Sqltest.exe %dirname%

:: 不要ファイル削除
:: rmdir %dirname%\locales /q /s
set app=%dirname%\resources\app
rmdir %app%\doc /q /s
rmdir %app%\memo /q /s
rmdir %app%\node_modules /q /s
rmdir %app%\sql /q /s
rmdir %app%\src /q /s
rmdir %app%\.vscode /q /s
del %app%\.gitignore /q
del %app%\.yarnclean /q
del %app%\package-lock.json /q
del %app%\tsconfig.json /q
del %app%\tslint.json /q
del %app%\webpack.config.js /q
del %app%\yarn.lock /q
del %app%\yarn-error.log /q
del %app%\pack.bat /q
del %app%\lcchat_note.code-workspace /q
