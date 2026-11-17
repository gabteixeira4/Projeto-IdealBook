import { useState, useEffect } from 'react';
import Menu from './components/Menu.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Biblioteca from './pages/Biblioteca.jsx';
import Leitor from './pages/Leitor.jsx';
import Escrever from './pages/Escrever.jsx';
import Editor from './pages/Editor.jsx';
import Historico from './pages/Historico.jsx';
import Salvos from './pages/Salvos.jsx';
import Login from './pages/Login.jsx';
import Cadastro from './pages/Cadastro.jsx';
import RecuperarSenha from './pages/RecuperarSenha.jsx';
import Sobre from './pages/Sobre.jsx';
import Contato from './pages/Contato.jsx';
import { ler, gravar, normalizarUsuario, ehEscritor } from './storage.js';

const titulos = {
  home: 'Ideal Book — Encontre seu próximo livro',
  biblioteca: 'Ideal Book — Biblioteca',
  leitor: 'Ideal Book — Leitura',
  escrever: 'Ideal Book — Meus livros',
  editor: 'Ideal Book — Editor',
  historico: 'Ideal Book — Histórico de leitura',
  salvos: 'Ideal Book — Livros salvos',
  login: 'Ideal Book — Entrar',
  cadastro: 'Ideal Book — Cadastro',
  recuperar: 'Ideal Book — Recuperar senha',
  sobre: 'Ideal Book — Sobre nossa Empresa',
  contato: 'Ideal Book — Contato',
};


const paginasPublicas = ['cadastro', 'login', 'recuperar', 'sobre', 'contato'];


const paginasDeEscritor = ['escrever', 'editor'];

function App() {
  const [usuario, setUsuario] = useState(() => {
    const guardado = ler('ib_logado', null);
    return guardado ? normalizarUsuario(guardado) : null;
  });
 
  const [pagina, setPagina] = useState(usuario ? 'home' : 'cadastro');
  const [livroId, setLivroId] = useState(null);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    document.title = titulos[pagina];
  }, [pagina]);

 
  function irPara(nome, id, textoBusca) {
    setPagina(nome);
    setLivroId(id || null);
    setBusca(textoBusca || '');
    window.scrollTo(0, 0);
  }

  function entrar(dados) {
    const logado = normalizarUsuario(dados);
    setUsuario(logado);
    gravar('ib_logado', logado);
  }

  function sair() {
    setUsuario(null);
    localStorage.removeItem('ib_logado');
    irPara('cadastro');
  }

  function mostrarPagina() {
  
    if (!usuario && !paginasPublicas.includes(pagina)) {
      return (
        <Cadastro
          irPara={irPara}
          entrar={entrar}
          aviso="Crie sua conta (ou entre) para acessar o Ideal Book."
        />
      );
    }

   
    if (paginasDeEscritor.includes(pagina) && !ehEscritor(usuario)) {
      return (
        <main className="pagina">
          <div className="box centro">
            <div className="emoji-grande">🔒</div>
            <h2>Área exclusiva para escritores</h2>
            <p>
              Sua conta é de <b>leitor</b>, então você pode ler, salvar livros e acompanhar seu histórico, mas não
              pode escrever livros.
            </p>
            <div className="linha-botoes">
              <button className="botao" onClick={() => irPara('biblioteca')}>
                Ir para a biblioteca
              </button>
            </div>
          </div>
        </main>
      );
    }

    if (pagina === 'biblioteca') return <Biblioteca irPara={irPara} usuario={usuario} buscaInicial={busca} />;
    if (pagina === 'leitor') return <Leitor irPara={irPara} usuario={usuario} livroId={livroId} />;
    if (pagina === 'escrever') return <Escrever irPara={irPara} usuario={usuario} />;
    if (pagina === 'editor') return <Editor irPara={irPara} usuario={usuario} livroId={livroId} />;
    if (pagina === 'historico') return <Historico irPara={irPara} usuario={usuario} />;
    if (pagina === 'salvos') return <Salvos irPara={irPara} usuario={usuario} />;
    if (pagina === 'login') return <Login irPara={irPara} entrar={entrar} />;
    if (pagina === 'cadastro') return <Cadastro irPara={irPara} entrar={entrar} />;
    if (pagina === 'recuperar') return <RecuperarSenha irPara={irPara} />;
    if (pagina === 'sobre') return <Sobre />;
    if (pagina === 'contato') return <Contato />;
    return <Home irPara={irPara} usuario={usuario} />;
  }

  return (
    <>
      <Menu pagina={pagina} usuario={usuario} irPara={irPara} sair={sair} />
      {mostrarPagina()}
      <Footer />
    </>
  );
}

export default App;
