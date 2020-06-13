@echo off
:: example
:: set GITUSERNAME=Yakoi
:: set PROJECTNAME=Yakoi
:: set REPONAME=lcchat
echo %GITUSERNAME% %PROJECTNAME% %REPONAME%
set /P GITUSERNAME="GITUSERNAME: "
if "%GITUSERNAME%"=="" exit 1
set /P PROJECTNAME="PROJECTNAME: "
if "%PROJECTNAME%"=="" set PROJECTNAME=%GITUSERNAME%
set /P REPONAME="REPONAME: "
if "%REPONAME%"=="" exit 1

echo %GITUSERNAME% %PROJECTNAME% %REPONAME%
pause

:: リモートリポジトリのクローン
:: git remote add origin git@github.com:%GITUSERNAME%/%REPONAME%.git
git clone "https://%GITUSERNAME%@bitbucket.org/%PROJECTNAME%/%REPONAME%.git"

pause