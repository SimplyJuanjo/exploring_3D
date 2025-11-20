# Notas del Proyecto

## Hardware
- **Dispositivo Objetivo**: Meta Quest Pro
- **Controladores**: Quest Pro Touch Controllers

## Problemas Conocidos
- **HTTPS**: Requerido para WebXR. Usando `vite-plugin-mkcert`.

## Arquitectura
- **Frontend**: Vite + Three.js
- **Backend**: Node.js + Socket.io (Debug + Multijugador)
- **Red**: Localhost para desarrollo, IP local para testing VR.
- **Multijugador**: Sincronización básica de avatares implementada (Fantasmas).
- **Sincronización de Objetos**: Objetos interactuables (cubo) ahora se sincronizan en tiempo real entre jugadores.

## Mantenimiento de Documentación

⚠️ **IMPORTANTE**: Al crear una nueva versión, actualizar AMBOS archivos:
1. **GEMINI.md** - Notas de proyecto, issues conocidos, estado actual
2. **ARCHITECTURE.md** - Patrones de diseño, decisiones técnicas, diagramas

Esto asegura que la documentación siempre esté sincronizada con el código.
