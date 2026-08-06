# Hardware Resources

App em React Native (Expo) que demonstra o uso de recursos de hardware do dispositivo: GPS, Wi-Fi/Rede, Acelerometro, Audio e Camera.

## Modulos

| Modulo | Tela | Recurso Expo |
| --- | --- | --- |
| GPS | `src/screens/GPSScreen.js` | `expo-location` |
| Wi-Fi / Rede | `src/screens/WiFiScreen.js` | `expo-network` |
| Acelerometro | `src/screens/AccelerometerScreen.js` | `expo-sensors` |
| Audio | `src/screens/AudioScreen.js` | `expo-audio` |
| Camera | `src/screens/CameraScreen.js` | `expo-camera` |

A navegacao entre as telas usa `@react-navigation/native-stack`, configurada em [App.js](App.js).

## Requisitos

- Node.js
- Expo CLI (`npx expo`)
- App Expo Go no celular, ou emulador Android/simulador iOS

## Instalacao

```bash
npm install
```

## Executar

```bash
npm start        # abre o Metro bundler / QR code
npm run android  # roda no emulador/dispositivo Android
npm run ios      # roda no simulador/dispositivo iOS
npm run web      # roda no navegador
npx expo start
```

## Documentacao dos modulos

Detalhes de cada recurso estao em [docs/](docs/):

- [docs/GPS.md](docs/GPS.md)
- [docs/WiFi.md](docs/WiFi.md)
- [docs/Acelerometro.md](docs/Acelerometro.md)
- [docs/Audio.md](docs/Audio.md)
- [docs/Camera.md](docs/Camera.md)

## Permissoes

O app solicita permissoes de localizacao, camera e microfone em tempo de execucao (configuradas em [app.json](app.json) via os plugins `expo-location` e `expo-camera`).
