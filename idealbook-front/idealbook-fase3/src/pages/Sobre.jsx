function Sobre() {
  return (
    <main className="pagina">
      <section className="box">
        <p className="tag">SOBRE O PROJETO</p>
        <h1>
          Conheça o <span>Ideal Book</span>
        </h1>
        <p>
          O Ideal Book é uma plataforma criada para facilitar a descoberta de livros e também para
          quem gosta de escrever. A proposta é aproximar leitores de histórias que combinam com seus
          interesses e dar espaço para novos autores publicarem as suas.
        </p>
        <div className="grid-info">
          <div>
            <b>🎯 Nossa missão</b>
            <p>Tornar a busca por uma boa leitura simples, rápida e agradável.</p>
          </div>
          <div>
            <b>💡 Nossa ideia</b>
            <p>
              Reunir leitura e escrita no mesmo lugar: quem lê pode salvar e acompanhar o histórico,
              quem escreve pode publicar.
            </p>
          </div>
          <div>
            <b>❤️ Leitores e escritores</b>
            <p>
              No cadastro você escolhe: leitor (lê, salva e acompanha o histórico) ou escritor (também escreve e
              publica os próprios livros).
            </p>
          </div>
        </div>
      </section>

      <div className="citacao">
        <p>“Um bom livro pode mudar o rumo de um dia inteiro.”</p>
      </div>
    </main>
  );
}

export default Sobre;
