import { useState } from 'react';
import { ler, gravar } from '../storage.js';

// Recuperação de senha em 2 passos.
// Como ainda não temos servidor de e-mail, o "envio" é só uma simulação:
// o código aparece numa caixinha na própria tela.
function RecuperarSenha({ irPara }) {
  const [passo, setPasso] = useState(1);
  const [email, setEmail] = useState('');
  const [codigoGerado, setCodigoGerado] = useState('');
  const [codigo, setCodigo] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  function enviarCodigo(evento) {
    evento.preventDefault();
    const usuarios = ler('ib_usuarios', []);
    const achado = usuarios.find((u) => u.email === email.trim().toLowerCase());

    if (!achado) {
      setErro('Não encontramos uma conta com esse e-mail.');
      return;
    }

    // gera um número de 6 dígitos
    const novoCodigo = String(Math.floor(100000 + Math.random() * 900000));
    setCodigoGerado(novoCodigo);
    setErro('');
    setPasso(2);
  }

  function redefinir(evento) {
    evento.preventDefault();

    if (codigo.trim() !== codigoGerado) {
      setErro('Código incorreto.');
      return;
    }
    if (novaSenha.length < 6) {
      setErro('A nova senha precisa ter pelo menos 6 caracteres.');
      return;
    }
    if (novaSenha !== confirmar) {
      setErro('As senhas não são iguais.');
      return;
    }

    const usuarios = ler('ib_usuarios', []);
    const atualizados = usuarios.map((u) => {
      if (u.email === email.trim().toLowerCase()) {
        return { ...u, senha: novaSenha };
      }
      return u;
    });
    gravar('ib_usuarios', atualizados);

    setErro('');
    setSucesso(true);
  }

  if (sucesso) {
    return (
      <main className="pagina">
        <div className="box form-box centro">
          <h2>✅ Senha alterada!</h2>
          <p>Agora você já pode entrar com a nova senha.</p>
          <button className="botao grande" onClick={() => irPara('login')}>
            Ir para o login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="pagina">
      <div className="box form-box">
        <p className="tag">RECUPERAR SENHA</p>
        <h1>
          Esqueceu a <span>senha</span>?
        </h1>

        {passo === 1 && (
          <>
            <p>Digite o e-mail da sua conta e enviaremos um código para você.</p>
            <form className="form" onSubmit={enviarCodigo} noValidate>
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
              {erro && <span className="erro">{erro}</span>}
              <button type="submit" className="botao grande">
                Enviar código
              </button>
            </form>
          </>
        )}

        {passo === 2 && (
          <>
            <div className="email-simulado">
              <p className="email-topo">📧 E-mail simulado (para {email})</p>
              <p>
                Seu código de recuperação é: <b className="codigo">{codigoGerado}</b>
              </p>
              <p className="pequeno-texto">
                Em um sistema real esse código chegaria na caixa de entrada.
              </p>
            </div>

            <form className="form" onSubmit={redefinir} noValidate>
              <div className="campo">
                <input value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="Código recebido" />
              </div>
              <div className="campo">
                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Nova senha"
                />
              </div>
              <div className="campo">
                <input
                  type="password"
                  value={confirmar}
                  onChange={(e) => setConfirmar(e.target.value)}
                  placeholder="Confirme a nova senha"
                />
              </div>
              {erro && <span className="erro">{erro}</span>}
              <button type="submit" className="botao grande">
                Redefinir senha
              </button>
            </form>
          </>
        )}

        <p className="troca">
          <button className="link" onClick={() => irPara('login')}>
            ← Voltar para o login
          </button>
        </p>
      </div>
    </main>
  );
}

export default RecuperarSenha;
