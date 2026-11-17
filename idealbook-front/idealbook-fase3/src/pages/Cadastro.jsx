import { useState } from 'react';
import PainelAuth from '../components/PainelAuth.jsx';
import { ler, gravar } from '../storage.js';

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// os dois tipos de conta
const papeis = [
  {
    id: 'leitor',
    emoji: '📖',
    titulo: 'Leitor',
    texto: 'Explore a biblioteca, leia, salve livros e acompanhe seu histórico. Não escreve livros.',
  },
  {
    id: 'escritor',
    emoji: '✍️',
    titulo: 'Escritor',
    texto: 'Faz tudo que o leitor faz e também escreve e publica os próprios livros.',
  },
];

// Primeira página do site: aqui a pessoa escolhe se é leitor ou escritor
function Cadastro({ irPara, entrar, aviso }) {
  const [papel, setPapel] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erros, setErros] = useState({});

  function validar() {
    const novosErros = {};
    const usuarios = ler('ib_usuarios', []);

    if (papel === '') {
      novosErros.papel = 'Escolha como você quer usar o Ideal Book.';
    }
    if (nome.trim().length < 2) {
      novosErros.nome = 'Digite seu nome.';
    }
    if (!REGEX_EMAIL.test(email.trim())) {
      novosErros.email = 'Digite um e-mail válido (ex: nome@exemplo.com).';
    } else if (usuarios.find((u) => u.email === email.trim().toLowerCase())) {
      novosErros.email = 'Esse e-mail já está cadastrado.';
    }
    if (senha.length < 6) {
      novosErros.senha = 'A senha precisa ter pelo menos 6 caracteres.';
    }
    if (confirmar !== senha) {
      novosErros.confirmar = 'As senhas não são iguais.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function enviar(evento) {
    evento.preventDefault();
    if (!validar()) {
      return;
    }

    // salva o usuário no "sistema" (localStorage por enquanto), já com o papel escolhido
    const usuarios = ler('ib_usuarios', []);
    const novo = { nome: nome.trim(), email: email.trim().toLowerCase(), senha: senha, papel: papel };
    usuarios.push(novo);
    gravar('ib_usuarios', usuarios);

    // já deixa a pessoa logada
    entrar({ nome: novo.nome, email: novo.email, papel: novo.papel });
    irPara('home');
  }

  return (
    <main className="pagina auth-pagina">
      <div className="auth">
        <PainelAuth
          titulo="Sua próxima história começa aqui"
          texto="Crie sua conta em menos de um minuto e escolha como quer viver o Ideal Book."
          itens={['📚 Biblioteca cheia de livros', '⭐ Salve para ler depois', '✍️ Escreva e publique as suas histórias']}
        />

        <div className="box form-box">
          <p className="tag">CADASTRO</p>
          <h1>
            Criar <span>conta</span>
          </h1>

          {aviso && <p className="aviso">{aviso}</p>}

          <form className="form" onSubmit={enviar} noValidate>
            <div className="campo">
              <p className="label-form">Eu sou...</p>
              <div className="papeis" role="radiogroup" aria-label="Tipo de conta">
                {papeis.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    role="radio"
                    aria-checked={papel === p.id}
                    className={'papel ' + (papel === p.id ? 'escolhido' : '') + (erros.papel ? ' invalido' : '')}
                    onClick={() => {
                      setPapel(p.id);
                      setErros({ ...erros, papel: undefined });
                    }}
                  >
                    <span className="papel-emoji">{p.emoji}</span>
                    <strong>{p.titulo}</strong>
                    <span className="papel-texto">{p.texto}</span>
                  </button>
                ))}
              </div>
              {erros.papel && <span className="erro">{erros.papel}</span>}
            </div>

            <div className="campo">
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                aria-label="Seu nome"
                className={erros.nome ? 'invalido' : ''}
              />
              {erros.nome && <span className="erro">{erros.nome}</span>}
            </div>
            <div className="campo">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail"
                aria-label="Seu e-mail"
                className={erros.email ? 'invalido' : ''}
              />
              {erros.email && <span className="erro">{erros.email}</span>}
            </div>
            <div className="campo">
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha (mínimo 6 caracteres)"
                aria-label="Senha"
                className={erros.senha ? 'invalido' : ''}
              />
              {erros.senha && <span className="erro">{erros.senha}</span>}
            </div>
            <div className="campo">
              <input
                type="password"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                placeholder="Confirme a senha"
                aria-label="Confirme a senha"
                className={erros.confirmar ? 'invalido' : ''}
              />
              {erros.confirmar && <span className="erro">{erros.confirmar}</span>}
            </div>
            <button type="submit" className="botao grande">
              Cadastrar
            </button>
          </form>

          <p className="troca">
            Já tem conta?{' '}
            <button className="link" onClick={() => irPara('login')}>
              Entrar
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Cadastro;
