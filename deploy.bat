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
SET INDEX_SRC=%CURRENT_DIR%game-noi-chu\src\assets\deploy\index.html
SET INDEX_DES=%CURRENT_DIR%public\index.html
call xcopy "%INDEX_SRC%" "%INDEX_DES%" /Y

::Put your static files (e.g., HTML, CSS, JS) in your app’s deploy directory (the default is “public”).
call firebase deploy