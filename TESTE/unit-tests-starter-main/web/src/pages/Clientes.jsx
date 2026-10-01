import { useEffect, useState } from 'react';
import { api } from '../api.js';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState('');

  const carregar = () => api('/clientes').then(setClientes);

  useEffect(() => {
    carregar();
  }, []);

  function limpar() {
    setNome('');
    setEmail('');
    setEditandoId(null);
    setErro('');
  }

  async function salvar(e) {
    e.preventDefault();
    try {
      if (editandoId) {
        await api(`/clientes/${editandoId}`, 'PUT', { nome, email });
      } else {
        await api('/clientes', 'POST', { nome, email });
      }
      limpar();
      carregar();
    } catch (err) {
      setErro(err.message);
    }
  }

  function editar(cliente) {
    setNome(cliente.nome);
    setEmail(cliente.email);
    setEditandoId(cliente.id);
  }

  async function remover(id) {
    await api(`/clientes/${id}`, 'DELETE');
    carregar();
  }

  return (
    <section>
      <h2>Clientes</h2>
      <form onSubmit={salvar}>
        <input aria-label="Nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input aria-label="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">{editandoId ? 'Salvar' : 'Cadastrar'}</button>
        {editandoId && <button type="button" onClick={limpar}>Cancelar</button>}
      </form>
      {erro && <p className="erro">{erro}</p>}

      <table>
        <thead>
          <tr><th>Nome</th><th>Email</th><th></th></tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}>
              <td>{c.nome}</td>
              <td>{c.email}</td>
              <td>
                <button onClick={() => editar(c)}>Editar</button>{' '}
                <button onClick={() => remover(c.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
