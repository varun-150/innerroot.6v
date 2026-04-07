@echo off
echo Starting Inner Root Backend...
start cmd /k "cd inner-root-backend && .\mvnw.cmd spring-boot:run"

echo Starting React Frontend...
start cmd /k "cd react-project && npm run dev"

echo Both services are starting up!
