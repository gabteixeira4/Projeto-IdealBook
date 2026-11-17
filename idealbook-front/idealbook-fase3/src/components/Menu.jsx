import { useState } from 'react';

// itens que aparecem conforme o tipo de conta
const itensLeitor = [
  { pagina: 'home', texto: 'Home', emoji: '🏠' },
  { pagina: 'biblioteca', texto: 'Biblioteca', emoji: '📚' },
  { pagina: 'historico', texto: 'Histórico', emoji: '🕒' },
  { pagina: 'salvos', texto: 'Salvos', emoji: '⭐' },
];
const itemEscrever = { pagina: 'escrever', texto: 'Escrever', emoji: '✍️' };
const itensFinais = [
  { pagina: 'sobre', texto: 'Sobre', emoji: '🏢' },
  { pagina: 'contato', texto: 'Contato', emoji: '✉️' },
];

// Menu: no desktop fica uma barra em cima, no celular vira hambúrguer
// que abre uma sidebar na esquerda (o CSS troca entre os dois).
function Menu({ pagina, usuario, irPara, sair }) {
  const [aberto, setAberto] = useState(false);

  // quem não tem conta só vê Sobre e Contato; escritor ganha o item "Escrever"
  let itens = itensFinais;
  if (usuario) {
    const base = usuario.papel === 'escritor' ? [...itensLeitor, itemEscrever] : itensLeitor;
    itens = [...base, ...itensFinais];
  }

  function ir(nome) {
    irPara(nome);
    setAberto(false);
  }

  // deixa o botão certo "ativo" mesmo quando está numa página interna
  function estaAtivo(nome) {
    if (nome === 'biblioteca' && pagina === 'leitor') return true;
    if (nome === 'escrever' && pagina === 'editor') return true;
    return pagina === nome;
  }

  const primeiroNome = usuario ? usuario.nome.split(' ')[0] : '';
  const nomePapel = usuario && usuario.papel === 'escritor' ? '✍️ Escritor' : '📖 Leitor';

  return (
    <header className="header">
      <div className="logo" onClick={() => ir(usuario ? 'home' : 'cadastro')}>
        <span className="logo-emoji">📚</span>
        <span className="logo-textos">
          <span className="logo-titulo">Ideal Book</span>
          <span className="logo-sub">LIVRARIA DIGITAL</span>
        </span>
      </div>

      <nav className="menu desktop">
        {itens.map((item) => (
          <button
            key={item.pagina}
            className={estaAtivo(item.pagina) ? 'ativo' : ''}
            onClick={() => ir(item.pagina)}
          >
            {item.texto}
          </button>
        ))}
      </nav>

      <div className="menu-conta desktop">
        {usuario ? (
          <>
            <span className="ola">Olá, {primeiroNome}</span>
            <span className="chip-papel">{nomePapel}</span>
            <button className="botao-claro pequeno" onClick={sair}>Sair</button>
          </>
        ) : (
          <>
            <button className="botao-claro pequeno" onClick={() => ir('login')}>Entrar</button>
            <button className="botao pequeno" onClick={() => ir('cadastro')}>Cadastrar</button>
          </>
        )}
      </div>

      <button className="hamb" onClick={() => setAberto(!aberto)} aria-label="Abrir menu">
        ☰
      </button>

      <div className={'overlay ' + (aberto ? 'visivel' : '')} onClick={() => setAberto(false)} />

      <nav className={'sidebar ' + (aberto ? 'aberta' : '')}>
        <div className="sidebar-topo">
          <span className="logo">📚 Ideal Book</span>
          <button className="fechar" onClick={() => setAberto(false)} aria-label="Fechar menu">
            ✕
          </button>
        </div>

        {usuario && (
          <p className="sidebar-ola">
            Olá, {primeiroNome}! <span className="chip-papel">{nomePapel}</span>
          </p>
        )}

        {itens.map((item) => (
          <button key={item.pagina} onClick={() => ir(item.pagina)}>
            {item.emoji} {item.texto}
          </button>
        ))}

        {usuario ? (
          <button
            onClick={() => {
              sair();
              setAberto(false);
            }}
          >
            🚪 Sair
          </button>
        ) : (
          <>
            <button onClick={() => ir('login')}>🔑 Entrar</button>
            <button onClick={() => ir('cadastro')}>📝 Cadastrar</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Menu;
