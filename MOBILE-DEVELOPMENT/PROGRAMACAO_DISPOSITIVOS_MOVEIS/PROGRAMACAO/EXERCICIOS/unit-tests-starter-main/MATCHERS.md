# Referencia de Matchers — Jest

---

## Igualdade

### toBe
Compara valores primitivos (numeros, strings, booleanos) por valor exato.

```js
expect(soma(2, 3)).toBe(5);
expect(usuario.nome).toBe('Ana');
```

### toEqual
Compara objetos e arrays pelo conteudo, nao pela referencia.

```js
expect(produto).toEqual({ id: 1, nome: 'Coxinha', preco: 5 });
expect(lista).toEqual([1, 2, 3]);
```

> Use `toBe` para primitivos e `toEqual` para objetos e arrays.

---

## Verdadeiro e falso

### toBeTruthy
Passa para qualquer valor que seja verdadeiro em um `if`.

```js
expect(produto).toBeTruthy();
expect(1).toBeTruthy();
```

### toBeFalsy
Passa para `false`, `null`, `undefined`, `0` e `''`.

```js
expect(null).toBeFalsy();
expect(resultado).toBeFalsy();
```

### toBeDefined
Verifica que o valor nao e `undefined`.

```js
expect(produto.id).toBeDefined();
```

### toBeNull
Verifica que o valor e exatamente `null`.

```js
expect(repository.findById(9999)).toBeNull();
```

### toBeUndefined
Verifica que o valor e `undefined`.

```js
expect(objeto.propriedadeInexistente).toBeUndefined();
```

---

## Numeros

### toBeGreaterThan / toBeGreaterThanOrEqual

```js
expect(lista.length).toBeGreaterThan(0);
expect(preco).toBeGreaterThanOrEqual(0);
```

### toBeLessThan / toBeLessThanOrEqual

```js
expect(percentual).toBeLessThanOrEqual(100);
expect(estoque).toBeLessThan(999);
```

### toBeCloseTo
Para comparar numeros de ponto flutuante, onde arredondamento pode causar falsos negativos.

```js
expect(0.1 + 0.2).toBeCloseTo(0.3);
```

---

## Strings

### toContain
Verifica se a string contem um trecho.

```js
expect(mensagem).toContain('obrigatorio');
```

### toMatch
Verifica se a string corresponde a uma expressao regular.

```js
expect(email).toMatch(/@/);
expect(cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
```

---

## Arrays e objetos

### toContain
Em arrays, verifica se um valor esta presente.

```js
expect(nomes).toContain('Ana');
```

### toHaveLength
Verifica o tamanho de um array ou string.

```js
expect(produtos).toHaveLength(3);
expect('Jest').toHaveLength(4);
```

### toHaveProperty
Verifica se um objeto tem uma propriedade. Opcionalmente verifica o valor.

```js
expect(produto).toHaveProperty('id');
expect(produto).toHaveProperty('nome', 'Coxinha');
```

---

## Erros

### toThrow
Verifica que uma funcao lanca um erro. Deve receber uma funcao anonima no `expect`.

```js
// verifica apenas que um erro foi lancado
expect(() => divide(10, 0)).toThrow();

// verifica a mensagem exata do erro
expect(() => divide(10, 0)).toThrow('Nao e possivel dividir por zero');

// verifica com expressao regular
expect(() => divide(10, 0)).toThrow(/dividir por zero/);
```

---

## Negacao

Qualquer matcher pode ser negado com `.not`:

```js
expect(produto).not.toBeNull();
expect(lista).not.toHaveLength(0);
expect(valor).not.toBe(0);
expect(() => soma(1, 2)).not.toThrow();
```

---

## Verificacoes em mocks (jest.fn)

### toHaveBeenCalled
Verifica que a funcao foi chamada pelo menos uma vez.

```js
expect(res.json).toHaveBeenCalled();
```

### toHaveBeenCalledWith
Verifica que a funcao foi chamada com argumentos especificos.

```js
expect(res.json).toHaveBeenCalledWith({ erro: 'Nao encontrado' });
expect(res.status).toHaveBeenCalledWith(404);
```

### toHaveBeenCalledTimes
Verifica o numero exato de chamadas.

```js
expect(repository.findAll).toHaveBeenCalledTimes(1);
```
