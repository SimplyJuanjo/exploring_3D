# Project Notes

## Hardware
- **Target Device**: Meta Quest Pro
- **Controllers**: Quest Pro Touch Controllers

## Known Issues
- **Joystick Locomotion**: Currently not working on Quest Pro. Debugging in progress.
- **HTTPS**: Required for WebXR. Using `vite-plugin-mkcert`.

## Architecture
- **Frontend**: Vite + Three.js
- **Backend**: Node.js + Socket.io (for remote debugging)
- **Network**: Localhost for dev, Local IP for VR testing.
