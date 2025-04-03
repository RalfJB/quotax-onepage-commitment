
#!/bin/bash

# Prüfen, ob Docker installiert ist
if ! command -v docker &> /dev/null
then
    echo "Docker ist nicht installiert. Bitte installieren Sie Docker und versuchen Sie es erneut."
    exit 1
fi

# Prüfen, ob Docker Compose installiert ist
if ! command -v docker-compose &> /dev/null
then
    echo "Docker Compose ist nicht installiert. Bitte installieren Sie Docker Compose und versuchen Sie es erneut."
    exit 1
fi

# Docker-Image bauen und Container starten
echo "Baue und starte die Quotax-Anwendung..."
docker-compose down
docker-compose build
docker-compose up -d

echo "Die Anwendung wurde erfolgreich gestartet und läuft unter http://localhost"
echo "Für die Logs führen Sie aus: docker-compose logs -f"
