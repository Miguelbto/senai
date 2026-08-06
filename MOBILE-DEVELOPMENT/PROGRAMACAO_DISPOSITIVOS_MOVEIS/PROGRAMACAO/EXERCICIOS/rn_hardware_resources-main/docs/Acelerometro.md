# Acelerometro — expo-sensors

O acelerometro e um chip MEMS (Micro-Electro-Mechanical System) presente em todos os smartphones modernos. Ele mede a aceleracao fisica aplicada ao dispositivo nos tres eixos espaciais (X, Y, Z) em unidades de g-force, onde 1 g = 9,81 m/s². Em repouso sobre uma superficie plana, o eixo Z marca aproximadamente 1 g devido a gravidade terrestre.

---

## 1. Instalacao

```bash
npx expo install expo-sensors
```

Nenhuma configuracao extra no `app.json` e necessaria.

---

## 2. Importacao

```js
import { Accelerometer } from 'expo-sensors';
```

O pacote `expo-sensors` tambem exporta `Gyroscope`, `Magnetometer`, `Barometer` e `Pedometer` — todos seguem a mesma API de subscription.

---

## 3. Verificar disponibilidade

Alguns dispositivos ou emuladores podem nao ter o sensor disponivel.

```js
const disponivel = await Accelerometer.isAvailableAsync();

if (!disponivel) {
  // informe ao usuario que o sensor nao esta disponivel
}
```

---

## 4. Definir o intervalo de atualizacao

Configure antes de adicionar o listener. O valor minimo no Android 12+ e 200 ms.

```js
Accelerometer.setUpdateInterval(200); // em milissegundos
```

---

## 5. Assinar as leituras

```js
const subscription = Accelerometer.addListener(({ x, y, z }) => {
  // x, y, z em g-force
  console.log(`X: ${x.toFixed(3)}  Y: ${y.toFixed(3)}  Z: ${z.toFixed(3)}`);
});
```

---

## 6. Cancelar as leituras

Sempre cancele a subscription ao sair da tela para evitar consumo desnecessario de CPU e bateria.

```js
subscription.remove();
```

---

## 7. Exemplo completo com hooks

```js
import { Accelerometer } from 'expo-sensors';
import { useEffect, useRef, useState } from 'react';

export default function AccelerometerScreen() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [ativo, setAtivo] = useState(false);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    return () => subscriptionRef.current?.remove(); // cleanup ao desmontar
  }, []);

  function iniciar() {
    Accelerometer.setUpdateInterval(200);
    subscriptionRef.current = Accelerometer.addListener(setData);
    setAtivo(true);
  }

  function parar() {
    subscriptionRef.current?.remove();
    subscriptionRef.current = null;
    setAtivo(false);
  }
}
```

---

## Interpretacao dos eixos

```
        Y (para cima)
        |
        |
        +---------- X (para a direita)
       /
      /
     Z (saindo da tela em direcao ao usuario)
```

| Situacao | X | Y | Z |
|---|---|---|---|
| Celular plano sobre a mesa | ~0 | ~0 | ~1 |
| Celular em pe (retrato) | ~0 | ~1 | ~0 |
| Celular virado para a esquerda | ~-1 | ~0 | ~0 |
| Celular sacudido | valores altos e variaveis | | |

---

## Calcular a magnitude

A magnitude representa a intensidade total da aceleracao independente da direcao:

```js
const magnitude = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
// em repouso deve ser proxima de 1
```

---

## Pontos de atencao

- O emulador Android pode simular o acelerometro pelo Extended Controls (tecla `...` no painel lateral).
- No simulador iOS o acelerometro nao e simulado — teste em dispositivo fisico.
- Intervalos muito baixos (abaixo de 100 ms) consomem bastante CPU; para a maioria dos casos 200 ms e suficiente.
