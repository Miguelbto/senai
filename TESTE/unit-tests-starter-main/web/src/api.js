// Todas as chamadas passam pelo proxy do Vite: /api/... -> http://localhost:3000/...
export async function api(caminho, metodo = 'GET', corpo) {
  const resposta = await fetch('/api' + caminho, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: corpo ? JSON.stringify(corpo) : undefined,
  });

  // 204 = sucesso sem corpo (ex.: exclusao)
  if (resposta.status === 204) return null;

  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.erro);
  return dados;
}

export const moeda = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
