import { useState, useEffect } from 'react';
import Capa from '../components/Capa.jsx';
import {
  acharLivro,
  pegarHistorico,
  registrarLeitura,
  pegarSalvos,
  alternarSalvo,
} from '../storage.js';


function Leitor({ livroId, usuario, irPara }) {
  const [livro, setLivro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [cap, setCap] = useState(0);
  const [modo, setModo] = useState('paginas'); 
  const [tamanho, setTamanho] = useState(18);
  const [terminou, setTerminou] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [tentativaCarga, setTentativaCarga] = useState(0);

 
  useEffect(() => {
    setCarregando(true);
    setErro(false);
    setTerminou(false);
    setLivro(null);

    const timer = setTimeout(() => {
      const achado = acharLivro(livroId);

    
      let podeLer = true;
      if (achado && achado.autorEmail && !achado.publicado) {
        podeLer = usuario && usuario.email === achado.autorEmail;
      }

      if (!achado || !podeLer || achado.capitulos.length === 0) {
        setErro(true);
      } else {
        setLivro(achado);
        let inicio = 0;
        if (usuario) {
      
          const anterior = pegarHistorico(usuario.email).find((h) => h.livroId === livroId);
          if (anterior && anterior.capitulo < achado.capitulos.length) {
            inicio = anterior.capitulo;
          }
          setSalvo(pegarSalvos(usuario.email).includes(livroId));
        }
        setCap(inicio);
      }
      setCarregando(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [livroId, tentativaCarga]);

 
  useEffect(() => {
    if (livro && usuario) {
      registrarLeitura(usuario.email, livro.id, cap);
    }
  }, [livro, cap]);

  function irParaCapitulo(numero) {
    setCap(numero);
    setTerminou(false);
    window.scrollTo(0, 0);
  }

  function finalizar() {
    if (usuario) {
      registrarLeitura(usuario.email, livro.id, livro.capitulos.length - 1);
    }
    setTerminou(true);
    window.scrollTo(0, 0);
  }

  function clicouSalvar() {
    if (!usuario) {
      irPara('login');
      return;
    }
    const lista = alternarSalvo(usuario.email, livro.id);
    setSalvo(lista.includes(livro.id));
  }

  if (carregando) {
    return (
      <main className="pagina">
        <div className="box centro">
          <p className="carregando">📖 Carregando livro...</p>
        </div>
      </main>
    );
  }

  if (erro) {
    return (
      <main className="pagina">
        <div className="box centro">
          <h2>Não foi possível carregar o livro 😕</h2>
          <p>Ele pode não existir mais ou ainda não foi publicado.</p>
          <div className="linha-botoes">
            <button className="botao" onClick={() => setTentativaCarga(tentativaCarga + 1)}>
              🔄 Tentar novamente
            </button>
            <button className="botao-claro" onClick={() => irPara('biblioteca')}>
              Voltar para a biblioteca
            </button>
          </div>
        </div>
      </main>
    );
  }

  const total = livro.capitulos.length;
  const capituloAtual = livro.capitulos[cap];
  const porcentagem = Math.round(((cap + 1) / total) * 100);

  // quebra o texto em parágrafos
  function paragrafos(texto) {
    return texto.split('\n').filter((p) => p.trim() !== '');
  }

  if (terminou) {
    return (
      <main className="pagina">
        <div className="box centro">
          <div className="capa-pequena">
            <Capa livro={livro} />
          </div>
          <h2>🎉 Você terminou a leitura!</h2>
          <p>
            Você leu todos os capítulos de <b>{livro.titulo}</b>.
            {!usuario && ' Entre na sua conta para guardar o que você já leu no histórico.'}
          </p>
          <div className="linha-botoes">
            <button className="botao" onClick={() => irParaCapitulo(0)}>
              Ler de novo
            </button>
            <button className="botao-claro" onClick={() => irPara('biblioteca')}>
              Voltar para a biblioteca
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pagina leitor">
      <button className="voltar" onClick={() => irPara('biblioteca')}>
        ← Voltar para a biblioteca
      </button>

      <section className="leitor-topo box">
        <div className="capa-pequena">
          <Capa livro={livro} tamanho="grande" />
        </div>
        <div>
          <h1>{livro.titulo}</h1>
          <p className="autor">por {livro.autor}</p>
          <p>{livro.sinopse}</p>
          <div className="linha-botoes">
            <button className="botao-claro" onClick={clicouSalvar}>
              {salvo ? '★ Salvo' : '☆ Salvar para ler depois'}
            </button>
          </div>
        </div>
      </section>

      <section className="ferramentas">
        <div>
          <button className={modo === 'paginas' ? 'botao pequeno' : 'botao-claro pequeno'} onClick={() => setModo('paginas')}>
            📄 Páginas
          </button>{' '}
          <button className={modo === 'rolagem' ? 'botao pequeno' : 'botao-claro pequeno'} onClick={() => setModo('rolagem')}>
            📜 Rolagem
          </button>
        </div>
        <div>
          <button className="botao-claro pequeno" onClick={() => setTamanho(Math.max(14, tamanho - 2))} aria-label="Diminuir letra">
            A-
          </button>{' '}
          <button className="botao-claro pequeno" onClick={() => setTamanho(Math.min(28, tamanho + 2))} aria-label="Aumentar letra">
            A+
          </button>
        </div>
      </section>

      {modo === 'paginas' && (
        <>
          <div className="sumario">
            {livro.capitulos.map((c, i) => (
              <button key={i} className={i === cap ? 'ativo' : ''} onClick={() => irParaCapitulo(i)}>
                {i + 1}
              </button>
            ))}
          </div>

          <article className="folha box">
            <p className="tag">
              CAPÍTULO {cap + 1} DE {total}
            </p>
            <h2>{capituloAtual.titulo}</h2>
            <div className="texto-livro" style={{ fontSize: tamanho + 'px' }}>
              {paragrafos(capituloAtual.texto).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>

          <div className="progresso">
            <div className="progresso-barra" style={{ width: porcentagem + '%' }}></div>
          </div>

          <div className="leitor-nav">
            <button className="botao-claro" disabled={cap === 0} onClick={() => irParaCapitulo(cap - 1)}>
              ← Anterior
            </button>
            <span>{porcentagem}%</span>
            {cap < total - 1 ? (
              <button className="botao" onClick={() => irParaCapitulo(cap + 1)}>
                Próximo →
              </button>
            ) : (
              <button className="botao" onClick={finalizar}>
                Finalizar leitura ✔
              </button>
            )}
          </div>
        </>
      )}

      {modo === 'rolagem' && (
        <>
          <article className="folha box">
            {livro.capitulos.map((c, i) => (
              <div key={i} className="cap-rolagem">
                <p className="tag">CAPÍTULO {i + 1}</p>
                <h2>{c.titulo}</h2>
                <div className="texto-livro" style={{ fontSize: tamanho + 'px' }}>
                  {paragrafos(c.texto).map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </article>
          <div className="leitor-nav">
            <span></span>
            <button className="botao" onClick={finalizar}>
              Finalizar leitura ✔
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Leitor;
