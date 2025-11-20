# Project Notes

## Hardware
- **Target Device**: Meta Quest Pro
- **Controllers**: Quest Pro Touch Controllers

## Known Issues
- **HTTPS**: Required for WebXR. Using `vite-plugin-mkcert`.

## Architecture
- **Frontend**: Vite + Three.js
- **Backend**: Node.js + Socket.io (Debug + Multiplayer)
- **Network**: Localhost for dev, Local IP for VR testing.
- **Multiplayer**: Basic avatar sync implemented (Ghosts).
- **Object Sync**: Interactable objects (cube) now sync in real-time between players.
