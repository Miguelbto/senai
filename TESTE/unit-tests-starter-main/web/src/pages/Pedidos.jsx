import { useEffect, useState } from 'react';
import { api, moeda } from '../api.js';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [cliente, setCliente] = useState('');
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [itens, setItens] = useState([]);
  const [erro, setErro] = useState('');

  const carregar = () => api('/pedidos').then(setPedidos);

  useEffect(() => {
    carregar();
    api('/clientes').then(setClientes);
    api('/produtos').then(setProdutos);
  }, []);

  function adicionarItem() {
    const produto = produtos.find((p) => p.id === Number(produtoId));
    if (!produto) return;
    setItens([
      ...itens,
      { nome: produto.nome, precoUnitario: produto.preco, quantidade: Number(quantidade) },
    ]);
    setQuantidade(1);
  }

  async function criar(e) {
    e.preventDefault();
    try {
      await api('/pedidos', 'POST', { cliente, itens });
      setCliente('');
      setItens([]);
      setErro('');
      carregar();
    } catch (err) {
      setErro(err.message);
    }
  }

  async function mudarStatus(id, status) {
    try {
      await api(`/pedidos/${id}/status`, 'PATCH', { status });
      setErro('');
      carregar();
    } catch (err) {
      setErro(err.message);
    }
  }

  async function remover(id) {
    await api(`/pedidos/${id}`, 'DELETE');
    carregar();
  }

  return (
    <section>
      <h2>Pedidos</h2>
      <form onSubmit={criar}>
        <select aria-label="Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)}>
          <option value="">Selecione o cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.nome}>{c.nome}</option>
          ))}
        </select>
        <select aria-label="Produto" value={produtoId} onChange={(e) => setProdutoId(e.target.value)}>
          <option value="">Selecione o produto</option>
          {produtos.map((p) => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
        <input aria-label="Quantidade" type="number" min="1" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
        <button type="button" onClick={adicionarItem}>Adicionar item</button>
        <button type="submit">Criar pedido</button>
      </form>

      {itens.length > 0 && (
        <ul>
          {itens.map((item, i) => (
            <li key={i}>{item.quantidade}x {item.nome}</li>
          ))}
        </ul>
      )}
      {erro && <p className="erro">{erro}</p>}

      <table>
        <thead>
          <tr><th>#</th><th>Cliente</th><th>Itens</th><th>Total</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {pedidos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.cliente}</td>
              <td>{p.itens.map((i) => `${i.quantidade}x ${i.nome}`).join(', ')}</td>
              <td>{moeda(p.total)}</td>
              <td>
                <select aria-label={`Status do pedido ${p.id}`} value={p.status} onChange={(e) => mudarStatus(p.id, e.target.value)}>
                  <option value="pendente">pendente</option>
                  <option value="pago">pago</option>
                  <option value="cancelado">cancelado</option>
                </select>
              </td>
              <td><button onClick={() => remover(p.id)}>Remover</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
