# exploring_3D 🎮

> Juego VR Multijugador en WebXR construido con Three.js

Un experimento de realidad virtual para navegadores con soporte multiplayer, mundos infinitos procedurales y mecánicas de telekinesis. Diseñado y desarrollado para **Meta Quest**.

---

## ✨ Características

- 🥽 **WebXR VR**: Soporte completo para cascos VR (Meta Quest)
- 👥 **Multijugador**: Hasta 4 jugadores simultáneos con sincronización en tiempo real
- 🌍 **Mundo Infinito**: Generación procedural de terreno con sistema de chunks
- 🧲 **Telekinesis**: Agarra y mueve objetos con los controles VR
- 🎮 **Doble Modo**: Juega en VR o desde desktop con teclado (WASD)
- 🔧 **Debug Remoto**: Panel de administración para depuración en tiempo real

---

## 🛠️ Stack Tecnológico

### Frontend
- **Three.js** - Rendering 3D
- **WebXR API** - Soporte VR nativo
- **Vite** - Build tool y dev server
- **Socket.io-client** - Cliente WebSocket

### Backend
- **Node.js** - Runtime del servidor
- **Socket.io** - Servidor WebSocket para multijugador
- **Express** - Framework web mínimo
- **HTTPS** - Protocolo seguro (requerido por WebXR)

---

## 📋 Requisitos

- **Node.js** v18+ y npm
- **Meta Quest** (o cualquier casco compatible con WebXR)
- **Certificados SSL** (generados automáticamente por vite-plugin-mkcert)
- **Red local** para testing en VR

---

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone <tu-repo-url>
cd exploring_3D
```

### 2. Instalar dependencias del frontend
```bash
npm install
```

### 3. Instalar dependencias del backend
```bash
cd server
npm install
cd ..
```

---

## ▶️ Ejecución

### Configuración de IP (solo para VR)

Si vas a probar en VR, necesitas configurar la IP de tu PC en la red local:

1. Obtén tu IP local (ejecuta `ipconfig` en Windows o `ifconfig` en Linux/Mac)
2. Crea un archivo `.env` en la raíz del proyecto:
```bash
VITE_SERVER_URL=https://192.168.1.XXX:3000
```
_(reemplaza `XXX` con tu IP local)_

### Iniciar el servidor backend

```bash
cd server
node index.js
```

El servidor estará corriendo en **https://localhost:3000** (o tu IP local:3000).

### Iniciar el frontend (en otra terminal)

```bash
npm run dev -- --host
```

El juego estará disponible en:
- **Desktop**: https://localhost:5173
- **VR**: https://[TU_IP_LOCAL]:5173

### Panel de Administración (Opcional)

Para debug remoto, accede a:
- **https://localhost:5173/admin.html**

---

## 🎮 Controles

### Desktop (Modo Desarrollo)
- **W/A/S/D** - Movimiento
- **Mouse** - Mirar alrededor

### VR (Meta Quest)
- **Joystick Izquierdo** - Movimiento smooth locomotion
- **Trigger (Gatillo)** - Agarrar/Soltar objetos con telekinesis
- **Headset** - Mirar alrededor (tracking natural)

---

## 📁 Estructura del Proyecto

```
exploring_3D/
├── public/
│   ├── grass.png           # Textura del terreno
│   └── admin.html          # Panel de debug remoto
├── server/
│   ├── index.js            # Servidor Socket.io (HTTPS)
│   └── package.json
├── src/
│   ├── main.js             # Punto de entrada, escena Three.js
│   ├── world-manager.js    # Generación de chunks infinitos
│   ├── network-manager.js  # Sincronización multijugador
│   ├── debug-client.js     # Cliente de debug remoto
│   ├── config.js           # Configuración global (URLs)
│   └── style.css
├── vite.config.js          # Config Vite + HTTPS
├── package.json
├── ARCHITECTURE.md         # Documentación técnica detallada
└── GEMINI.md              # Notas del proyecto
```

---

## 🔧 Troubleshooting

### El VR no funciona
1. Verifica que estés usando **HTTPS** (los certificados se generan automáticamente)
2. Asegúrate de que tu Quest y PC están en la **misma red WiFi**
3. Acepta los certificados autofirmados en el navegador del Quest

### El multijugador no sincroniza
1. Verifica que el servidor backend esté corriendo (`node server/index.js`)
2. Revisa que la IP en `config.js` o `.env` sea correcta
3. Abre el panel de admin para ver logs en tiempo real

### Error de certificados SSL
Los certificados se generan automáticamente en `~/.vite-plugin-mkcert/`. Si hay problemas:
```bash
rm -rf ~/.vite-plugin-mkcert
npm run dev  # Regenerará los certificados
```

---

## 📖 Documentación Adicional

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitectura técnica, patrones de diseño, diagramas
- **[GEMINI.md](./GEMINI.md)** - Notas del desarrollo, issues conocidos

---

## 🤝 Contribuciones

Este es un proyecto experimental. Si encuentras bugs o tienes sugerencias:
1. Abre un issue
2. Haz un fork
3. Crea un PR

---

## 📝 Licencia

MIT License - siéntete libre de usar este código para aprender, experimentar o construir algo increíble.

---

## 👨‍💻 Desarrollado con

- **Meta Quest** como plataforma objetivo
- **Gemini AI** como asistente de desarrollo
- ❤️ y mucho café

---

**Versión:** 0.0.1  
**Estado:** Prototipo funcional  
**Última actualización:** 2025-11-20
