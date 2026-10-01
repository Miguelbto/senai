import { useEffect, useState } from 'react';
import { api, moeda } from '../api.js';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [erro, setErro] = useState('');

  const carregar = () => api('/produtos').then(setProdutos);

  useEffect(() => {
    carregar();
  }, []);

  async function cadastrar(e) {
    e.preventDefault();
    try {
      await api('/produtos', 'POST', { nome, preco: Number(preco) });
      setNome('');
      setPreco('');
      setErro('');
      carregar();
    } catch (err) {
      setErro(err.message);
    }
  }

  async function remover(id) {
    await api(`/produtos/${id}`, 'DELETE');
    carregar();
  }

  return (
    <section>
      <h2>Produtos</h2>
      <form onSubmit={cadastrar}>
        <input aria-label="Nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input aria-label="Preco" placeholder="Preco" type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} />
        <button type="submit">Cadastrar</button>
      </form>
      {erro && <p className="erro">{erro}</p>}

      <table>
        <thead>
          <tr><th>Nome</th><th>Preco</th><th></th></tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{moeda(p.preco)}</td>
              <td><button onClick={() => remover(p.id)}>Remover</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
