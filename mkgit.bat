@echo off
:: example
set GITUSERNAME=Yakoi
set PROJECTNAME=Yakoi
set REPONAME=lcchat-gui
echo %GITUSERNAME% %PROJECTNAME% %REPONAME%
set /P GITUSERNAME="GITUSERNAME: "
if "%GITUSERNAME%"=="" exit 1
set /P PROJECTNAME="PROJECTNAME: "
if "%PROJECTNAME%"=="" set PROJECTNAME=%GITUSERNAME%
set /P REPONAME="REPONAME: "
if "%REPONAME%"=="" exit 1

echo %GITUSERNAME% %PROJECTNAME% %REPONAME%
pause
:: ローカルリポジトリの作成
git init
git add -A
git commit -m "初版作成"

:: リモートリポジトリの作成
:: git remote add origin git@github.com:%GITUSERNAME%/%REPONAME%.git
git push "https://%GITUSERNAME%@bitbucket.org/%PROJECTNAME%/%REPONAME%.git" master:master

pause