import { useState } from 'react';
import CardLivro from '../components/CardLivro.jsx';
import { pegarLivrosPublicados } from '../storage.js';

function Biblioteca({ irPara, usuario, buscaInicial }) {
  const [busca, setBusca] = useState(buscaInicial || '');
  const [genero, setGenero] = useState('Todos');

  const todos = pegarLivrosPublicados();

  // lista de gêneros pro filtro (sem repetir)
  const generos = ['Todos'];
  todos.forEach((l) => {
    if (!generos.includes(l.genero)) {
      generos.push(l.genero);
    }
  });

  // filtra por título/autor e por gênero
  const encontrados = todos.filter((l) => {
    const texto = (l.titulo + ' ' + l.autor).toLowerCase();
    const bateBusca = texto.includes(busca.toLowerCase().trim());
    const bateGenero = genero === 'Todos' || l.genero === genero;
    return bateBusca && bateGenero;
  });

  return (
    <main className="pagina larga">
      <section className="topo-pagina">
        <p className="tag">BIBLIOTECA</p>
        <h1>
          Todos os <span>livros</span>
        </h1>
        <p>Escolha um livro para ler ou pesquise pelo título ou pelo autor.</p>
      </section>

      <div className="filtros">
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="🔎 Pesquisar por título ou autor..."
          aria-label="Pesquisar livros"
        />
        <select value={genero} onChange={(e) => setGenero(e.target.value)} aria-label="Filtrar por gênero">
          {generos.map((g) => (
            <option key={g} value={g}>
              {g === 'Todos' ? 'Todos os gêneros' : g}
            </option>
          ))}
        </select>
      </div>

      <p className="contagem">
        {encontrados.length} {encontrados.length === 1 ? 'livro encontrado' : 'livros encontrados'}
      </p>

      <div className="cards">
        {encontrados.map((l) => (
          <CardLivro key={l.id} livro={l} usuario={usuario} irPara={irPara} />
        ))}
      </div>

      {encontrados.length === 0 && (
        <div className="vazio">
          <p>Nenhum livro encontrado 😕</p>
          <button
            className="botao-claro"
            onClick={() => {
              setBusca('');
              setGenero('Todos');
            }}
          >
            Limpar filtros
          </button>
        </div>
      )}
    </main>
  );
}

export default Biblioteca;
