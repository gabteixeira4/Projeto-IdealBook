import { useState } from 'react';
import Capa from '../components/Capa.jsx';
import { pegarLivrosDosAutores, ler, gravar } from '../storage.js';
import { novaSeed } from '../capas.js';

const generos = ['Romance', 'Fantasia', 'Ficção', 'Terror', 'Aventura', 'Drama', 'Poesia', 'Outro'];


function Escrever({ usuario, irPara }) {
  const [meusLivros, setMeusLivros] = useState(
    pegarLivrosDosAutores().filter((l) => l.autorEmail === usuario.email)
  );
  const [criando, setCriando] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [genero, setGenero] = useState('Romance');
  const [sinopse, setSinopse] = useState('');
  const [erro, setErro] = useState('');

  function criarLivro(evento) {
    evento.preventDefault();

    if (titulo.trim().length < 2) {
      setErro('Dê um título para o seu livro.');
      return;
    }


    const novo = {
      id: 'u' + Date.now(),
      titulo: titulo.trim(),
      autor: usuario.nome,
      autorEmail: usuario.email,
      genero: genero,
      sinopse: sinopse.trim(),
      capaSeed: novaSeed(), 
      capitulos: [],
      publicado: false,
    };

    const todos = pegarLivrosDosAutores();
    todos.push(novo);
    gravar('ib_livros_autores', todos);

   
    irPara('editor', novo.id);
  }

  function excluirLivro(id) {
    const confirmou = window.confirm('Tem certeza que quer excluir esse livro? Não dá para desfazer.');
    if (!confirmou) {
      return;
    }
    const todos = ler('ib_livros_autores', []).filter((l) => l.id !== id);
    gravar('ib_livros_autores', todos);
    setMeusLivros(todos.filter((l) => l.autorEmail === usuario.email));
  }

  return (
    <main className="pagina">
      <section className="topo-pagina">
        <p className="tag">ÁREA DO AUTOR</p>
        <h1>
          Meus <span>livros</span>
        </h1>
        <p>Crie seus livros, escreva os capítulos e publique quando estiver pronto.</p>
      </section>

      {!criando && (
        <p className="centro">
          <button className="botao grande" onClick={() => setCriando(true)}>
            ✍️ Escrever um novo livro
          </button>
        </p>
      )}

      {criando && (
        <div className="box form-box">
          <h2>Novo livro</h2>
          <form className="form" onSubmit={criarLivro} noValidate>
            <div className="campo">
              <input
                value={titulo}
                onChange={(e) => {
                  setTitulo(e.target.value);
                  setErro('');
                }}
                placeholder="Título do livro"
              />
              {erro && <span className="erro">{erro}</span>}
            </div>
            <div className="campo">
              <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                {generos.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div className="campo">
              <textarea
                value={sinopse}
                onChange={(e) => setSinopse(e.target.value)}
                placeholder="Sinopse (sobre o que é a história?)"
              ></textarea>
            </div>
            <p className="pequeno-texto">🎲 A capa do seu livro é sorteada automaticamente. Depois você pode sortear outra no editor.</p>
            <div className="linha-botoes">
              <button type="submit" className="botao">
                Criar livro
              </button>
              <button type="button" className="botao-claro" onClick={() => setCriando(false)}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {meusLivros.length === 0 && !criando && (
        <div className="vazio">
          <p>Você ainda não criou nenhum livro.</p>
        </div>
      )}

      <div className="lista">
        {meusLivros.map((l) => (
          <div className="item-lista box" key={l.id}>
            <div className="capa-mini">
              <Capa livro={l} />
            </div>
            <div className="item-info">
              <h3>{l.titulo}</h3>
              <p className="autor">{l.genero}</p>
              <p className="pequeno-texto">
                {l.capitulos.length} {l.capitulos.length === 1 ? 'capítulo' : 'capítulos'}{' '}
                <span className={l.publicado ? 'selo publicado' : 'selo'}>
                  {l.publicado ? 'Publicado' : 'Rascunho'}
                </span>
              </p>
            </div>
            <div className="item-botoes">
              <button className="botao" onClick={() => irPara('editor', l.id)}>
                Editar
              </button>
              <button className="botao-perigo" onClick={() => excluirLivro(l.id)}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Escrever;
