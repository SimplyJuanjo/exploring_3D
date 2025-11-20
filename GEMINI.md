# Notas del Proyecto

## Hardware
- **Dispositivo Objetivo**: Meta Quest
- **Controladores**: Quest Touch Controllers

## Problemas Conocidos
- **HTTPS**: Requerido para WebXR. Usando `vite-plugin-mkcert`.

## Arquitectura
- **Frontend**: Vite + Three.js
- **Backend**: Node.js + Socket.io (Debug + Multijugador)
- **Red**: Localhost para desarrollo, IP local para testing VR.
- **Multijugador**: Sincronización básica de avatares implementada (Fantasmas).
- **Sincronización de Objetos**: Objetos interactuables (cubo) ahora se sincronizan en tiempo real entre jugadores.

## Reglas de Implementación

### 🎨 Inspiración de Mistborn
**CRÍTICO**: Usar solo mecánicas abstractas, NO terminología específica.

**Durante desarrollo (placeholders permitidos):**
- Comentarios internos pueden usar "Alomancia", "quemar metales", etc.
- Variables temporales: `playerCanBurnSteel`, `isAllomancer`

**Antes de cualquier release público (renombrar TODO lo que tenga CopyRight):**
- ❌ NO usar: "Alomancia", "Mistborn", "Misting", "Scadrial", "Coinshot", "Lurcher"
- ❌ NO usar: Nombres de personajes (Kelsier, Vin, etc.)
- ❌ NO usar: "Quemar metales" en UI visible
- ✅ SÍ usar: Términos genéricos o inventados ("Metalurgia", "Fusión", "Catálisis")
- ✅ SÍ creditar: "Inspired by Brandon Sanderson's work" en about/credits

**Código seguro:**
```javascript
// ❌ MAL (antes de release)
class AllomancerPlayer { burnMetal() {} }

// ✅ BIEN
class MetallurgistPlayer { consumeMetal() {} }
```

**Regla de oro**: Ideas ✅, nombres específicos ❌

## Mantenimiento de Documentación

⚠️ **IMPORTANTE**: Al crear una nueva versión, actualizar AMBOS archivos:
1. **GEMINI.md** - Notas de proyecto, issues conocidos, estado actual
2. **ARCHITECTURE.md** - Patrones de diseño, decisiones técnicas, diagramas

Esto asegura que la documentación siempre esté sincronizada con el código.
