
# Quotax Dockerisierte Anwendung

Diese README enthält Anweisungen zur Ausführung der Quotax-Anwendung mit Docker.

## Voraussetzungen

- Docker
- Docker Compose

## Für Produktionsumgebung

```bash
# Build und Start der Anwendung
docker-compose up -d

# Um die Anwendung zu stoppen
docker-compose down
```

## Für Entwicklungsumgebung

```bash
# Build und Start der Entwicklungsumgebung
docker-compose -f docker-compose.dev.yml up

# Mit Hot-Reload verfügbar unter http://localhost:8080
```

## Deployment auf einem Hetzner Server

1. Installieren Sie Docker und Docker Compose auf dem Server:
   ```bash
   sudo apt update
   sudo apt install -y docker.io docker-compose
   sudo systemctl enable docker
   sudo systemctl start docker
   ```

2. Übertragen Sie die Projektdateien auf den Server:
   ```bash
   scp -r ./* user@your-hetzner-ip:/path/to/project/
   ```

3. Verbinden Sie sich mit dem Server und führen Sie den Deployment-Script aus:
   ```bash
   ssh user@your-hetzner-ip
   cd /path/to/project/
   chmod +x deploy.sh
   ./deploy.sh
   ```

4. Konfigurieren Sie Ihre Domain (falls vorhanden), indem Sie einen DNS A-Record erstellen, der auf die IP-Adresse Ihres Servers verweist.

5. Optional: Richten Sie SSL mit Certbot ein:
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Logs anzeigen

```bash
docker-compose logs -f
```

## Container-Management

```bash
# Status aller Container anzeigen
docker-compose ps

# Container neustarten
docker-compose restart

# Container stoppen ohne zu löschen
docker-compose stop
```
