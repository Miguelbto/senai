# Audio — expo-audio

O `expo-audio` e a biblioteca oficial do Expo para gravacao e reproducao de audio. Ela substitui a parte de audio do `expo-av` e expoe uma API baseada em hooks do React, tornando o codigo mais simples e direto.

---

## 1. Instalacao

```bash
npx expo install expo-audio
```

O plugin e adicionado automaticamente ao `app.json` durante a instalacao. Verifique se ele esta presente:

```json
{
  "expo": {
    "plugins": ["expo-audio"]
  }
}
```

---

## 2. Permissao de microfone

A permissao de microfone e necessaria apenas para gravacao, nao para reproducao.

```js
import * as AudioModule from 'expo-audio';

const { status } = await AudioModule.requestRecordingPermissionsAsync();

if (status !== 'granted') {
  // usuario negou — informe na UI
  return;
}
```

---

## 3. Gravar audio

Use o hook `useAudioRecorder` com um preset de qualidade. O `RecordingPresets.HIGH_QUALITY` grava em formato AAC com 128 kbps.

```js
import { useAudioRecorder, useAudioRecorderState, RecordingPresets } from 'expo-audio';

const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
const state = useAudioRecorderState(recorder);
// state.isRecording     — true enquanto grava
// state.durationMillis  — duracao atual em ms

// Iniciar gravacao
await recorder.prepareToRecordAsync();
recorder.record();

// Parar gravacao
await recorder.stop();
const uri = recorder.uri; // caminho do arquivo gravado no cache do app
```

---

## 4. Reproduzir audio

Use o hook `useAudioPlayer` passando a URI do arquivo gravado (ou qualquer arquivo de audio local/remoto).

```js
import { useAudioPlayer } from 'expo-audio';

const player = useAudioPlayer(uri);

player.play();       // reproduz
player.pause();      // pausa
player.seekTo(0);    // volta ao inicio (em segundos)
```

> Quando a URI vem de uma gravacao dinamica, crie um componente separado que so e montado apos a gravacao ter terminado, para que o hook receba a URI correta desde o inicio.

```js
function PlaybackControls({ uri }) {
  const player = useAudioPlayer(uri);

  return (
    <>
      <Button title="Reproduzir" onPress={() => player.play()} />
      <Button title="Pausar" onPress={() => player.pause()} />
    </>
  );
}

// Na tela principal, renderize condicionalmente:
{uri && <PlaybackControls uri={uri} />}
```

---

## 5. Reproduzir um arquivo local (bundled)

```js
const player = useAudioPlayer(require('./assets/som.mp3'));
player.play();
```

---

## 6. Fluxo completo: gravar e reproduzir

```js
import { useAudioRecorder, useAudioPlayer, useAudioRecorderState, RecordingPresets } from 'expo-audio';
import * as AudioModule from 'expo-audio';
import { useState } from 'react';

export default function AudioScreen() {
  const [uri, setUri] = useState(null);
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const state = useAudioRecorderState(recorder);

  async function solicitar() {
    await AudioModule.requestRecordingPermissionsAsync();
  }

  async function iniciarGravacao() {
    setUri(null);
    await recorder.prepareToRecordAsync();
    recorder.record();
  }

  async function pararGravacao() {
    await recorder.stop();
    setUri(recorder.uri);
  }

  return (
    <>
      <Button title="Permissao" onPress={solicitar} />
      {state.isRecording
        ? <Button title="Parar" onPress={pararGravacao} />
        : <Button title="Gravar" onPress={iniciarGravacao} />
      }
      {uri && <PlaybackControls uri={uri} />}
    </>
  );
}
```

---

## Presets de gravacao disponiveis

| Preset | Formato | Qualidade |
|---|---|---|
| `RecordingPresets.HIGH_QUALITY` | AAC / m4a | 128 kbps |
| `RecordingPresets.LOW_QUALITY` | AAC / m4a | 32 kbps |

---

## Pontos de atencao

- `recorder.uri` so tem valor apos `recorder.stop()` ter sido chamado.
- O arquivo e salvo no cache temporario do app — nao persiste entre reinstalacoes.
- Para salvar permanentemente use `expo-file-system` para mover o arquivo para um diretorio persistente.
- No simulador iOS a gravacao de audio funciona normalmente.
