# Wi-Fi / Rede — expo-network

O `expo-network` consulta a camada de rede do sistema operacional para expor informacoes sobre o tipo de conexao ativa, disponibilidade de internet e endereco IP do dispositivo. Nao requer permissoes especiais na maioria dos casos.

---

## 1. Instalacao

```bash
npx expo install expo-network
```

Nenhuma configuracao extra no `app.json` e necessaria.

---

## 2. Verificar o estado da rede (uma vez)

```js
import * as Network from 'expo-network';

const state = await Network.getNetworkStateAsync();

console.log(state.type);               // 'WIFI' | 'CELLULAR' | 'NONE' | ...
console.log(state.isConnected);        // true | false
console.log(state.isInternetReachable); // true | false | null
```

---

## 3. Usar o hook reativo (recomendado)

O hook `useNetworkState` atualiza o componente automaticamente sempre que o estado da rede muda — sem precisar de listener manual.

```js
import * as Network from 'expo-network';

export default function WiFiScreen() {
  const networkState = Network.useNetworkState();

  return (
    <Text>
      {networkState.isConnected ? 'Conectado' : 'Sem conexao'} via {networkState.type}
    </Text>
  );
}
```

---

## 4. Obter o IP do dispositivo

```js
const ip = await Network.getIpAddressAsync();
console.log(ip); // ex: '192.168.0.105'
```

---

## 5. Verificar modo aviao (Android)

```js
const emModoAviao = await Network.isAirplaneModeEnabledAsync();
// retorna true ou false
// disponivel apenas no Android; no iOS retorna sempre false
```

---

## 6. Escutar mudancas manualmente

Use quando precisar reagir a mudancas de rede fora de um componente React (ex: em servicos, utilitarios).

```js
import { useEffect } from 'react';

useEffect(() => {
  const sub = Network.addNetworkStateListener(({ type, isConnected }) => {
    console.log('Rede mudou:', type, isConnected);
  });

  return () => sub.remove();
}, []);
```

---

## Tipos de rede possiveis

| Valor | Descricao |
|---|---|
| `WIFI` | Conectado via Wi-Fi |
| `CELLULAR` | Conectado via dados moveis |
| `ETHERNET` | Cabo (tablets/TVs) |
| `BLUETOOTH` | Tethering via Bluetooth |
| `VPN` | Conexao via VPN |
| `OTHER` | Outro tipo |
| `NONE` | Sem conexao |
| `UNKNOWN` | Nao foi possivel determinar |

---

## Pontos de atencao

- `isInternetReachable` pode retornar `null` enquanto o estado ainda esta sendo verificado.
- O IP retornado e o IPv4 da interface de rede local, nao o IP publico.
- `expo-network` nao permite listar redes Wi-Fi disponiveis nem conectar a uma rede especifica — isso exige modulos nativos fora do escopo do Expo Go.
