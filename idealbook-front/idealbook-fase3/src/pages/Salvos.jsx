import { useState } from 'react';
import CardLivro from '../components/CardLivro.jsx';
import { pegarSalvos, acharLivro, podeVerLivro } from '../storage.js';

function Salvos({ usuario, irPara }) {
  const [ids, setIds] = useState(pegarSalvos(usuario.email));

  // quando tira um livro dos salvos, atualiza a lista na tela
  function atualizar() {
    setIds(pegarSalvos(usuario.email));
  }

  const livros = [];
  ids.forEach((id) => {
    const livro = acharLivro(id);
    if (livro && podeVerLivro(livro, usuario)) {
      livros.push(livro);
    }
  });

  return (
    <main className="pagina larga">
      <section className="topo-pagina">
        <p className="tag">COLEÇÃO</p>
        <h1>
          Livros <span>salvos</span>
        </h1>
        <p>Os livros que você guardou para ler depois.</p>
      </section>

      {livros.length === 0 && (
        <div className="vazio">
          <p>Você ainda não salvou nenhum livro ⭐</p>
          <button className="botao" onClick={() => irPara('biblioteca')}>
            Ver biblioteca
          </button>
        </div>
      )}

      <div className="cards">
        {livros.map((l) => (
          <CardLivro key={l.id + '-' + ids.length} livro={l} usuario={usuario} irPara={irPara} aoMudarSalvo={atualizar} />
        ))}
      </div>
    </main>
  );
}

export default Salvos;
