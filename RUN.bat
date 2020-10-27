@echo off
Title factionsBot
cd utils
node validate.js
IF %ERRORLEVEL% GEQ 1 (
   @TIMEOUT /T 5 /nobreak>nul
   exit 1
)
cd ..
node index.js
PAUSE