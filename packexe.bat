yarn run electron-packager . --platform=darwin,win32 --arch=x64 --overwrite ^
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