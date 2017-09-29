@echo off

rem deploy
cd ../src
start cmd /k http-server -p 7070
cd ..