import { io } from 'socket.io-client';

class DebugClient {
    constructor(serverUrl) {
        this.socket = io(serverUrl);
        this.originalConsoleLog = console.log;
        this.originalConsoleError = console.error;
        this.originalConsoleWarn = console.warn;

        this.init();
    }

    init() {
        this.socket.on('connect', () => {
            this.originalConsoleLog('DebugClient: Connected to server');
            this.socket.emit('identify', 'game');
        });

        this.socket.on('command', (command) => {
            this.originalConsoleLog('DebugClient: Executing command', command);
            try {
                // PRECAUCIÓN: eval es peligroso en producción, pero útil para prototipado/debug rápido
                // En un juego real, usaríamos un parser de comandos más seguro.
                const result = eval(command);
                this.log('command_result', { command, result });
            } catch (e) {
                this.error('command_error', { command, error: e.message });
            }
        });

        // Interceptar logs
        console.log = (...args) => {
            this.originalConsoleLog(...args);
            this.log('info', args);
        };

        console.error = (...args) => {
            this.originalConsoleError(...args);
            this.log('error', args);
        };

        console.warn = (...args) => {
            this.originalConsoleWarn(...args);
            this.log('warn', args);
        };
    }

    log(level, message) {
        this.socket.emit('log', { level, message });
    }

    error(level, message) {
        this.socket.emit('game_log', { level: 'error', message });
    }
}

// Exportar instancia única o clase
export default DebugClient;
