import Capa from '../components/Capa.jsx';
import { pegarHistorico, acharLivro, podeVerLivro } from '../storage.js';

function Historico({ usuario, irPara }) {
  const historico = pegarHistorico(usuario.email);

  // junta cada item do histórico com os dados do livro
  const itens = [];
  historico.forEach((h) => {
    const livro = acharLivro(h.livroId);
    if (livro && podeVerLivro(livro, usuario)) {
      itens.push({ livro: livro, capitulo: h.capitulo, data: h.data });
    }
  });

  return (
    <main className="pagina">
      <section className="topo-pagina">
        <p className="tag">HISTÓRICO DE LEITURA</p>
        <h1>
          O que você já <span>leu</span>
        </h1>
        <p>Aqui ficam os livros que você abriu, com o capítulo onde parou.</p>
      </section>

      {itens.length === 0 && (
        <div className="vazio">
          <p>Você ainda não leu nenhum livro 📖</p>
          <button className="botao" onClick={() => irPara('biblioteca')}>
            Ir para a biblioteca
          </button>
        </div>
      )}

      <div className="lista">
        {itens.map((item) => {
          const total = item.livro.capitulos.length;
          const porcentagem = Math.round(((item.capitulo + 1) / total) * 100);
          return (
            <div className="item-lista box" key={item.livro.id}>
              <div className="capa-mini">
                <Capa livro={item.livro} />
              </div>
              <div className="item-info">
                <h3>{item.livro.titulo}</h3>
                <p className="autor">{item.livro.autor}</p>
                <p className="pequeno-texto">
                  Capítulo {item.capitulo + 1} de {total} — lido em{' '}
                  {new Date(item.data).toLocaleDateString('pt-BR')}
                </p>
                <div className="progresso">
                  <div className="progresso-barra" style={{ width: porcentagem + '%' }}></div>
                </div>
              </div>
              <button className="botao" onClick={() => irPara('leitor', item.livro.id)}>
                {porcentagem === 100 ? 'Reler' : 'Continuar'}
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Historico;
