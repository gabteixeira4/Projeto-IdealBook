
function RecuperarSenha({ irPara }) {
  return (
    <main className="pagina">
      <div className="box form-box centro">
        <p className="tag">RECUPERAR SENHA</p>

        <h1>
          Recuperação de <span>senha</span>
        </h1>

        <p>
          Estamos revisando e desenvolvendo essa funcionalidade
          para oferecer uma experiência melhor e mais segura.
        </p>

        <p>
          No momento, a recuperação de senha ainda não está
          disponível.
        </p>

        <p>
          Caso não consiga acessar sua conta, recomendamos
          criar uma nova conta para continuar utilizando
          nossa plataforma.
        </p>

        <button
          className="botao grande"
          onClick={() => irPara('cadastro')}
        >
          Criar outra conta
        </button>

        <p className="troca">
          <button
            className="link"
            onClick={() => irPara('login')}
          >
            ← Voltar para o login
          </button>
        </p>
      </div>
    </main>
  );
}

export default RecuperarSenha;
