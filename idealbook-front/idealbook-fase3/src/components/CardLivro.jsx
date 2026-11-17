import { useState } from 'react';
import Capa from './Capa.jsx';
import { pegarSalvos, alternarSalvo } from '../storage.js';

function CardLivro({ livro, usuario, irPara, aoMudarSalvo }) {
  const [salvo, setSalvo] = useState(usuario ? pegarSalvos(usuario.email).includes(livro.id) : false);

  function clicouSalvar() {
    if (!usuario) {
      // precisa estar logado pra salvar
      irPara('login');
      return;
    }
    const novaLista = alternarSalvo(usuario.email, livro.id);
    setSalvo(novaLista.includes(livro.id));
    if (aoMudarSalvo) {
      aoMudarSalvo();
    }
  }

  return (
    <article className="card">
      <div className="capa-card">
        <Capa livro={livro} />
        {livro.autorEmail && <span className="selo-comunidade">✨ Comunidade</span>}
      </div>
      <h3>{livro.titulo}</h3>
      <p>{livro.autor}</p>
      <small>{livro.genero}</small>
      <div className="card-botoes">
        <button className="botao" onClick={() => irPara('leitor', livro.id)}>
          Ler
        </button>
        <button className="botao-claro" onClick={clicouSalvar}>
          {salvo ? '★ Salvo' : '☆ Salvar'}
        </button>
      </div>
    </article>
  );
}

export default CardLivro;
