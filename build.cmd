echo off
cls
echo TrumpLies.us :: building site
echo.
echo TrumpLies.us :: install NPM dependencies :: started
echo.
call npm install
echo TrumpLies.us :: install NPM dependencies :: completed
echo.
echo TrumpLies.us :: copy vendor files        :: started
echo.
if not exist "public\css" mkdir "public\css"
if not exist "public\fonts" mkdir "public\fonts"
if not exist "public\js" mkdir "public\js"

call robocopy "git_modules\startbootstrap-one-page-wonder\css" "public\css" *.css /e
call robocopy "git_modules\startbootstrap-one-page-wonder\js" "public\js" *.js /e
call copy "%~dp0node_modules\underscore\underscore.js" "%~dp0public\js\underscore.js" /Y
echo.
echo TrumpLies.us :: copy vendor files        :: completed
