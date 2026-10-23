@echo off
echo ========================================================
echo   INICIANDO QUIEN QUIERE SER MILLONARIO (ACCESO PUBLICO)
echo ========================================================
start cmd /k "node server.mjs"
timeout /t 2 /nobreak >nul
start cmd /k "cloudflared.exe tunnel --url http://localhost:3000"
echo Ambos servicios iniciados. Mira la ventana de Cloudflare para tu enlace publico.
