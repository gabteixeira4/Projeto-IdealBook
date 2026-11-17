import { useState } from 'react';

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erros, setErros] = useState({});
  const [enviado, setEnviado] = useState(false);

  function validar() {
    const novosErros = {};
    if (nome.trim().length < 2) {
      novosErros.nome = 'Digite seu nome completo.';
    }
    if (!REGEX_EMAIL.test(email.trim())) {
      novosErros.email = 'Digite um e-mail válido (ex: nome@exemplo.com).';
    }
    if (mensagem.trim().length < 10) {
      novosErros.mensagem = 'Conte um pouco mais (mínimo 10 caracteres).';
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function enviar(evento) {
    evento.preventDefault();
    if (validar()) {
      setEnviado(true);
      setNome('');
      setEmail('');
      setMensagem('');
    }
  }

  return (
    <main className="pagina">
      <section className="topo-pagina">
        <p className="tag">FALE CONOSCO</p>
        <h1>
          Entre em <span>contato</span>
        </h1>
        <p>Tem alguma sugestão, dúvida ou ideia para o Ideal Book? Envie uma mensagem.</p>
      </section>

      <section className="contato-grid">
        <div className="info">
          <h2>Onde estamos</h2>
          <p className="label">📍 Endereço</p>
          <p className="valor">Av. das Histórias, 456 — Centro</p>
          <p className="label">📞 Telefone</p>
          <p className="valor">(11) 4000-1010</p>
          <p className="label">✉️ E-mail</p>
          <p className="valor">contato@idealbook.com</p>
          <p className="label">🕒 Horário</p>
          <p className="valor">Segunda a sábado, das 9h às 18h</p>
        </div>

        <div className="box">
          <form className="form" onSubmit={enviar} noValidate>
            <div className="campo">
              <input
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  setEnviado(false);
                }}
                placeholder="Seu nome"
                className={erros.nome ? 'invalido' : ''}
              />
              {erros.nome && <span className="erro">{erros.nome}</span>}
            </div>
            <div className="campo">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEnviado(false);
                }}
                placeholder="Seu e-mail"
                className={erros.email ? 'invalido' : ''}
              />
              {erros.email && <span className="erro">{erros.email}</span>}
            </div>
            <div className="campo">
              <textarea
                value={mensagem}
                onChange={(e) => {
                  setMensagem(e.target.value);
                  setEnviado(false);
                }}
                placeholder="Sua mensagem"
                className={erros.mensagem ? 'invalido' : ''}
              ></textarea>
              {erros.mensagem && <span className="erro">{erros.mensagem}</span>}
            </div>
            <button type="submit" className="botao grande">
              Enviar mensagem
            </button>
          </form>

          {enviado && <p className="sucesso">✅ Mensagem enviada com sucesso!</p>}
        </div>
      </section>
    </main>
  );
}

export default Contato;
