# 📊 Análisis Completo del Proyecto "Cámaras del Dragon"

## 🔍 Resumen Ejecutivo

Este documento contiene un análisis exhaustivo del proyecto, identificando problemas, errores, malas prácticas y áreas de mejora. Además, incluye un listado completo de tareas organizadas por áreas funcionales.

---

## 🚨 PROBLEMAS IDENTIFICADOS

### 1. **Críticos** 🔴

#### 1.1 Testing Completamente Ausente
- **Problema**: No existe ninguna configuración de testing en el proyecto
- **Impacto**: Alto riesgo de regresiones, bugs en producción
- **Archivos afectados**: Todo el proyecto
- **Evidencia**: 0 archivos `*.test.*` o `*.spec.*` encontrados

#### 1.2 CI/CD No Configurado
- **Problema**: No hay workflows de GitHub Actions ni ningún pipeline de CI/CD
- **Impacto**: Despliegues manuales propensos a errores, sin validación automática
- **Archivos afectados**: Raíz del proyecto (falta `.github/workflows/`)

#### 1.3 Variables de Entorno Sin Ejemplo
- **Problema**: No existe archivo `.env.example`
- **Impacto**: Difícil onboarding de nuevos desarrolladores
- **Recomendación**: Crear `.env.example` con todas las variables necesarias

#### 1.4 README.md Genérico
- **Problema**: El README.md es el template por defecto de Turborepo
- **Impacto**: Falta de documentación específica del proyecto
- **Archivos afectados**: `README.md`

#### 1.5 Falta de Dockerización
- **Problema**: No existen archivos Docker para contenerización
- **Impacto**: Inconsistencias entre entornos, despliegue más complejo
- **Archivos necesarios**: `Dockerfile`, `docker-compose.yml`

### 2. **Graves** 🟠

#### 2.1 Manejo de Errores Inconsistente
- **Problema**: Algunos servicios no manejan errores correctamente
- **Ejemplo**: En `sale.service.ts` hay `console.log` en vez de logging apropiado
- **Líneas**: 94, 148, 217, etc.
- **Impacto**: Difícil debugging en producción

#### 2.2 No Hay Sistema de Logging
- **Problema**: Se usa `console.log` en lugar de un sistema de logging robusto
- **Impacto**: Pérdida de información en producción, difícil troubleshooting
- **Recomendación**: Implementar Winston, Pino o similar

#### 2.3 Instancias Múltiples de PrismaClient
- **Problema**: Se crea una nueva instancia de PrismaClient en cada servicio
- **Ejemplo**: `sale.service.ts` línea 7
- **Impacto**: Posibles problemas de conexiones, memory leaks
- **Solución**: Usar singleton pattern para Prisma

#### 2.4 Falta Validación de Entrada Robusta
- **Problema**: No se validan todos los inputs de usuarios
- **Impacto**: Vulnerabilidades de seguridad, datos inconsistentes
- **Recomendación**: Usar TypeBox o Zod de forma consistente

#### 2.5 Dashboard de Fotógrafo Sin Métricas
- **Problema**: El dashboard principal del fotógrafo está comentado
- **Archivo**: `apps/web/src/app/(private)/(staff)/photographer/page.tsx`
- **Líneas**: 10-14 (componentes comentados)
- **Estado**: Pendiente de implementación

#### 2.6 Contador del Hero con Fecha Hardcodeada
- **Problema**: Fecha del evento SOFA 2026 está hardcodeada
- **Archivo**: `apps/web/src/modules/landing/hero.tsx`
- **Línea**: 8
- **Impacto**: Difícil actualización para futuros eventos

#### 2.7 Modal de Ticket No Funcional
- **Problema**: El modal del ticket en el hero tiene código hardcodeado sin funcionalidad
- **Archivo**: `apps/web/src/modules/landing/hero.tsx`
- **Líneas**: 114-141
- **Estado**: Componente dummy sin implementar

#### 2.8 Botones del Hero Sin Navegación
- **Problema**: Los botones "CONTÁCTANOS" y "AGENDAR" no tienen funcionalidad
- **Archivo**: `apps/web/src/modules/landing/hero.tsx`
- **Líneas**: 58-69

### 3. **Moderados** 🟡

#### 3.1 Paquetes Mostrados Como Cards (Cambio Solicitado)
- **Problema**: Los paquetes se muestran en cards en vez de tabla
- **Archivo**: `apps/web/src/modules/dashboard/paquetes/table-paquetes.tsx`
- **Estado**: Funcional pero requiere mejora UX

#### 3.2 Falta Sistema de Tickets
- **Problema**: No existe implementación del sistema de tickets mencionado
- **Impacto**: Funcionalidad prometida no disponible

#### 3.3 UI de Agenda Mejorable
- **Problema**: La UI de la agenda es funcional pero podría ser más intuitiva
- **Archivo**: `apps/web/src/app/(public)/agenda/page.tsx`

#### 3.4 Panel de Usuarios Incompleto
- **Problema**: La gestión de usuarios por admin está básica
- **Archivo**: `apps/web/src/app/(private)/(staff)/admin/usuarios/page.tsx`

#### 3.5 No Hay Rate Limiting
- **Problema**: Falta rate limiting en APIs
- **Impacto**: Vulnerabilidad a ataques DoS/DDoS

#### 3.6 Falta Monitoring y Observability
- **Problema**: No hay integración con servicios de monitoring
- **Impacto**: Dificultad para detectar problemas en producción

#### 3.7 No Hay Manejo de CORS Configurado
- **Problema**: CORS debe estar configurado explícitamente
- **Impacto**: Posibles problemas en producción

### 4. **Menores** 🟢

#### 4.1 Comentarios en Español e Inglés Mezclados
- **Problema**: Inconsistencia en idioma de comentarios
- **Impacto**: Menor, pero afecta legibilidad

#### 4.2 Falta Documentation de APIs
- **Problema**: No hay documentación Swagger/OpenAPI generada
- **Impacto**: Difícil integración para frontend

#### 4.3 No Hay Pre-commit Hooks
- **Problema**: No se ejecutan linters/formatters antes de commits
- **Impacto**: Código inconsistente puede llegar al repo

#### 4.4 Falta Optimización de Imágenes en Frontend
- **Problema**: Uso limitado de `next/image`
- **Impacto**: Performance subóptima

---

## ✅ BUENAS PRÁCTICAS IDENTIFICADAS

1. ✅ Uso de monorepo con Turborepo
2. ✅ TypeScript estricto configurado
3. ✅ Separación clara de concerns (frontend/backend/packages)
4. ✅ Uso de Prisma para ORM
5. ✅ Autenticación con Better Auth
6. ✅ Componentes reutilizables en package `ui`
7. ✅ Uso de Tailwind CSS para estilos
8. ✅ Configuración de linters (Biome, Oxlint)

---

## 📋 LISTADO COMPLETO DE TAREAS

---

## 🎨 FRONTEND

### FR-001: Mejorar UI de Paquetes - Tabla en Dashboard Fotógrafo
- **Título**: Convertir cards de paquetes a tabla con listado
- **Descripción**: 
  Actualmente los paquetes del fotógrafo se muestran en formato de cards. Necesitamos migrar a una tabla responsive que muestre:
  - Imagen miniatura del paquete
  - Nombre del paquete
  - Descripción (truncada)
  - Precio
  - Cantidad de fotos
  - Estado (Activo/Inactivo)
  - Acciones (Editar, Eliminar, Ver)
  
  La tabla debe:
  - Ser responsive (colapsar en mobile)
  - Incluir paginación
  - Permitir ordenamiento por columnas
  - Incluir filtros (activo/inactivo, rango de precio)
  - Mostrar indicadores visuales (badges para estado)

- **Prioridad**: 🔴 Alta
- **Módulo**: Dashboard Fotógrafo - Paquetes
- **Componentes a modificar**:
  - `apps/web/src/modules/dashboard/paquetes/table-paquetes.tsx`
  - `apps/web/src/modules/dashboard/paquetes/paquete-card.tsx` (reemplazar)
  - `apps/web/src/app/(private)/(staff)/photographer/paquetes/page.tsx`
- **Nuevos componentes a crear**:
  - `apps/web/src/modules/dashboard/paquetes/paquetes-table-view.tsx`
  - `apps/web/src/modules/dashboard/paquetes/paquetes-table-row.tsx`
  - `apps/web/src/modules/dashboard/paquetes/paquetes-filters.tsx`
- **Dependencias**: Ninguna
- **Estimación**: 6-8 horas
- **Espacio para imágenes**: 
  - [ ] Screenshot del diseño actual (cards)
  - [ ] Mockup del nuevo diseño (tabla)
  - [ ] Vista mobile de la tabla

---

### FR-002: Implementar Métricas en Dashboard Administrador
- **Título**: Dashboard de métricas completo para administrador
- **Descripción**:
  Implementar un dashboard completo con las siguientes métricas:
  
  **Métricas principales (cards superiores):**
  - Total de ventas (monto)
  - Número de reservas (total)
  - Fotógrafos activos
  - Usuarios registrados
  - Tasa de conversión
  
  **Gráficos:**
  - Gráfico de líneas: Ventas por fecha (últimos 30 días)
  - Gráfico de barras: Paquetes más vendidos
  - Gráfico de pie: Distribución de métodos de pago
  - Gráfico de líneas: Nuevos usuarios por fecha
  - Tabla: Top fotógrafos por ventas
  
  **Filtros:**
  - Selector de rango de fechas
  - Filtro por fotógrafo
  - Filtro por estado de venta

- **Prioridad**: 🔴 Alta
- **Módulo**: Dashboard Administrador
- **Componentes a crear**:
  - `apps/web/src/modules/dashboard/admin/metricas/revenue-card.tsx`
  - `apps/web/src/modules/dashboard/admin/metricas/bookings-card.tsx`
  - `apps/web/src/modules/dashboard/admin/metricas/photographers-card.tsx`
  - `apps/web/src/modules/dashboard/admin/metricas/users-card.tsx`
  - `apps/web/src/modules/dashboard/admin/metricas/sales-timeline-chart.tsx`
  - `apps/web/src/modules/dashboard/admin/metricas/payment-methods-chart.tsx`
  - `apps/web/src/modules/dashboard/admin/metricas/top-photographers-table.tsx`
  - `apps/web/src/modules/dashboard/admin/metricas/metrics-filters.tsx`
- **Componentes a modificar**:
  - `apps/web/src/app/(private)/(staff)/admin/page.tsx` (descomentar y conectar)
- **APIs backend necesarias**:
  - `GET /api/admin/metrics/summary` (ventas totales, reservas, etc.)
  - `GET /api/admin/metrics/sales-timeline?from=&to=`
  - `GET /api/admin/metrics/top-packages`
  - `GET /api/admin/metrics/payment-distribution`
  - `GET /api/admin/metrics/top-photographers`
- **Dependencias**: Librería de gráficos (recharts o similar)
- **Estimación**: 12-16 horas
- **Espacio para imágenes**:
  - [ ] Wireframe del dashboard completo
  - [ ] Mockup de cards de métricas
  - [ ] Mockup de cada gráfico

---

### FR-003: Implementar Métricas en Dashboard Fotógrafo
- **Título**: Dashboard de métricas personalizado para fotógrafo
- **Descripción**:
  Implementar dashboard con métricas específicas del fotógrafo:
  
  **Métricas principales:**
  - Total ganado (este mes / total)
  - Número de reservas pendientes
  - Número de reservas completadas
  - Próximas sesiones (hoy/esta semana)
  - Rating promedio (si hay sistema de reviews)
  
  **Gráficos:**
  - Gráfico de líneas: Ingresos por fecha (últimos 30 días)
  - Gráfico de barras: Paquetes más vendidos del fotógrafo
  - Calendario visual: Disponibilidad y reservas
  - Tabla: Próximas sesiones
  
  **Resumen rápido:**
  - Última venta
  - Paquete más popular
  - Horario más solicitado

- **Prioridad**: 🔴 Alta
- **Módulo**: Dashboard Fotógrafo
- **Componentes a crear**:
  - `apps/web/src/modules/dashboard/photographer/metrics/earnings-card.tsx`
  - `apps/web/src/modules/dashboard/photographer/metrics/bookings-summary-card.tsx`
  - `apps/web/src/modules/dashboard/photographer/metrics/upcoming-sessions-card.tsx`
  - `apps/web/src/modules/dashboard/photographer/metrics/earnings-chart.tsx`
  - `apps/web/src/modules/dashboard/photographer/metrics/popular-packages-chart.tsx`
  - `apps/web/src/modules/dashboard/photographer/metrics/availability-calendar.tsx`
  - `apps/web/src/modules/dashboard/photographer/metrics/next-sessions-table.tsx`
- **Componentes a modificar**:
  - `apps/web/src/app/(private)/(staff)/photographer/page.tsx` (descomentar)
- **APIs backend necesarias**:
  - `GET /api/photographer/metrics/summary/:photographerId`
  - `GET /api/photographer/metrics/earnings/:photographerId?from=&to=`
  - `GET /api/photographer/metrics/popular-packages/:photographerId`
  - `GET /api/photographer/upcoming-sessions/:photographerId`
- **Dependencias**: Librería de gráficos, librería de calendario
- **Estimación**: 10-14 horas
- **Espacio para imágenes**:
  - [ ] Wireframe del dashboard
  - [ ] Mockup de cards
  - [ ] Mockup del calendario de disponibilidad

---

### FR-004: Implementar Sistema de Gestión de Usuarios (Admin)
- **Título**: Panel completo de gestión de usuarios para administrador
- **Descripción**:
  Mejorar el panel de usuarios del administrador con funcionalidades completas:
  
  **Funcionalidades:**
  - Tabla de usuarios con información completa
  - Búsqueda por nombre, email, teléfono
  - Filtros: por rol, estado (baneado/activo), verificado
  - Cambio de rol (user → photographer, photographer → admin, etc.)
  - Banear/desbanear usuarios con razón
  - Ver detalles completos del usuario (modal)
  - Ver historial de actividad del usuario
  - Ver ventas/compras del usuario
  - Exportar lista de usuarios (CSV)
  - Acciones en batch (seleccionar múltiples usuarios)
  
  **Validaciones:**
  - Confirmar antes de banear
  - Requerir razón al banear
  - No permitir auto-degradación de rol
  - Logs de auditoría para cambios de rol

- **Prioridad**: 🟠 Media-Alta
- **Módulo**: Dashboard Administrador - Usuarios
- **Componentes a crear**:
  - `apps/web/src/modules/dashboard/users/users-table.tsx`
  - `apps/web/src/modules/dashboard/users/users-filters.tsx`
  - `apps/web/src/modules/dashboard/users/users-search.tsx`
  - `apps/web/src/modules/dashboard/users/user-details-modal.tsx`
  - `apps/web/src/modules/dashboard/users/user-activity-timeline.tsx`
  - `apps/web/src/modules/dashboard/users/ban-user-dialog.tsx`
  - `apps/web/src/modules/dashboard/users/change-role-dialog.tsx`
  - `apps/web/src/modules/dashboard/users/export-users-button.tsx`
- **Componentes a modificar**:
  - `apps/web/src/modules/dashboard/users/*` (todos los existentes)
  - `apps/web/src/app/(private)/(staff)/admin/usuarios/page.tsx`
- **APIs backend necesarias**:
  - `GET /api/admin/users?search=&role=&status=&page=&limit=`
  - `GET /api/admin/users/:id/details`
  - `GET /api/admin/users/:id/activity`
  - `PATCH /api/admin/users/:id/role`
  - `PATCH /api/admin/users/:id/ban`
  - `PATCH /api/admin/users/:id/unban`
  - `GET /api/admin/users/export` (CSV)
- **Dependencias**: Librería para export CSV
- **Estimación**: 14-18 horas
- **Espacio para imágenes**:
  - [ ] Diseño de tabla de usuarios
  - [ ] Modal de detalles de usuario
  - [ ] Diálogo de confirmación de ban

---

### FR-005: Mejorar Contador del Evento SOFA
- **Título**: Contador dinámico y configurable para evento SOFA
- **Descripción**:
  Mejorar el contador actual del hero para hacerlo más flexible:
  
  **Mejoras requeridas:**
  - Mover la fecha del evento a una variable de entorno o configuración
  - Permitir configuración desde panel de admin
  - Mostrar mensaje cuando el evento termine
  - Añadir animaciones smooth al contador
  - Mejorar el diseño visual (degradados, efectos)
  - Añadir botón para añadir al calendario (Google Calendar, iCal)
  - Mostrar zona horaria del evento
  - Opción para múltiples eventos (próximos eventos)
  
  **Validaciones:**
  - Manejar caso cuando el evento ya pasó
  - Manejar caso cuando faltan más de 365 días
  - Sincronización correcta entre servidor y cliente

- **Prioridad**: 🟠 Media
- **Módulo**: Landing Page - Hero
- **Componentes a modificar**:
  - `apps/web/src/modules/landing/hero.tsx`
  - `apps/web/src/hooks/use-countdown.tsx`
- **Componentes a crear**:
  - `apps/web/src/modules/landing/event-calendar-button.tsx`
  - `apps/web/src/modules/landing/event-config.ts` (configuración)
- **APIs backend necesarias**:
  - `GET /api/events/current` (fecha del próximo evento)
  - `GET /api/events/all` (todos los eventos)
  - `PATCH /api/admin/events/:id` (actualizar fecha desde admin)
- **Dependencias**: date-fns (ya instalado)
- **Estimación**: 4-6 horas
- **Espacio para imágenes**:
  - [ ] Diseño actual vs nuevo diseño
  - [ ] Animaciones del contador
  - [ ] Vista cuando el evento terminó

---

### FR-006: Implementar Sistema de Tickets
- **Título**: Sistema completo de tickets para reservas
- **Descripción**:
  Implementar sistema de tickets para que usuarios puedan buscar sus reservas:
  
  **Funcionalidades:**
  - Generación automática de ticket único por reserva
  - Envío de ticket por email después de reserva
  - Búsqueda de ticket en el hero (input existente)
  - Modal de detalles del ticket con:
    - Código QR del ticket
    - Información completa de la reserva
    - Estado de la reserva
    - Información del fotógrafo
    - Detalles del paquete
    - Fecha y hora de la sesión
    - Método de pago y estado
    - Botón para descargar ticket (PDF)
    - Botón para cancelar (si aplica)
  - Sistema de verificación de tickets (para fotógrafos)
  - Historial de tickets por usuario
  
  **Validaciones:**
  - Formato de ticket: XXX-XXX-XXX (9 caracteres)
  - Búsqueda case-insensitive
  - Rate limiting para búsquedas
  - Tickets únicos por reserva

- **Prioridad**: 🔴 Alta
- **Módulo**: Global (Frontend y Backend)
- **Componentes a crear**:
  - `apps/web/src/modules/tickets/ticket-search-modal.tsx`
  - `apps/web/src/modules/tickets/ticket-details-card.tsx`
  - `apps/web/src/modules/tickets/ticket-qr-code.tsx`
  - `apps/web/src/modules/tickets/download-ticket-button.tsx`
  - `apps/web/src/modules/tickets/verify-ticket-scanner.tsx` (para fotógrafos)
  - `apps/web/src/modules/dashboard/photographer/verify-ticket-page.tsx`
- **Componentes a modificar**:
  - `apps/web/src/modules/landing/hero.tsx` (conectar input y modal)
  - `apps/web/src/modules/landing/modal-ticket.tsx` (completar implementación)
- **APIs backend necesarias**:
  - `GET /api/tickets/search?code=` (buscar ticket)
  - `GET /api/tickets/:id` (detalles completos)
  - `POST /api/tickets/verify` (verificar validez)
  - `GET /api/tickets/download/:id` (generar PDF)
  - `DELETE /api/tickets/:id/cancel` (cancelar reserva)
- **Servicios backend a crear**:
  - `packages/api/src/modules/tickets/ticket.service.ts`
  - `packages/api/src/modules/tickets/ticket.route.ts`
  - `packages/api/src/modules/tickets/ticket-generator.ts` (generador de códigos)
  - `packages/api/src/modules/tickets/ticket-pdf.ts` (generador de PDF)
- **Cambios en BD (Prisma)**:
  - Agregar campo `ticketCode` a modelo `Sale`
  - Índice único en `ticketCode`
- **Dependencias**: 
  - qrcode (generación QR)
  - jsPDF o similar (generación PDF)
- **Estimación**: 18-24 horas
- **Espacio para imágenes**:
  - [ ] Mockup del modal de ticket
  - [ ] Diseño del ticket (PDF)
  - [ ] Vista de verificación de ticket

---

### FR-007: Mejorar UI de la Agenda
- **Título**: Rediseño y mejoras UX de la agenda de reservas
- **Descripción**:
  Mejorar la experiencia de usuario en el proceso de reserva:
  
  **Mejoras de diseño:**
  - Progress bar más visual (con iconos de paso)
  - Mejores transiciones entre pasos
  - Cards de fotógrafos más atractivas (con rating, precio desde)
  - Vista de calendario mejorada para selección de fecha
  - Indicadores visuales de disponibilidad
  - Resumen lateral que se mantenga visible
  - Validación en tiempo real
  - Loading states más claros
  - Mensajes de error más informativos
  
  **Mejoras funcionales:**
  - Permitir volver a pasos anteriores sin perder info
  - Auto-guardado en localStorage
  - Mostrar slots disponibles en tiempo real
  - Filtros para fotógrafos (precio, rating, especialidad)
  - Búsqueda de fotógrafos
  - Comparador de paquetes
  - Preview de paquete al hacer hover
  - Resumen final antes de confirmar con posibilidad de editar
  
  **Responsive:**
  - Optimizar para mobile (stepper vertical)
  - Touch gestures para navegar
  - Bottom sheet en mobile para resumen

- **Prioridad**: 🟠 Media
- **Módulo**: Agenda
- **Componentes a modificar**:
  - `apps/web/src/app/(public)/agenda/page.tsx`
  - `apps/web/src/modules/agenda/select-photographer.tsx`
  - `apps/web/src/modules/agenda/select-package.tsx`
  - `apps/web/src/modules/agenda/select-day.tsx`
  - `apps/web/src/modules/agenda/select-payment-method.tsx`
  - `apps/web/src/modules/agenda/user-data.tsx`
  - `apps/web/src/modules/agenda/confirm-payment.tsx`
  - `apps/web/src/modules/agenda/config/stepper.config.ts`
- **Componentes a crear**:
  - `apps/web/src/modules/agenda/booking-summary-sidebar.tsx`
  - `apps/web/src/modules/agenda/photographer-filters.tsx`
  - `apps/web/src/modules/agenda/package-comparison.tsx`
  - `apps/web/src/modules/agenda/improved-calendar.tsx`
- **Hooks a crear**:
  - `apps/web/src/hooks/use-booking-persistence.tsx` (localStorage)
  - `apps/web/src/hooks/use-real-time-availability.tsx`
- **Dependencias**: 
  - react-day-picker o similar (calendario mejorado)
- **Estimación**: 16-20 horas
- **Espacio para imágenes**:
  - [ ] Wireframe del flujo completo
  - [ ] Mockup de cada paso mejorado
  - [ ] Vista mobile del stepper

---

### FR-008: Implementar Panel de Usuarios (Usuario Regular)
- **Título**: Panel personal para usuarios regulares
- **Descripción**:
  Crear un panel personal para usuarios que hicieron reservas:
  
  **Funcionalidades:**
  - Dashboard personal con:
    - Resumen de reservas (pendientes, completadas, pasadas)
    - Próximas sesiones
    - Historial de reservas
  - Sección "Mis Reservas":
    - Lista de todas las reservas
    - Filtros: por estado, por fecha, por fotógrafo
    - Ver detalles de cada reserva
    - Descargar ticket
    - Cancelar reserva (con política de cancelación)
    - Reprogramar sesión (si está disponible)
  - Sección "Mis Fotos":
    - Galería de fotos entregadas por fotógrafos
    - Descargar fotos individuales o en lote
    - Compartir galería
  - Sección "Favoritos":
    - Fotógrafos favoritos
    - Paquetes guardados
  - Perfil personal:
    - Actualizar información
    - Configuración de notificaciones
    - Historial de pagos
  
  **Notificaciones:**
  - Email de confirmación
  - Recordatorio 24h antes de sesión
  - Notificación cuando fotos estén listas

- **Prioridad**: 🟡 Media-Baja
- **Módulo**: Dashboard Usuario
- **Componentes a crear**:
  - `apps/web/src/app/(private)/user/page.tsx` (nueva ruta)
  - `apps/web/src/app/(private)/user/reservas/page.tsx`
  - `apps/web/src/app/(private)/user/fotos/page.tsx`
  - `apps/web/src/app/(private)/user/favoritos/page.tsx`
  - `apps/web/src/modules/user-dashboard/bookings-summary-card.tsx`
  - `apps/web/src/modules/user-dashboard/upcoming-sessions-card.tsx`
  - `apps/web/src/modules/user-dashboard/booking-history-table.tsx`
  - `apps/web/src/modules/user-dashboard/booking-details-modal.tsx`
  - `apps/web/src/modules/user-dashboard/cancel-booking-dialog.tsx`
  - `apps/web/src/modules/user-dashboard/photo-gallery.tsx`
  - `apps/web/src/modules/user-dashboard/favorites-grid.tsx`
- **APIs backend necesarias**:
  - `GET /api/user/bookings` (todas las reservas del usuario)
  - `GET /api/user/bookings/:id`
  - `DELETE /api/user/bookings/:id/cancel`
  - `PATCH /api/user/bookings/:id/reschedule`
  - `GET /api/user/photos` (fotos entregadas)
  - `POST /api/user/favorites/photographer/:id`
  - `POST /api/user/favorites/package/:id`
- **Estimación**: 20-24 horas
- **Espacio para imágenes**:
  - [ ] Wireframe del dashboard de usuario
  - [ ] Vista de mis reservas
  - [ ] Galería de fotos

---

### FR-009: Conectar Botones del Hero
- **Título**: Conectar botones de CTA en Hero Section
- **Descripción**:
  Los botones "CONTÁCTANOS" y "AGENDAR" en el hero no tienen funcionalidad
  
  **Implementar:**
  - Botón "CONTÁCTANOS": scroll smooth a sección de contacto
  - Botón "AGENDAR": navegación a /agenda
  - Añadir smooth scroll behavior
  - Añadir animación en hover
  - Tracking de clicks (analytics)

- **Prioridad**: 🟢 Baja
- **Módulo**: Landing - Hero
- **Archivos a modificar**:
  - `apps/web/src/modules/landing/hero.tsx` (líneas 58-69)
- **Estimación**: 1 hora
- **Espacio para imágenes**: N/A

---

### FR-010: Optimización de Imágenes
- **Título**: Migrar a next/image y optimizar assets
- **Descripción**:
  Usar componente optimizado de Next.js para imágenes:
  
  **Tareas:**
  - Reemplazar tags `<img>` por `<Image>` de Next.js
  - Configurar domains en next.config
  - Implementar lazy loading
  - Generar múltiples tamaños (responsive)
  - Convertir a formatos modernos (WebP, AVIF)
  - Optimizar imágenes del slider del hero
  - Implementar blur placeholder

- **Prioridad**: 🟡 Media
- **Módulo**: Global - Frontend
- **Archivos a revisar**: Todos los componentes con imágenes
- **Estimación**: 6-8 horas
- **Espacio para imágenes**: N/A

---

## ⚙️ BACKEND

### BE-001: API de Métricas para Administrador
- **Título**: Endpoints de métricas agregadas para admin
- **Descripción**:
  Crear servicios y rutas para obtener métricas del sistema:
  
  **Endpoints a implementar:**
  ```typescript
  GET /api/admin/metrics/summary
  Response: {
    totalRevenue: number,
    totalBookings: number,
    activePhotographers: number,
    totalUsers: number,
    conversionRate: number,
    avgBookingValue: number,
    period: { from: Date, to: Date }
  }
  
  GET /api/admin/metrics/sales-timeline?from=&to=&groupBy=day|week|month
  Response: {
    timeline: Array<{ date: string, amount: number, count: number }>
  }
  
  GET /api/admin/metrics/top-packages?limit=10
  Response: {
    packages: Array<{ id, name, sales, revenue, photographer }>
  }
  
  GET /api/admin/metrics/payment-distribution
  Response: {
    distribution: Array<{ method: string, count: number, percentage: number }>
  }
  
  GET /api/admin/metrics/top-photographers?limit=10
  Response: {
    photographers: Array<{ id, name, sales, revenue, rating }>
  }
  
  GET /api/admin/metrics/user-growth?from=&to=&groupBy=day|week|month
  Response: {
    growth: Array<{ date: string, newUsers: number, totalUsers: number }>
  }
  ```
  
  **Optimizaciones:**
  - Queries eficientes con agregaciones de Prisma
  - Caching con Redis (opcional)
  - Paginación cuando sea necesario

- **Prioridad**: 🔴 Alta
- **Módulo**: API - Admin Metrics
- **Archivos a crear**:
  - `packages/api/src/modules/admin-metrics/admin-metrics.service.ts`
  - `packages/api/src/modules/admin-metrics/admin-metrics.route.ts`
  - `packages/api/src/modules/admin-metrics/admin-metrics.module.ts`
  - `packages/api/src/modules/admin-metrics/admin-metrics.types.ts`
- **Dependencias**: date-fns para manejo de fechas
- **Estimación**: 8-10 horas
- **Espacio para imágenes**: N/A

---

### BE-002: API de Métricas para Fotógrafo
- **Título**: Endpoints de métricas personalizadas por fotógrafo
- **Descripción**:
  Crear servicios para métricas específicas de cada fotógrafo:
  
  **Endpoints a implementar:**
  ```typescript
  GET /api/photographer/metrics/summary/:photographerId
  Response: {
    totalEarnings: { thisMonth: number, allTime: number },
    bookings: { pending: number, completed: number, cancelled: number },
    upcomingSessions: { today: number, thisWeek: number },
    avgRating: number,
    popularPackage: { id, name, sales }
  }
  
  GET /api/photographer/metrics/earnings/:photographerId?from=&to=&groupBy=
  Response: {
    earnings: Array<{ date: string, amount: number, bookings: number }>
  }
  
  GET /api/photographer/metrics/popular-packages/:photographerId
  Response: {
    packages: Array<{ id, name, sales, revenue, percentage }>
  }
  
  GET /api/photographer/upcoming-sessions/:photographerId?limit=10
  Response: {
    sessions: Array<{ 
      id, buyerName, packageName, date, time, status 
    }>
  }
  
  GET /api/photographer/metrics/availability-calendar/:photographerId?month=
  Response: {
    calendar: Array<{ 
      date: string, 
      totalSlots: number, 
      bookedSlots: number, 
      availableSlots: number 
    }>
  }
  ```

- **Prioridad**: 🔴 Alta
- **Módulo**: API - Photographer Metrics
- **Archivos a crear**:
  - `packages/api/src/modules/photographer-metrics/photographer-metrics.service.ts`
  - `packages/api/src/modules/photographer-metrics/photographer-metrics.route.ts`
  - `packages/api/src/modules/photographer-metrics/photographer-metrics.module.ts`
- **Estimación**: 6-8 horas
- **Espacio para imágenes**: N/A

---

### BE-003: Mejorar API de Gestión de Usuarios
- **Título**: Endpoints completos para gestión de usuarios por admin
- **Descripción**:
  Ampliar el servicio de usuarios con todas las funcionalidades necesarias:
  
  **Endpoints a mejorar/crear:**
  ```typescript
  GET /api/admin/users?search=&role=&status=&page=&limit=&sort=
  PATCH /api/admin/users/:id/role (mejorar con auditoría)
  PATCH /api/admin/users/:id/ban (añadir razón y expiración)
  PATCH /api/admin/users/:id/unban
  GET /api/admin/users/:id/details (info completa + stats)
  GET /api/admin/users/:id/activity (historial de acciones)
  GET /api/admin/users/export?format=csv (exportar usuarios)
  ```
  
  **Auditoría:**
  - Registrar en AuditLog todos los cambios de rol
  - Registrar bans/unbans
  - Incluir IP y user agent del admin que hizo el cambio
  
  **Validaciones:**
  - No permitir que admin se autodegrade
  - Validar razón de ban (mínimo 10 caracteres)
  - Validar fecha de expiración de ban

- **Prioridad**: 🟠 Media-Alta
- **Módulo**: API - Users
- **Archivos a modificar**:
  - `packages/api/src/modules/users/users.service.ts`
  - `packages/api/src/modules/users/users.route.ts`
- **Archivos a crear**:
  - `packages/api/src/modules/users/users.types.ts`
  - `packages/api/src/modules/users/user-export.service.ts`
- **Cambios en BD**: Ya soportado (campos de audit existentes)
- **Estimación**: 8-10 horas
- **Espacio para imágenes**: N/A

---

### BE-004: Sistema de Tickets - Backend
- **Título**: Implementar lógica completa de tickets en backend
- **Descripción**:
  Crear módulo completo para gestión de tickets:
  
  **Funcionalidades:**
  - Generación automática de código único al crear Sale
  - Formato: XXX-XXX-XXX (ej: ABC-123-XYZ)
  - Búsqueda de ticket por código
  - Verificación de validez de ticket
  - Generación de PDF del ticket
  - Envío de email con ticket al crear reserva
  - Sistema de verificación para fotógrafos
  - Invalidación de ticket al cancelar
  
  **Endpoints:**
  ```typescript
  GET /api/tickets/search?code=ABC-123-XYZ
  GET /api/tickets/:id
  POST /api/tickets/verify (verificar en sesión)
  GET /api/tickets/:id/download (PDF)
  ```
  
  **Modificaciones en Sale:**
  - Auto-generar ticketCode al crear
  - Validar unicidad
  - Incluir en respuesta de createSale

- **Prioridad**: 🔴 Alta
- **Módulo**: API - Tickets
- **Archivos a crear**:
  - `packages/api/src/modules/tickets/ticket.service.ts`
  - `packages/api/src/modules/tickets/ticket.route.ts`
  - `packages/api/src/modules/tickets/ticket.module.ts`
  - `packages/api/src/modules/tickets/ticket-generator.ts`
  - `packages/api/src/modules/tickets/ticket-pdf-generator.ts`
- **Archivos a modificar**:
  - `packages/api/src/modules/sales/sale.service.ts` (auto-generar ticket)
  - `packages/database/prisma/schema.prisma` (agregar ticketCode)
- **Migración de BD**:
  ```prisma
  model Sale {
    // ... campos existentes
    ticketCode String @unique
  }
  ```
- **Dependencias**: 
  - Generador de códigos aleatorios
  - Librería PDF (pdfkit, puppeteer, o similar)
- **Estimación**: 10-12 horas
- **Espacio para imágenes**: N/A

---

### BE-005: API de Configuración de Eventos
- **Título**: Endpoints para configurar eventos dinámicamente
- **Descripción**:
  Permitir configuración de eventos desde el admin:
  
  **Modelo de BD:**
  ```prisma
  model Event {
    id String @id @default(uuid())
    name String
    date DateTime
    description String?
    location String?
    imageUrl String?
    isActive Boolean @default(true)
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }
  ```
  
  **Endpoints:**
  ```typescript
  GET /api/events/current (próximo evento activo)
  GET /api/events (todos los eventos)
  POST /api/admin/events (crear evento)
  PATCH /api/admin/events/:id (actualizar)
  DELETE /api/admin/events/:id (eliminar)
  ```

- **Prioridad**: 🟡 Media
- **Módulo**: API - Events
- **Archivos a crear**:
  - `packages/api/src/modules/events/event.service.ts`
  - `packages/api/src/modules/events/event.route.ts`
  - `packages/api/src/modules/events/event.module.ts`
- **Migración de BD**: Crear tabla Event
- **Estimación**: 4-6 horas
- **Espacio para imágenes**: N/A

---

### BE-006: Mejorar Manejo de Errores
- **Título**: Implementar manejo de errores consistente
- **Descripción**:
  Estandarizar el manejo de errores en todo el backend:
  
  **Implementar:**
  - Clase de errores personalizados (AppError, ValidationError, etc.)
  - Error handler global en Elysia
  - Logging estructurado (reemplazar console.log)
  - Códigos de error consistentes
  - Mensajes de error en español
  - Stack traces solo en desarrollo
  
  **Estructura de error:**
  ```typescript
  {
    success: false,
    error: {
      code: "USER_NOT_FOUND",
      message: "Usuario no encontrado",
      status: 404,
      timestamp: "2024-01-15T10:00:00Z"
    }
  }
  ```

- **Prioridad**: 🟠 Media-Alta
- **Módulo**: API - Core
- **Archivos a crear**:
  - `packages/api/src/core/errors/app-error.ts`
  - `packages/api/src/core/errors/error-codes.ts`
  - `packages/api/src/core/middleware/error-handler.ts`
  - `packages/api/src/core/logger/logger.ts`
- **Archivos a modificar**: Todos los servicios (reemplazar console.log)
- **Dependencias**: pino o winston para logging
- **Estimación**: 8-10 horas
- **Espacio para imágenes**: N/A

---

### BE-007: Singleton de PrismaClient
- **Título**: Implementar patrón singleton para Prisma
- **Descripción**:
  Evitar crear múltiples instancias de PrismaClient:
  
  **Implementar:**
  ```typescript
  // packages/api/src/modules/prisma/prisma-client.ts
  class PrismaService {
    private static instance: PrismaClient;
    
    private constructor() {}
    
    public static getInstance(): PrismaClient {
      if (!PrismaService.instance) {
        PrismaService.instance = new PrismaClient();
      }
      return PrismaService.instance;
    }
  }
  
  export const prisma = PrismaService.getInstance();
  ```
  
  **Modificar todos los servicios** para usar la instancia singleton

- **Prioridad**: 🟠 Media
- **Módulo**: API - Prisma
- **Archivos a modificar**:
  - `packages/api/src/modules/prisma/index.ts`
  - Todos los servicios que usan PrismaClient
- **Estimación**: 2-3 horas
- **Espacio para imágenes**: N/A

---

### BE-008: Rate Limiting
- **Título**: Implementar rate limiting en APIs
- **Descripción**:
  Proteger APIs de abuso:
  
  **Configuración:**
  - Global: 100 requests/minuto por IP
  - Auth endpoints: 5 requests/minuto
  - Búsqueda de tickets: 10 requests/minuto
  - Upload de imágenes: 5 requests/minuto
  
  **Implementar:**
  - Middleware de rate limiting en Elysia
  - Headers de rate limit en respuestas
  - Mensajes informativos al exceder límite
  - Whitelist para IPs de confianza (opcional)

- **Prioridad**: 🟠 Media
- **Módulo**: API - Core
- **Archivos a crear**:
  - `packages/api/src/core/middleware/rate-limiter.ts`
- **Dependencias**: @elysiajs/rate-limit o implementación custom
- **Estimación**: 3-4 horas
- **Espacio para imágenes**: N/A

---

### BE-009: CORS Configuration
- **Título**: Configurar CORS apropiadamente
- **Descripción**:
  Configurar CORS para producción:
  
  **Implementar:**
  ```typescript
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))
  ```

- **Prioridad**: 🟠 Media
- **Módulo**: API - Core
- **Archivos a modificar**:
  - `apps/backend-worker/src/index.ts`
- **Estimación**: 1 hora
- **Espacio para imágenes**: N/A

---

### BE-010: API Documentation (Swagger)
- **Título**: Generar documentación de API con Swagger
- **Descripción**:
  Documentar todas las APIs con Swagger/OpenAPI:
  
  **Implementar:**
  - Plugin de Swagger para Elysia
  - Documentar todos los endpoints
  - Esquemas de request/response
  - Ejemplos de uso
  - Información de autenticación
  - Disponible en /api/swagger

- **Prioridad**: 🟡 Media
- **Módulo**: API - Documentation
- **Dependencias**: @elysiajs/swagger
- **Estimación**: 6-8 horas
- **Espacio para imágenes**: N/A

---

## 🧪 TESTING

### TS-001: Configurar Framework de Testing
- **Título**: Setup completo de testing con Vitest
- **Descripción**:
  Configurar infraestructura de testing:
  
  **Tareas:**
  - Instalar Vitest en todos los packages
  - Configurar vitest.config.ts
  - Setup de testing-library para React
  - Configurar coverage
  - Añadir scripts de test en package.json
  - Configurar Turbo para testing
  
  **Archivos a crear:**
  - `vitest.config.ts` (raíz y packages)
  - `tests/setup.ts` (configuración global)
  - `.github/workflows/test.yml` (CI)

- **Prioridad**: 🔴 Alta
- **Módulo**: Infraestructura
- **Estimación**: 4-6 horas
- **Espacio para imágenes**: N/A

---

### TS-002: Tests Unitarios - Backend Services
- **Título**: Escribir tests unitarios para servicios backend
- **Descripción**:
  Crear tests para todos los servicios existentes:
  
  **Coverage objetivo:** 80% mínimo
  
  **Servicios a testear:**
  - SaleService
  - PackageService
  - UserService
  - CouponService
  - DayService
  - TimeService
  - ProfileService
  - PhotographerService
  
  **Tests a incluir:**
  - Happy paths
  - Edge cases
  - Error handling
  - Validaciones
  - Autorizaciones
  
  **Mock de Prisma:**
  - Usar jest-mock-extended o similar
  - Mock de transacciones
  - Mock de relaciones

- **Prioridad**: 🔴 Alta
- **Módulo**: Testing - Backend
- **Archivos a crear**:
  - `packages/api/src/modules/sales/sale.service.test.ts`
  - `packages/api/src/modules/packages/packages.service.test.ts`
  - `packages/api/src/modules/users/users.service.test.ts`
  - ... (uno por servicio)
  - `packages/api/src/test-utils/prisma-mock.ts`
- **Estimación**: 20-24 horas
- **Espacio para imágenes**: N/A

---

### TS-003: Tests de Integración - API Endpoints
- **Título**: Tests de integración para endpoints
- **Descripción**:
  Probar endpoints end-to-end:
  
  **Setup:**
  - Base de datos de test (PostgreSQL en Docker)
  - Seed data para tests
  - Cleanup después de cada test
  
  **Tests a incluir:**
  - Autenticación y autorización
  - CRUD de recursos
  - Validaciones de input
  - Manejo de errores
  - Rate limiting
  
  **Endpoints críticos:**
  - `/api/sale` (crear reserva completa)
  - `/api/auth` (login/register)
  - `/api/packages` (CRUD)
  - `/api/users` (gestión admin)

- **Prioridad**: 🟠 Media-Alta
- **Módulo**: Testing - Backend
- **Archivos a crear**:
  - `packages/api/src/test-utils/test-server.ts`
  - `packages/api/src/test-utils/seed-data.ts`
  - `packages/api/src/__tests__/integration/*.test.ts`
- **Estimación**: 16-20 horas
- **Espacio para imágenes**: N/A

---

### TS-004: Tests Unitarios - React Components
- **Título**: Tests para componentes de UI
- **Descripción**:
  Testear componentes compartidos y críticos:
  
  **Componentes a testear (prioritarios):**
  - @camaras/ui:
    - Button
    - Input
    - Select
    - Dialog
    - Table
  - Módulos de agenda:
    - SelectPhotographer
    - SelectPackage
    - SelectDay
  - Formularios críticos
  
  **Tests a incluir:**
  - Rendering correcto
  - Interacciones de usuario
  - Validaciones
  - Estados (loading, error, success)
  - Accesibilidad básica

- **Prioridad**: 🟠 Media
- **Módulo**: Testing - Frontend
- **Archivos a crear**:
  - `packages/ui/src/components/__tests__/*.test.tsx`
  - `apps/web/src/modules/agenda/__tests__/*.test.tsx`
- **Dependencias**: @testing-library/react, @testing-library/user-event
- **Estimación**: 16-20 horas
- **Espacio para imágenes**: N/A

---

### TS-005: Tests E2E - Flujos Críticos
- **Título**: Tests end-to-end con Playwright
- **Descripción**:
  Probar flujos completos de usuario:
  
  **Setup:**
  - Instalar Playwright
  - Configurar playwright.config.ts
  - Setup de DB de test
  
  **Flujos a testear:**
  1. Registro y login de usuario
  2. Flujo completo de reserva (agenda)
  3. Login de fotógrafo → crear paquete → gestionar horarios
  4. Login de admin → cambiar rol de usuario
  5. Búsqueda de ticket
  
  **Configuración:**
  - Tests en Chrome, Firefox, Safari
  - Screenshots en failures
  - Video recording
  - Parallel execution

- **Prioridad**: 🟡 Media
- **Módulo**: Testing - E2E
- **Archivos a crear**:
  - `e2e/playwright.config.ts`
  - `e2e/tests/booking-flow.spec.ts`
  - `e2e/tests/photographer-dashboard.spec.ts`
  - `e2e/tests/admin-actions.spec.ts`
  - `e2e/tests/ticket-search.spec.ts`
- **Dependencias**: @playwright/test
- **Estimación**: 12-16 horas
- **Espacio para imágenes**: N/A

---

### TS-006: Tests de Performance
- **Título**: Tests de carga y performance
- **Descripción**:
  Validar performance del sistema:
  
  **Herramienta**: k6 o Artillery
  
  **Escenarios a probar:**
  - 100 usuarios concurrentes creando reservas
  - 1000 búsquedas de fotógrafos simultáneas
  - Carga de imágenes simultáneas
  - Estrés en endpoints de métricas
  
  **Métricas a medir:**
  - Response time (p95, p99)
  - Throughput
  - Error rate
  - Resource utilization

- **Prioridad**: 🟢 Baja
- **Módulo**: Testing - Performance
- **Archivos a crear**:
  - `performance/scenarios/booking-load.js`
  - `performance/scenarios/search-stress.js`
- **Dependencias**: k6 o artillery
- **Estimación**: 6-8 horas
- **Espacio para imágenes**: N/A

---

## 🚀 DESPLIEGUE Y CI/CD

### CD-001: Configurar GitHub Actions - CI Pipeline
- **Título**: Pipeline de integración continua
- **Descripción**:
  Automatizar validaciones en PRs:
  
  **Pipeline a crear:**
  ```yaml
  name: CI
  on: [pull_request, push]
  
  jobs:
    lint:
      - Checkout
      - Setup Bun
      - Install dependencies
      - Run oxlint
      - Run biome check
    
    type-check:
      - Checkout
      - Setup Bun
      - Install
      - Run check-types (Turbo)
    
    test:
      - Checkout
      - Setup Bun
      - Setup PostgreSQL (service)
      - Install
      - Run migrations
      - Run tests with coverage
      - Upload coverage to Codecov
    
    build:
      - Checkout
      - Setup Bun
      - Install
      - Build all packages
      - Upload build artifacts
  ```
  
  **Optimizaciones:**
  - Usar Turbo cache
  - Parallel jobs
  - Conditional execution (solo afectados)

- **Prioridad**: 🔴 Alta
- **Módulo**: DevOps - CI/CD
- **Archivos a crear**:
  - `.github/workflows/ci.yml`
  - `.github/workflows/lint.yml`
  - `.github/workflows/test.yml`
- **Estimación**: 4-6 horas
- **Espacio para imágenes**: N/A

---

### CD-002: Configurar GitHub Actions - CD Pipeline
- **Título**: Pipeline de despliegue continuo
- **Descripción**:
  Automatizar despliegues:
  
  **Estrategia:**
  - Frontend (Vercel): Auto-deploy en push a main
  - Backend: Deploy a Railway/Render en push a main
  
  **Pipeline a crear:**
  ```yaml
  name: Deploy Production
  on:
    push:
      branches: [main]
  
  jobs:
    deploy-backend:
      - Run migrations (production)
      - Deploy to Railway
      - Health check
      - Rollback on failure
    
    deploy-frontend:
      - Vercel deploy
      - Run smoke tests
      - Notify on Slack/Discord
  ```
  
  **Staging environment:**
  - Deploy a staging en push a develop
  - Run E2E tests en staging
  - Manual approval para production

- **Prioridad**: 🔴 Alta
- **Módulo**: DevOps - CI/CD
- **Archivos a crear**:
  - `.github/workflows/deploy-production.yml`
  - `.github/workflows/deploy-staging.yml`
  - `.github/workflows/rollback.yml`
- **Estimación**: 6-8 horas
- **Espacio para imágenes**: N/A

---

### CD-003: Dockerización del Proyecto
- **Título**: Crear Dockerfiles y docker-compose
- **Descripción**:
  Contenerizar aplicaciones:
  
  **Archivos a crear:**
  - `apps/backend-worker/Dockerfile`
  - `apps/web/Dockerfile`
  - `docker-compose.yml` (desarrollo)
  - `docker-compose.prod.yml` (producción)
  - `.dockerignore`
  
  **Configuración:**
  - Multi-stage builds para optimización
  - Health checks
  - Volume mounts para desarrollo
  - Network configuration
  - Environment variables
  
  **Servicios en compose:**
  - postgres
  - backend
  - frontend
  - redis (opcional, para caching)

- **Prioridad**: 🟠 Media-Alta
- **Módulo**: DevOps - Docker
- **Estimación**: 6-8 horas
- **Espacio para imágenes**: N/A

---

### CD-004: Configurar Variables de Entorno
- **Título**: Gestión de variables de entorno
- **Descripción**:
  Organizar y documentar variables de entorno:
  
  **Tareas:**
  - Crear `.env.example` completo
  - Documentar cada variable
  - Configurar en Vercel
  - Configurar en Railway/Render
  - Validación de env vars al inicio
  
  **Implementar validación:**
  ```typescript
  // packages/api/src/core/config/env-validation.ts
  const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string().min(32),
    // ... todas las variables
  });
  
  envSchema.parse(process.env);
  ```

- **Prioridad**: 🔴 Alta
- **Módulo**: DevOps - Configuration
- **Archivos a crear**:
  - `.env.example`
  - `packages/api/src/core/config/env-validation.ts`
  - `apps/web/src/lib/env-validation.ts`
- **Estimación**: 2-3 horas
- **Espacio para imágenes**: N/A

---

### CD-005: Setup de Monitoring y Logging
- **Título**: Implementar observability en producción
- **Descripción**:
  Configurar herramientas de monitoring:
  
  **Herramientas a integrar:**
  - Sentry (error tracking)
  - LogTail o similar (logs centralizados)
  - Uptime monitoring (UptimeRobot)
  - Performance monitoring (opcional: New Relic)
  
  **Métricas a trackear:**
  - Error rate
  - Response times
  - Database queries
  - API usage
  - User flows
  
  **Alertas:**
  - Error rate > 5%
  - Response time > 2s
  - API down
  - Database connection issues

- **Prioridad**: 🟠 Media
- **Módulo**: DevOps - Monitoring
- **Archivos a crear**:
  - `packages/api/src/core/monitoring/sentry.ts`
  - `apps/web/src/lib/sentry.ts`
  - `packages/api/src/core/monitoring/metrics.ts`
- **Dependencias**: @sentry/node, @sentry/nextjs
- **Estimación**: 4-6 horas
- **Espacio para imágenes**: N/A

---

### CD-006: Configurar Pre-commit Hooks
- **Título**: Validaciones automáticas antes de commits
- **Descripción**:
  Usar Husky y lint-staged:
  
  **Instalar:**
  - Husky
  - lint-staged (ya en package.json)
  
  **Hooks a configurar:**
  - pre-commit:
    - Lint files (oxlint)
    - Format (biome)
    - Type check archivos modificados
  - commit-msg:
    - Validar formato conventional commits
  - pre-push:
    - Run tests afectados

- **Prioridad**: 🟡 Media
- **Módulo**: DevOps - Git Hooks
- **Archivos a crear**:
  - `.husky/pre-commit`
  - `.husky/commit-msg`
  - `.husky/pre-push`
- **Dependencias**: husky
- **Estimación**: 2-3 horas
- **Espacio para imágenes**: N/A

---

### CD-007: Database Backups Automation
- **Título**: Automatizar backups de base de datos
- **Descripción**:
  Configurar backups automáticos:
  
  **Estrategia:**
  - Backups diarios automáticos
  - Retención: 30 días
  - Backups pre-deployment
  - Restauración documentada
  
  **Implementación:**
  - Script de backup (pg_dump)
  - Subir a S3/Supabase Storage
  - Cron job o GitHub Action
  - Verificación de integridad
  - Script de restore

- **Prioridad**: 🟠 Media
- **Módulo**: DevOps - Database
- **Archivos a crear**:
  - `scripts/backup-db.sh`
  - `scripts/restore-db.sh`
  - `.github/workflows/backup-db.yml`
- **Estimación**: 3-4 horas
- **Espacio para imágenes**: N/A

---

### CD-008: Actualizar README y Documentación
- **Título**: Documentación completa del proyecto
- **Descripción**:
  Reescribir README con información del proyecto real:
  
  **Secciones a incluir:**
  - Descripción del proyecto
  - Screenshots/demo
  - Tech stack
  - Getting started (instalación)
  - Estructura del proyecto
  - Scripts disponibles
  - Variables de entorno
  - Testing
  - Deployment
  - Contributing guidelines
  - License
  
  **Otros docs:**
  - CONTRIBUTING.md
  - CODE_OF_CONDUCT.md
  - SECURITY.md (política de seguridad)

- **Prioridad**: 🟡 Media
- **Módulo**: Documentation
- **Archivos a modificar**:
  - `README.md`
- **Archivos a crear**:
  - `CONTRIBUTING.md`
  - `CODE_OF_CONDUCT.md`
  - `SECURITY.md`
- **Estimación**: 3-4 horas
- **Espacio para imágenes**:
  - [ ] Screenshots del proyecto
  - [ ] Diagrama de arquitectura
  - [ ] Logo del proyecto

---

## 🔒 SEGURIDAD Y OPTIMIZACIÓN

### SO-001: Implementar Input Validation Robusta
- **Título**: Validación consistente de inputs
- **Descripción**:
  Asegurar validación en todos los endpoints:
  
  **Implementar:**
  - TypeBox schemas para todos los endpoints
  - Sanitización de inputs
  - Validación de archivos subidos
  - Límites de tamaño
  - Prevención de SQL injection (Prisma ya lo hace)
  - XSS prevention
  
  **Ejemplo:**
  ```typescript
  const CreateSaleSchema = Type.Object({
    photographerId: Type.String({ format: 'uuid' }),
    packageId: Type.String({ format: 'uuid' }),
    buyerEmail: Type.String({ format: 'email' }),
    buyerPhoneNumber: Type.String({ pattern: '^[0-9]{10}$' }),
    // ...
  });
  ```

- **Prioridad**: 🔴 Alta
- **Módulo**: Security - Backend
- **Archivos a crear**:
  - `packages/api/src/modules/*/schemas/*.schema.ts`
- **Estimación**: 8-10 horas
- **Espacio para imágenes**: N/A

---

### SO-002: Implementar API Throttling por Usuario
- **Título**: Rate limiting por usuario autenticado
- **Descripción**:
  Además del rate limiting por IP, implementar por usuario:
  
  **Configuración:**
  - Usuario autenticado: 500 req/hora
  - Fotógrafo: 1000 req/hora
  - Admin: ilimitado
  - Endpoints de upload: 50/hora por usuario

- **Prioridad**: 🟠 Media
- **Módulo**: Security - Backend
- **Archivos a modificar**:
  - `packages/api/src/core/middleware/rate-limiter.ts`
- **Estimación**: 2-3 horas
- **Espacio para imágenes**: N/A

---

### SO-003: Optimización de Queries de BD
- **Título**: Optimizar queries de Prisma
- **Descripción**:
  Mejorar performance de queries:
  
  **Tareas:**
  - Añadir índices necesarios en Prisma schema
  - Optimizar selects (solo campos necesarios)
  - Usar includes en vez de queries separadas
  - Implementar paginación donde falta
  - Query optimization en métricas (agregaciones)
  
  **Índices a agregar:**
  ```prisma
  model Sale {
    // ...
    @@index([photographerId])
    @@index([saleStatus])
    @@index([createdAt])
    @@index([ticketCode])
  }
  
  model Package {
    // ...
    @@index([photographerId])
    @@index([isActive])
  }
  ```

- **Prioridad**: 🟠 Media
- **Módulo**: Performance - Database
- **Archivos a modificar**:
  - `packages/database/prisma/schema.prisma`
  - Servicios con queries ineficientes
- **Estimación**: 4-6 horas
- **Espacio para imágenes**: N/A

---

### SO-004: Implementar Caching con Redis
- **Título**: Cache de datos frecuentes (opcional)
- **Descripción**:
  Añadir caching para mejorar performance:
  
  **Datos a cachear:**
  - Lista de fotógrafos (5 min)
  - Paquetes por fotógrafo (5 min)
  - Métricas de admin (15 min)
  - Disponibilidad de horarios (1 min)
  
  **Implementación:**
  - Redis como cache store
  - Invalidación automática en updates
  - TTL configurables
  - Fallback a DB si cache falla

- **Prioridad**: 🟢 Baja (Optimización)
- **Módulo**: Performance - Caching
- **Archivos a crear**:
  - `packages/api/src/core/cache/redis-client.ts`
  - `packages/api/src/core/cache/cache-manager.ts`
- **Dependencias**: ioredis
- **Estimación**: 6-8 horas
- **Espacio para imágenes**: N/A

---

### SO-005: Audit Logging Completo
- **Título**: Logs de auditoría para acciones críticas
- **Descripción**:
  Extender el sistema de AuditLog:
  
  **Acciones a loggear:**
  - Cambios de rol (ya existe)
  - Creación/edición/eliminación de paquetes
  - Bans de usuarios
  - Cancelación de reservas
  - Cambios de configuración
  - Acceso a datos sensibles
  
  **Implementar:**
  - Middleware de auditoría
  - Incluir IP, user agent, timestamp
  - Almacenar cambios (before/after)
  - API para consultar logs (admin)

- **Prioridad**: 🟡 Media
- **Módulo**: Security - Auditing
- **Archivos a crear**:
  - `packages/api/src/core/audit/audit-logger.ts`
  - `packages/api/src/modules/audit/audit.route.ts`
  - `packages/api/src/modules/audit/audit.service.ts`
- **Estimación**: 6-8 horas
- **Espacio para imágenes**: N/A

---

## 📊 RESUMEN DE PRIORIDADES

### 🔴 ALTA PRIORIDAD (Implementar primero)
1. FR-001: Tabla de paquetes
2. FR-002: Métricas admin
3. FR-003: Métricas fotógrafo
4. FR-006: Sistema de tickets
5. BE-001: API métricas admin
6. BE-002: API métricas fotógrafo
7. BE-004: Backend de tickets
8. TS-001: Setup de testing
9. TS-002: Tests unitarios backend
10. CD-001: CI Pipeline
11. CD-002: CD Pipeline
12. CD-004: Variables de entorno
13. SO-001: Input validation

### 🟠 MEDIA-ALTA PRIORIDAD
14. FR-004: Gestión de usuarios (admin)
15. FR-005: Contador mejorado
16. FR-007: Mejorar UI agenda
17. BE-003: API gestión usuarios mejorada
18. BE-006: Manejo de errores
19. TS-003: Tests de integración
20. CD-003: Dockerización

### 🟡 MEDIA-BAJA PRIORIDAD
21. FR-008: Panel de usuario regular
22. FR-010: Optimización de imágenes
23. TS-004: Tests React components
24. TS-005: Tests E2E
25. CD-005: Monitoring
26. CD-006: Pre-commit hooks
27. SO-003: Optimización queries

### 🟢 BAJA PRIORIDAD (Nice to have)
28. FR-009: Conectar botones hero
29. BE-010: Swagger docs
30. TS-006: Tests de performance
31. SO-004: Redis caching

---

## 📈 ESTIMACIÓN TOTAL

- **Frontend**: ~100-130 horas
- **Backend**: ~60-75 horas
- **Testing**: ~60-75 horas
- **DevOps/CI-CD**: ~30-40 horas
- **Security/Optimization**: ~25-35 horas

**TOTAL ESTIMADO**: ~275-355 horas (~7-9 semanas de trabajo full-time)

---

## 🎯 ROADMAP SUGERIDO

### Sprint 1 (2 semanas): Fundamentos
- Setup de testing (TS-001)
- CI/CD básico (CD-001, CD-004)
- Variables de entorno
- Input validation (SO-001)
- Sistema de tickets completo (FR-006, BE-004)

### Sprint 2 (2 semanas): Métricas
- API métricas admin (BE-001)
- Dashboard admin métricas (FR-002)
- API métricas fotógrafo (BE-002)
- Dashboard fotógrafo métricas (FR-003)
- Tests unitarios servicios (TS-002)

### Sprint 3 (2 semanas): Gestión y UI
- Tabla de paquetes (FR-001)
- Gestión usuarios completa (FR-004, BE-003)
- Mejorar UI agenda (FR-007)
- Contador mejorado (FR-005)
- Tests de integración (TS-003)

### Sprint 4 (1-2 semanas): Pulido y Deploy
- Dockerización (CD-003)
- CD Pipeline (CD-002)
- Tests E2E (TS-005)
- Monitoring (CD-005)
- Documentación (CD-008)
- Optimizaciones finales

---

## 📝 NOTAS FINALES

- Este análisis está basado en el estado actual del código
- Las estimaciones son aproximadas y pueden variar
- Se recomienda priorizar según necesidades del negocio
- Algunas tareas pueden ejecutarse en paralelo
- Se asume equipo de 1-2 desarrolladores full-stack

---

**Fecha de análisis**: 15 de Enero, 2026
**Versión del documento**: 1.0
**Autor**: Análisis automatizado del proyecto
