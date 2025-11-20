import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
    server: {
        https: true,
        host: true // Escuchar en todas las IPs
    },
    plugins: [mkcert()]
});
