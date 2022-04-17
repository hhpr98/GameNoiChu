@echo off
::install the CLI or update to the latest CLI version.
call npm install -g firebase-tools
::Sign in to Google
call firebase login
::firebase init
call firebase init
::build project
call cd game-noi-chu
call npm i
call npm run build
call cd ..
::copy to firebase folder
SET CURRENT_DIR=%~dp0
SET REACT_BUILD_DIR=%CURRENT_DIR%game-noi-chu\build\
SET FIREBASE_DIR=%CURRENT_DIR%public\
call xcopy "%REACT_BUILD_DIR%" "%FIREBASE_DIR%" /Y /E
::replace url in index.html
echo please change all / to https://game-noi-chu-nhh.web.app/ before deploy. Then call firebase deploy.
echo Ctrl+F and replace all ="/ to ="https://game-noi-chu-nhh.web.app/
::powershell -Command "(gc %FIREBASE_DIR%index.html) -replace '="/', '="https://game-noi-chu-nhh.web.app/' | Out-File -encoding utf8 %FIREBASE_DIR%index2.html"
::Put your static files (e.g., HTML, CSS, JS) in your app’s deploy directory (the default is “public”).
::call firebase deploy