// Configuración global
// Usar variable de entorno si está disponible, sino usar IP local hardcodeada
// Para cambiarla: Crear archivo .env con VITE_SERVER_URL=https://192.168.1.X:3000
export const DEBUG_SERVER_URL = import.meta.env.VITE_SERVER_URL || 'https://192.168.1.112:3000';
