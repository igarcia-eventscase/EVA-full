# EVA Platform

Plataforma completa de análisis y gestión de chatbot EVA para eventos a través de WhatsApp.

## Arquitectura

- **EVA-analytics-react**: Frontend React con Chakra UI v3 para análisis y gestión
- **EVA-node**: Backend API con Express y Supabase 
- **EVA-workers**: Sistema de procesamiento asíncrono con BullMQ y Redis
- **EVA-integration-tests**: Tests de integración de toda la plataforma

## Quick Start

### 1. Configuración inicial

```bash
# Clonar con todos los submodules
git clone --recurse-submodules <repo-url>

# O si ya tienes el repo clonado
npm run setup
```

### 2. Desarrollo

#### Opción A: Servicios por separado
```bash
# Iniciar cada servicio por separado
npm run dev:frontend    # React app en http://localhost:3000
npm run dev:backend     # API en http://localhost:3001  
npm run dev:workers     # Workers en http://localhost:5001
```

#### 🔥 Opción B: Entorno de desarrollo unificado (RECOMENDADO)
```bash
# Iniciar TODOS los servicios con auto-reload desde EVA-integration-tests
cd EVA-integration-tests
npm run start:dev

# 🎯 Características:
# ✅ Auto-reload: Detecta cambios en EVA-node, EVA-workers y EVA-analytics-react
# ✅ Logs unificados con colores: [eva-node] [eva-workers] [eva-analytics-react]  
# ✅ Recompilación automática cuando guardas archivos
# ✅ Shutdown inteligente con Ctrl+C
# ✅ Gestión de procesos centralizada
```

### 3. Testing

```bash
# Ejecutar todos los tests
npm test

# Tests por proyecto
npm run test:frontend   # Tests de React
npm run test:backend    # Tests de API
npm run test:workers    # Tests de workers
npm run test:e2e        # Tests de integración completos

# Solo compilar todos los proyectos
npm run build
```

## Configuración de entorno

Cada proyecto necesita su archivo `.env`:

1. **EVA-analytics-react**: Copiar `.env.example` a `.env`
2. **EVA-node**: Configurar Supabase y Redis
3. **EVA-workers**: Configurar Redis y credenciales de WhatsApp (opcional para desarrollo)
4. **EVA-integration-tests**: Se configura automáticamente

## 🛠️ Desarrollo y Debugging

### Logs en tiempo real
```bash
# Ver logs de todos los servicios con colores diferenciados
cd EVA-integration-tests && npm run start:dev

# Salida esperada:
# 🟢 [eva-node] Building TypeScript files...
# 🔵 [eva-workers] Redis connection established  
# 🟣 [eva-analytics-react] VITE ready in 897 ms
```

### Desarrollo eficiente
- **Cambios en código**: Automáticamente detectados y recompilados
- **Reinicio inteligente**: Solo el servicio afectado se reinicia
- **Zero-config**: No necesitas configurar nada manualmente
- **Ctrl+C**: Para todos los servicios limpiamente

### Troubleshooting
```bash
# Si algún servicio no arranca
cd EVA-integration-tests
npm run cleanup    # Libera puertos bloqueados

# Verificar servicios individualmente
npm run start      # Modo manual (sin auto-reload)
npm stop          # Para servicios manuales
```

## Tests E2E

Los tests de integración prueban toda la plataforma:

```bash
cd EVA-integration-tests

# 🧪 Opción 1: Tests completos automatizados (RECOMENDADO)
npm test              # Inicia servicios → Ejecuta tests → Para servicios

# 🔧 Opción 2: Desarrollo y debugging
npm run start:dev     # Entorno de desarrollo con auto-reload
npm run test:jest     # Ejecutar tests mientras desarrollo activo

# 📋 Opción 3: Testing manual
npm start            # Iniciar servicios (sin auto-reload)
npm run test:run     # Ejecutar solo tests
npm stop            # Parar servicios

# 🧹 Limpieza
npm run cleanup     # Liberar puertos si hay procesos bloqueados
```

### 📊 Cobertura actual de tests E2E
- ✅ **Message Processing**: API → Database → Jobs
- ✅ **WhatsApp Jobs**: Queue → Workers → External API  
- ✅ **Error Handling**: Validación y manejo de errores
- ✅ **Performance**: Procesamiento en lotes
- ✅ **Service Health**: Monitoreo de servicios

## Comandos útiles para Git submodules

```bash
# Ver status de todos los proyectos
git submodule foreach 'git status'

# Pull en todos los submodules
git submodule foreach 'git pull origin main'

# Push de cambios en submodules
git submodule foreach 'git push'
```

## 🌐 Puertos y Servicios

| Servicio | Puerto | URL | Descripción |
|----------|--------|-----|-------------|
| **EVA Frontend** | 3000 | http://localhost:3000 | React + Chakra UI v3 |
| **EVA Backend** | 4000 | http://localhost:4000 | API REST + Express |
| **EVA Workers** | 5001 | http://localhost:5001 | Dashboard BullMQ |
| **Supabase** | 54321 | http://localhost:54321 | Base de datos local |
| **Redis** | 6379 | localhost:6379 | Queue y cache |

## 📚 Documentación específica

- [Frontend](./EVA-analytics-react/README.md) - React, Chakra UI v3, Analytics
- [Backend](./EVA-node/README.md) - Express, Supabase, API REST
- [Workers](./EVA-workers/README.md) - BullMQ, Redis, Background Jobs
- [Integration Tests](./EVA-integration-tests/README.md) - E2E Testing, Orchestration 