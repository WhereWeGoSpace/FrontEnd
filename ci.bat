@echo off


:updateStatus
cls
rem fetch udpates
git pull origin

rem start testing http server
call killHTTPServer.bat
cd src
rem start cmd /k http-server -p 8080
start /B cmd /k http-server -p 8080


rem execute unit testing
cd ../test
call qunit-cli testGeneratePaymentInfo.js
echo "tttt"
call qunit-cli testGetTravelInfo.js
cd ..

rem execute end to end testing
cmd /c .\node_modules\.bin\cucumber.js.cmd

echo %errorlevel%
if errorlevel 1 (
  echo 'UAT failed.'
)

timeout 30
GOTO updateStatus