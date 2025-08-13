# 🚀 Requisitos de Deployment y Monitoreo

## 📋 Objetivo General

Configurar un pipeline completo de CI/CD con GitHub Actions para hacer deployment automático de la API usando Docker Swarm en una VM local con Ubuntu 24.04, incluyendo monitoreo avanzado con Grafana para métricas de rendimiento y logs.

## 🎯 Tareas Requeridas

### 1. 🐳 Containerización con Docker

#### 1.1 Dockerfile para la API
- [X] Crear `Dockerfile` optimizado para producción
- [X] Usar imagen base `node:18-alpine` para reducir tamaño
- [X] Implementar multi-stage build para optimización
- [X] Configurar usuario no-root para seguridad
- [X] Exponer puerto 3000 de la aplicación

#### 1.2 Docker Compose para Desarrollo
- [X] Crear `docker-compose.yml` para desarrollo local
- [X] Incluir servicios: API y PostgreSQL
- [X] Configurar volúmenes para persistencia de datos
- [X] Configurar redes para comunicación entre servicios
- [X] Variables de entorno para cada servicio

#### 1.3 Docker Compose para Producción
- [X] Crear `docker-compose.prod.yml` para Docker Swarm
- [X] Configurar replicas y estrategias de deployment
- [X] Implementar secrets para credenciales
- [X] Configurar limits de recursos (CPU, memoria)
- [X] Configurar restart policies
- [X] Configurar redes overlay para Swarm

---

### 2. 🔄 GitHub Actions CI/CD

#### 2.1 Workflow de Testing
- [ ] Crear `.github/workflows/test.yml`
- [ ] Ejecutar tests en cada push de commit
- [ ] Configurar matrix para múltiples versiones de Node.js
- [ ] Ejecutar linting con ESLint
- [ ] Ejecutar tests unitarios y de integración

#### 2.2 Workflow de Build y Push
- [X] Crear `.github/workflows/build.yml`
- [X] Build de imagen Docker en cada release/tag
- [X] Push a Docker Hub o GitHub Container Registry
- [X] Cacheo de layers de Docker para optimización

#### 2.3 Workflow de Deployment
- [ ] Crear `.github/workflows/deploy.yml`
- [ ] Configurar SSH connection a VM Ubuntu 24.04
- [ ] Pull de la nueva imagen en la VM
- [ ] Deployment con Docker Swarm
- [ ] Rolling updates sin downtime
- [ ] Rollback automático en caso de falla
- [ ] Notificaciones de deployment (Discord/Slack)

#### 2.4 Secrets y Variables
- [ ] Configurar secrets en GitHub:
  - SSH private key para VM
  - Docker registry credentials
  - Database credentials
  - API keys para monitoreo
- [ ] Variables de entorno por ambiente

---

### 3. 🖥️ Configuración de VM Ubuntu 24.04

#### 3.1 Setup Inicial de la VM
- [ ] Instalar Docker Engine latest
- [ ] Configurar Docker Swarm mode
- [ ] Configurar firewall (UFW) con puertos necesarios
- [ ] Crear usuario específico para deployments
- [ ] Configurar SSH keys para GitHub Actions
- [ ] Instalar docker-compose

#### 3.2 Configuración de Servicios Base
- [ ] Setup de PostgreSQL como servicio de Docker
- [ ] Setup de Nginx como reverse proxy
- [ ] Configuración de SSL/TLS con Let's Encrypt

---

### 4. 📊 Stack de Monitoreo con Grafana

#### 4.1 Prometheus Setup
- [ ] Configurar Prometheus como servicio Docker
- [ ] Configurar scraping de métricas de la API
- [ ] Configurar métricas de sistema (node_exporter)
- [ ] Configurar métricas de Docker (cAdvisor)
- [ ] Configurar métricas de PostgreSQL
- [ ] Configurar retention policies

#### 4.2 Grafana Configuration
- [ ] Setup de Grafana como servicio Docker
- [ ] Configurar data sources (Prometheus, Loki)
- [ ] Configurar authentication y usuarios
- [ ] Configurar SMTP para alertas por email
- [ ] Configurar themes y branding

#### 4.3 Dashboards Requeridos

##### Dashboard 1: API Performance
- [ ] Request rate (requests/segundo)
- [ ] Response time percentiles (p50, p95, p99)
- [ ] Error rate por endpoint
- [ ] Status codes distribution
- [ ] Top endpoints más utilizados
- [ ] Active users concurrentes

##### Dashboard 2: Sistema y Infraestructura
- [ ] CPU usage de la VM
- [ ] Memory usage y swap
- [ ] Disk I/O y espacio disponible
- [ ] Network traffic
- [ ] Docker containers status
- [ ] PostgreSQL connections y performance

##### Dashboard 3: Business Metrics
- [ ] Registros de usuarios por día
- [ ] Productos creados por categoría
- [ ] Login attempts vs successful logins
- [ ] Geographic distribution de requests
- [ ] Peak hours analysis

##### Dashboard 4: Security & Logs
- [ ] Failed login attempts
- [ ] 4xx y 5xx errors rate
- [ ] Unusual traffic patterns
- [ ] Top IPs por volumen de requests
- [ ] Error logs agregados por tipo

#### 4.4 Alerting Rules
- [ ] API response time > 2 segundos
- [ ] Error rate > 5% en 5 minutos
- [ ] CPU usage > 80% por 10 minutos
- [ ] Memory usage > 90% por 5 minutos
- [ ] Disk space < 10% disponible
- [ ] PostgreSQL connections > 80% del límite
- [ ] Failed logins > 10 en 5 minutos

---

### 5. 📝 Logging y Observabilidad

#### 5.1 Loki para Log Aggregation
- [ ] Setup de Grafana Loki como servicio Docker
- [ ] Configurar Promtail para shipping de logs
- [ ] Configurar retention de logs (30 días)
- [ ] Configurar indexing y labels
- [ ] Setup de log streaming desde la API

#### 5.2 Structured Logging Enhancement
- [ ] Mejorar formato de logs para parsing
- [ ] Agregar trace IDs para request tracking
- [ ] Configurar log levels por ambiente
- [ ] Implementar sampling para high-volume logs

#### 5.3 Distributed Tracing (Opcional)
- [ ] Setup de Jaeger para tracing
- [ ] Instrumentar la API con OpenTelemetry
- [ ] Configurar trace sampling
- [ ] Correlación entre logs y traces

---

## 🛠️ Herramientas y Tecnologías a Usar

### Obligatorias
- **Docker & Docker Swarm** - Containerización y orquestación
- **GitHub Actions** - CI/CD pipeline
- **Ubuntu 24.04** - Sistema operativo de la VM
- **Grafana** - Visualización y dashboards
- **Prometheus** - Métricas y monitoring
- **Loki** - Log aggregation

### Recomendadas
- **Nginx** - Reverse proxy y load balancer
- **Redis** - Caching layer
- **Let's Encrypt** - SSL certificates
- **Promtail** - Log shipping
- **cAdvisor** - Container metrics
- **Node Exporter** - System metrics
