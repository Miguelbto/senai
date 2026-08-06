# Camera — expo-camera

O `expo-camera` fornece acesso direto as cameras do dispositivo: traseira, frontal e, em alguns casos, cameras extras (ultra-wide, teleobjetiva). Alem da captura de fotos e videos, tambem suporta leitura de QR codes e codigos de barras.

---

## 1. Instalacao

```bash
npx expo install expo-camera
```

Adicione o plugin ao `app.json` com as descricoes de permissao:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Este app precisa de acesso a camera.",
          "microphonePermission": "Este app precisa do microfone para gravar videos."
        }
      ]
    ]
  }
}
```

---

## 2. Solicitar permissao

Use o hook `useCameraPermissions` para gerenciar o estado da permissao de forma reativa.

```js
import { CameraView, useCameraPermissions } from 'expo-camera';

const [permission, requestPermission] = useCameraPermissions();

if (!permission) {
  return <Text>Verificando permissoes...</Text>;
}

if (!permission.granted) {
  return (
    <>
      <Text>Permissao de camera necessaria.</Text>
      <Button title="Solicitar" onPress={requestPermission} />
    </>
  );
}
```

---

## 3. Exibir o preview da camera

O componente `CameraView` renderiza o preview em tempo real. Ele precisa de dimensoes definidas (use `flex: 1` ou altura fixa).

```js
import { useRef, useState } from 'react';
import { CameraView } from 'expo-camera';

const cameraRef = useRef(null);
const [pronta, setPronta] = useState(false);

<CameraView
  ref={cameraRef}
  style={{ flex: 1 }}
  facing="back"
  onCameraReady={() => setPronta(true)}
/>
```

> Aguarde o evento `onCameraReady` antes de chamar `takePictureAsync`, caso contrario a chamada pode falhar.

---

## 4. Tirar foto

```js
async function tirarFoto() {
  if (!pronta) return;

  const foto = await cameraRef.current.takePictureAsync({
    quality: 0.7,       // 0 a 1 (compressao JPEG)
    base64: false,      // true para receber o dado em base64
  });

  console.log(foto.uri);    // caminho do arquivo no cache
  console.log(foto.width);  // largura em pixels
  console.log(foto.height); // altura em pixels
}
```

---

## 5. Trocar entre cameras

```js
const [facing, setFacing] = useState('back'); // 'back' | 'front'

function trocarCamera() {
  setFacing(prev => prev === 'back' ? 'front' : 'back');
}

<CameraView facing={facing} ... />
```

---

## 6. Exibir a foto capturada

```js
import { Image } from 'react-native';

{foto && (
  <Image
    source={{ uri: foto.uri }}
    style={{ width: '100%', height: 300 }}
    resizeMode="contain"
  />
)}
```

---

## 7. Exemplo completo

```js
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Image, View } from 'react-native';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [foto, setFoto] = useState(null);
  const [pronta, setPronta] = useState(false);
  const cameraRef = useRef(null);

  if (!permission?.granted) {
    return <Button title="Solicitar permissao" onPress={requestPermission} />;
  }

  async function tirarFoto() {
    if (!pronta) return;
    const result = await cameraRef.current.takePictureAsync({ quality: 0.7 });
    setFoto(result);
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing={facing}
        onCameraReady={() => setPronta(true)}
      />
      <Button title="Trocar camera" onPress={() => setFacing(f => f === 'back' ? 'front' : 'back')} />
      <Button title="Tirar foto" onPress={tirarFoto} />
      {foto && <Image source={{ uri: foto.uri }} style={{ height: 200 }} resizeMode="contain" />}
    </View>
  );
}
```

---

## Props do CameraView

| Prop | Tipo | Descricao |
|---|---|---|
| `facing` | `'back'` \| `'front'` | Qual camera usar |
| `flash` | `'off'` \| `'on'` \| `'auto'` | Controle do flash |
| `zoom` | `0` a `1` | Nivel de zoom |
| `mode` | `'picture'` \| `'video'` | Modo de captura |
| `onCameraReady` | `() => void` | Chamado quando a camera esta pronta |

---

## Pontos de atencao

- A foto e salva no cache temporario do app. Para persistir use `expo-file-system`.
- O componente `CameraView` nao funciona no simulador iOS — e necessario dispositivo fisico ou o simulador com camera simulada (disponivel em alguns modelos).
- No Android o emulador suporta camera simulada se configurado com `Extended Controls > Camera`.
- Sempre espere `onCameraReady` antes de chamar `takePictureAsync`.
