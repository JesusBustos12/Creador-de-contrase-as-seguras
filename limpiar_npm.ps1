$ErrorActionPreference = "SilentlyContinue"

Write-Host "Limpiando archivos de npm..."
Remove-Item -Force "package-lock.json"
Remove-Item -Recurse -Force "node_modules"

Write-Host "¡Limpieza completada con éxito!"
Write-Host ""
Write-Host "Ahora debes instalar las dependencias con pnpm. Ejecuta el siguiente comando:"
Write-Host "------------------------------------------------------"
Write-Host "pnpm install"
Write-Host "------------------------------------------------------"
