import { useState } from 'react';
import Capa from '../components/Capa.jsx';
import { pegarLivrosDosAutores, gravar } from '../storage.js';
import { novaSeed } from '../capas.js';


function Editor({ livroId, usuario, irPara }) {
  const livroInicial = pegarLivrosDosAutores().find((l) => l.id === livroId);

  const [livro, setLivro] = useState(livroInicial);
  const [selecionado, setSelecionado] = useState(
    livroInicial && livroInicial.capitulos.length > 0 ? 0 : -1
  );
  const [tituloCap, setTituloCap] = useState(
    livroInicial && livroInicial.capitulos.length > 0 ? livroInicial.capitulos[0].titulo : ''
  );
  const [textoCap, setTextoCap] = useState(
    livroInicial && livroInicial.capitulos.length > 0 ? livroInicial.capitulos[0].texto : ''
  );
  const [tituloLivro, setTituloLivro] = useState(livroInicial ? livroInicial.titulo : '');
  const [sinopse, setSinopse] = useState(livroInicial ? livroInicial.sinopse : '');
  const [mensagem, setMensagem] = useState('');
  const [problemas, setProblemas] = useState([]);


  if (!livro || livro.autorEmail !== usuario.email) {
    return (
      <main className="pagina">
        <div className="box centro">
          <h2>Livro não encontrado 😕</h2>
          <button className="botao" onClick={() => irPara('escrever')}>
            Voltar para meus livros
          </button>
        </div>
      </main>
    );
  }


  function salvarLivro(livroNovo) {
    const todos = pegarLivrosDosAutores().map((l) => (l.id === livroNovo.id ? livroNovo : l));
    gravar('ib_livros_autores', todos);
    setLivro(livroNovo);
  }

  const capituloAtual = selecionado >= 0 ? livro.capitulos[selecionado] : null;
  const mudou =
    capituloAtual !== null && (tituloCap !== capituloAtual.titulo || textoCap !== capituloAtual.texto);

  function avisar(texto) {
    setMensagem(texto);
    setTimeout(() => setMensagem(''), 3000);
  }

  function escolherCapitulo(indice) {
    if (mudou) {
      const sair = window.confirm('Você tem alterações não salvas neste capítulo. Quer descartar?');
      if (!sair) {
        return;
      }
    }
    setSelecionado(indice);
    setTituloCap(livro.capitulos[indice].titulo);
    setTextoCap(livro.capitulos[indice].texto);
  }

  function salvarInfo() {
    if (tituloLivro.trim().length < 2) {
      avisar('O livro precisa de um título.');
      return;
    }
    salvarLivro({ ...livro, titulo: tituloLivro.trim(), sinopse: sinopse.trim() });
    setProblemas([]);
    avisar('Informações do livro salvas ✔');
  }

  function sortearCapa() {
    salvarLivro({ ...livro, capaSeed: novaSeed() });
  }

  function adicionarCapitulo() {

    if (mudou) {
      const sair = window.confirm('Você tem alterações não salvas neste capítulo. Quer descartar?');
      if (!sair) {
        return;
      }
    }
    const numero = livro.capitulos.length + 1;
    const novo = { titulo: 'Capítulo ' + numero, texto: '' };
    const capitulos = [...livro.capitulos, novo];
    salvarLivro({ ...livro, capitulos: capitulos });
    setSelecionado(capitulos.length - 1);
    setTituloCap(novo.titulo);
    setTextoCap(novo.texto);
  }

  function salvarCapitulo() {
    if (tituloCap.trim() === '') {
      avisar('O capítulo precisa de um título.');
      return;
    }
    const capitulos = livro.capitulos.map((c, i) =>
      i === selecionado ? { titulo: tituloCap.trim(), texto: textoCap } : c
    );
    salvarLivro({ ...livro, capitulos: capitulos });
    setProblemas([]);
    avisar('Capítulo salvo ✔');
  }

  function excluirCapitulo() {
    const confirmou = window.confirm('Excluir o capítulo "' + capituloAtual.titulo + '"?');
    if (!confirmou) {
      return;
    }
    const capitulos = livro.capitulos.filter((c, i) => i !== selecionado);
    salvarLivro({ ...livro, capitulos: capitulos });

    if (capitulos.length === 0) {
      setSelecionado(-1);
      setTituloCap('');
      setTextoCap('');
    } else {
      const novoIndice = Math.max(0, selecionado - 1);
      setSelecionado(novoIndice);
      setTituloCap(capitulos[novoIndice].titulo);
      setTextoCap(capitulos[novoIndice].texto);
    }
  }

 
  function mover(indice, direcao) {
    const destino = indice + direcao;
    if (destino < 0 || destino >= livro.capitulos.length) {
      return;
    }
    const capitulos = [...livro.capitulos];
    const guardado = capitulos[indice];
    capitulos[indice] = capitulos[destino];
    capitulos[destino] = guardado;
    salvarLivro({ ...livro, capitulos: capitulos });

   
    if (selecionado === indice) {
      setSelecionado(destino);
    } else if (selecionado === destino) {
      setSelecionado(indice);
    }
  }

  
  function publicar() {
    const lista = [];
    if (livro.titulo.trim().length < 2) {
      lista.push('O livro precisa de um título.');
    }
    if (livro.sinopse.trim().length < 10) {
      lista.push('Escreva uma sinopse com pelo menos 10 caracteres (e clique em "Salvar informações").');
    }
    if (livro.capitulos.length === 0) {
      lista.push('Crie pelo menos um capítulo.');
    }
    livro.capitulos.forEach((c, i) => {
      if (c.texto.trim().length < 20) {
        lista.push('O capítulo ' + (i + 1) + ' ("' + c.titulo + '") está vazio ou muito curto.');
      }
    });
    if (mudou) {
      lista.push('Você tem alterações não salvas no capítulo aberto.');
    }

    setProblemas(lista);
    if (lista.length > 0) {
      return;
    }

    salvarLivro({ ...livro, publicado: true });
    avisar('Livro publicado! Ele já aparece na biblioteca 🎉');
  }

  function despublicar() {
    salvarLivro({ ...livro, publicado: false });
    setProblemas([]);
    avisar('O livro voltou a ser rascunho.');
  }

  return (
    <main className="pagina larga">
      <button className="voltar" onClick={() => irPara('escrever')}>
        ← Meus livros
      </button>

      <section className="box">
        <div className="editor-topo">
          <p className="tag">
            EDITANDO <span className={livro.publicado ? 'selo publicado' : 'selo'}>{livro.publicado ? 'Publicado' : 'Rascunho'}</span>
          </p>
        </div>
        <div className="editor-info">
          <div className="editor-capa">
            <Capa livro={livro} tamanho="grande" />
            <button className="botao-claro pequeno" onClick={sortearCapa}>
              🎲 Sortear outra capa
            </button>
          </div>
        <div className="form">
          <div className="campo">
            <input value={tituloLivro} onChange={(e) => setTituloLivro(e.target.value)} placeholder="Título do livro" />
          </div>
          <div className="campo">
            <textarea
              className="curto"
              value={sinopse}
              onChange={(e) => setSinopse(e.target.value)}
              placeholder="Sinopse"
            ></textarea>
          </div>
          <div className="linha-botoes">
            <button className="botao-claro" onClick={salvarInfo}>
              Salvar informações
            </button>
            {!livro.publicado && (
              <button className="botao" onClick={publicar}>
                🚀 Publicar livro
              </button>
            )}
            {livro.publicado && (
              <>
                <button className="botao-claro" onClick={() => irPara('leitor', livro.id)}>
                  Ver na biblioteca
                </button>
                <button className="botao-perigo" onClick={despublicar}>
                  Despublicar
                </button>
              </>
            )}
            {livro.capitulos.length > 0 && !livro.publicado && (
              <button className="botao-claro" onClick={() => irPara('leitor', livro.id)}>
                👁 Pré-visualizar
              </button>
            )}
          </div>

          {mensagem && <p className="sucesso">{mensagem}</p>}

          {problemas.length > 0 && (
            <div className="aviso">
              <b>Antes de publicar, corrija:</b>
              <ul>
                {problemas.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        </div>
      </section>

      <section className="editor-grid">
        <div className="box">
          <h3>Capítulos</h3>
          {livro.capitulos.length === 0 && <p className="pequeno-texto">Nenhum capítulo ainda.</p>}
          <ul className="lista-cap">
            {livro.capitulos.map((c, i) => (
              <li key={i} className={i === selecionado ? 'ativo' : ''}>
                <button className="cap-nome" onClick={() => escolherCapitulo(i)}>
                  {i + 1}. {c.titulo}
                </button>
                <span className="setas">
                  <button onClick={() => mover(i, -1)} disabled={i === 0} aria-label="Subir capítulo">
                    ↑
                  </button>
                  <button
                    onClick={() => mover(i, 1)}
                    disabled={i === livro.capitulos.length - 1}
                    aria-label="Descer capítulo"
                  >
                    ↓
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <button className="botao grande" onClick={adicionarCapitulo}>
            + Novo capítulo
          </button>
        </div>

        <div className="box">
          {capituloAtual === null && (
            <div className="vazio">
              <p>Crie ou escolha um capítulo para começar a escrever.</p>
            </div>
          )}

          {capituloAtual !== null && (
            <div className="form">
              <div className="campo">
                <input value={tituloCap} onChange={(e) => setTituloCap(e.target.value)} placeholder="Título do capítulo" />
              </div>
              <div className="campo">
                <textarea
                  className="editor-texto"
                  value={textoCap}
                  onChange={(e) => setTextoCap(e.target.value)}
                  placeholder="Escreva aqui o seu capítulo... (use uma linha em branco para separar os parágrafos)"
                ></textarea>
                <span className="pequeno-texto">
                  {textoCap.trim() === '' ? 0 : textoCap.trim().split(/\s+/).length} palavras
                  {mudou && ' — alterações não salvas'}
                </span>
              </div>
              <div className="linha-botoes">
                <button className="botao" onClick={salvarCapitulo}>
                  💾 Salvar capítulo
                </button>
                <button className="botao-perigo" onClick={excluirCapitulo}>
                  Excluir capítulo
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Editor;
