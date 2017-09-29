@echo off

rem fetch udpates
git pull origin

rem start testing http server
cd src
start cmd /k http-server -p 8080

rem execute end to end testing
cd ../test
cmd /c .\node_modules\.bin\cucumber.js.cmd

echo %errorlevel%
if errorlevel 1 (
  echo 'build failed.'
  GOTO:EOF
)