# GPS — expo-location

O GPS do celular combina o chip de satelite com sinais de Wi-Fi e torres de celular para determinar a posicao geografica do dispositivo. O `expo-location` expoe essa funcionalidade via JavaScript, sem precisar escrever codigo nativo.

---

## 1. Instalacao

```bash
npx expo install expo-location
```

---

## 2. Permissoes

Adicione o plugin no `app.json` para que as permissoes sejam declaradas automaticamente no build:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Este app precisa de acesso a localizacao."
        }
      ]
    ]
  }
}
```

> No iOS a descricao aparece no dialogo do sistema. No Android as permissoes `ACCESS_FINE_LOCATION` e `ACCESS_COARSE_LOCATION` sao adicionadas automaticamente.

---

## 3. Solicitar permissao

Sempre solicite permissao antes de qualquer chamada de localizacao.

```js
import * as Location from 'expo-location';

const { status } = await Location.requestForegroundPermissionsAsync();

if (status !== 'granted') {
  // usuario negou — informe na UI, nao trave o app
  return;
}
```

---

## 4. Obter a localizacao uma unica vez

```js
const result = await Location.getCurrentPositionAsync({
  accuracy: Location.Accuracy.High,
});

console.log(result.coords.latitude);
console.log(result.coords.longitude);
console.log(result.coords.altitude);   // pode ser null
console.log(result.coords.accuracy);   // precisao em metros
console.log(result.coords.speed);      // m/s, pode ser null
```

---

## 5. Rastrear a posicao em tempo real

Use `watchPositionAsync` para receber atualizacoes continuamente. Guarde a subscription e remova-a quando a tela for desmontada.

```js
import { useEffect, useRef } from 'react';

const watchRef = useRef(null);

useEffect(() => {
  return () => watchRef.current?.remove(); // limpeza ao sair da tela
}, []);

async function startWatching() {
  const sub = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 1000,      // minimo de 1s entre atualizacoes
      distanceInterval: 1,     // ou minimo de 1 metro de deslocamento
    },
    (result) => {
      // chamado cada vez que a posicao muda
      console.log(result.coords);
    }
  );
  watchRef.current = sub;
}

function stopWatching() {
  watchRef.current?.remove();
  watchRef.current = null;
}
```

---

## 6. Exibir no mapa

Instale `react-native-maps`:

```bash
npx expo install react-native-maps
```

```js
import MapView, { Marker } from 'react-native-maps';

<MapView
  style={{ width: '100%', height: 300 }}
  region={{
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  }}
>
  <Marker
    coordinate={{
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }}
    title="Voce esta aqui"
  />
</MapView>
```

> O mapa precisa de altura fixa quando estiver dentro de um `ScrollView`.

---

## Niveis de precisao disponiveis

| Constante | Descricao |
|---|---|
| `Accuracy.Lowest` | ~3 km |
| `Accuracy.Low` | ~1 km |
| `Accuracy.Balanced` | ~100 m |
| `Accuracy.High` | ~10 m |
| `Accuracy.Highest` | ~1 m |
| `Accuracy.BestForNavigation` | maximo do hardware |

---

## Pontos de atencao

- Sempre remova a subscription no cleanup do `useEffect`, caso contrario o GPS continua ativo em segundo plano consumindo bateria.
- `altitude` e `speed` podem retornar `null` dependendo do dispositivo e do nivel de precisao escolhido.
- No simulador iOS a localizacao e simulada; teste em dispositivo fisico para resultados reais.
