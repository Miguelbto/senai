import { useState } from 'react';
import Produtos from './pages/Produtos.jsx';
import Clientes from './pages/Clientes.jsx';
import Pedidos from './pages/Pedidos.jsx';

const ABAS = { Produtos, Clientes, Pedidos };

export default function App() {
  const [aba, setAba] = useState('Produtos');
  const Pagina = ABAS[aba];

  return (
    <main>
      <h1>Lanchonete</h1>
      <nav>
        {Object.keys(ABAS).map((nome) => (
          <button key={nome} disabled={nome === aba} onClick={() => setAba(nome)}>
            {nome}
          </button>
        ))}
      </nav>
      <Pagina />
    </main>
  );
}
