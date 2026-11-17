import { useState } from 'react';
import PainelAuth from '../components/PainelAuth.jsx';
import { ler } from '../storage.js';

function Login({ irPara, entrar, aviso }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function enviar(evento) {
    evento.preventDefault();

    if (email.trim() === '' || senha === '') {
      setErro('Preencha o e-mail e a senha.');
      return;
    }

    
    const usuarios = ler('ib_usuarios', []);
    const achado = usuarios.find(
      (u) => u.email === email.trim().toLowerCase() && u.senha === senha
    );

    if (!achado) {
      setErro('E-mail ou senha incorretos.');
      return;
    }

    entrar({ nome: achado.nome, email: achado.email, papel: achado.papel });
    irPara('home');
  }

  return (
    <main className="pagina auth-pagina">
      <div className="auth">
      <PainelAuth
        titulo="Que bom te ver de novo!"
        texto="Entre na sua conta para continuar sua leitura ou voltar a escrever."
      />
      <div className="box form-box">
        <p className="tag">LOGIN</p>
        <h1>
          Entrar na <span>conta</span>
        </h1>

        {aviso && <p className="aviso">{aviso}</p>}

        <form className="form" onSubmit={enviar} noValidate>
          <div className="campo">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErro('');
              }}
              placeholder="Seu e-mail"
            />
          </div>
          <div className="campo">
            <input
              type="password"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                setErro('');
              }}
              placeholder="Sua senha"
            />
          </div>
          {erro && <span className="erro">{erro}</span>}
          <button type="submit" className="botao grande">
            Entrar
          </button>
        </form>

        <p className="troca">
          <button className="link" onClick={() => irPara('recuperar')}>
            Esqueci minha senha
          </button>
        </p>
        <p className="troca">
          Ainda não tem conta?{' '}
          <button className="link" onClick={() => irPara('cadastro')}>
            Cadastre-se
          </button>
        </p>
      </div>
      </div>
    </main>
  );
}

export default Login;
