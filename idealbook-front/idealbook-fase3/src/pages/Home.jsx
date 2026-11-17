import { useState } from 'react';
import livros from '../data/livros.js';
import CardLivro from '../components/CardLivro.jsx';
import Capa from '../components/Capa.jsx';
import { pegarLivrosPublicados } from '../storage.js';

// capas sorteadas que enfeitam o topo da home
const capasHero = [
  { id: 'h1', titulo: 'Sua história', autor: 'Ideal Book', capaSeed: 4821 },
  { id: 'h2', titulo: 'Novos mundos', autor: 'Ideal Book', capaSeed: 777 },
  { id: 'h3', titulo: 'Capítulo 1', autor: 'Ideal Book', capaSeed: 31415 },
];

function Home({ irPara, usuario }) {
  const [busca, setBusca] = useState('');
  const escritor = usuario && usuario.papel === 'escritor';
  const primeiroNome = usuario ? usuario.nome.split(' ')[0] : '';

  // pega só os 8 primeiros livros pra mostrar na home
  const destaques = livros.slice(0, 8);

  // livros que os próprios usuários escreveram e publicaram
  const daComunidade = pegarLivrosPublicados().filter((l) => l.autorEmail);

  function buscar(evento) {
    evento.preventDefault();
    irPara('biblioteca', null, busca);
  }

  return (
    <main>
      <section className="hero">
        <div className="hero-texto">
          <p className="tag">OI, {primeiroNome.toUpperCase()}! 👋</p>
          <h1>
            Encontre o livro <span>ideal</span> para você.
          </h1>
          <p>
            O Ideal Book ajuda você a descobrir histórias de acordo com seus gostos, interesses e
            momento.{escritor ? ' E como escritor, você também pode criar e publicar as suas!' : ''}
          </p>
          <form className="busca" onSubmit={buscar}>
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Digite título ou autor..."
              aria-label="Buscar livros"
            />
            <button type="submit">🔎 Buscar</button>
          </form>
        </div>
        <div className="hero-livros" aria-hidden="true">
          {capasHero.map((c, i) => (
            <div key={c.id} className={'hero-livro h' + (i + 1)}>
              <Capa livro={c} />
            </div>
          ))}
        </div>
      </section>

      <section className="conteudo">
        <h2>Alguns livros para começar</h2>
        <div className="cards">
          {destaques.map((l) => (
            <CardLivro key={l.id} livro={l} usuario={usuario} irPara={irPara} />
          ))}
        </div>
        <p className="ver-mais">
          <button className="botao-claro" onClick={() => irPara('biblioteca')}>
            Ver biblioteca completa
          </button>
        </p>
      </section>

      {daComunidade.length > 0 && (
        <section className="conteudo comunidade">
          <h2>✨ Escritos pela nossa comunidade</h2>
          <div className="cards">
            {daComunidade.slice(0, 4).map((l) => (
              <CardLivro key={l.id} livro={l} usuario={usuario} irPara={irPara} />
            ))}
          </div>
        </section>
      )}

      <section className="destaque">
        {escritor ? (
          <>
            <h2>Tem uma história para contar?</h2>
            <p>
              Escreva seus livros capítulo por capítulo e publique quando estiver pronto, para outras
              pessoas lerem. Só você tem acesso aos seus livros em andamento.
            </p>
            <button className="botao-branco" onClick={() => irPara('escrever')}>
              Ir para meus livros
            </button>
          </>
        ) : (
          <>
            <h2>Continue de onde parou</h2>
            <p>
              Seu histórico guarda o capítulo em que você parou em cada livro, e a sua coleção guarda o que você
              quer ler depois.
            </p>
            <button className="botao-branco" onClick={() => irPara('historico')}>
              Ver meu histórico
            </button>
          </>
        )}
      </section>
    </main>
  );
}

export default Home;
