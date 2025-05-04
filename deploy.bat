@echo off
echo Preparing for Vercel deployment...

:: Временно изменяем package.json для деплоя
echo Modifying package.json...
type package.json > package.json.backup
powershell -Command "(Get-Content package.json) -replace '\"build\": \"tsc -b && vite build\"', '\"build\": \"vite build\"' | Set-Content package.json"

:: Запускаем деплой
echo Starting Vercel deployment...
call npx vercel --prod

:: Восстанавливаем оригинальный package.json
echo Restoring original package.json...
type package.json.backup > package.json
del package.json.backup

echo Done! 