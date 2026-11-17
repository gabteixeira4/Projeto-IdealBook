import Capa from './Capa.jsx';

// Painel roxo que aparece ao lado dos formulários de cadastro e login
const capas = [
  { id: 'a1', titulo: 'Sua história', autor: 'Ideal Book', capaSeed: 4821 },
  { id: 'a2', titulo: 'Novos mundos', autor: 'Ideal Book', capaSeed: 90210 },
  { id: 'a3', titulo: 'Capítulo 1', autor: 'Ideal Book', capaSeed: 1337 },
];

function PainelAuth({ titulo, texto, itens }) {
  return (
    <aside className="painel-auth">
      <div className="painel-capas" aria-hidden="true">
        {capas.map((c, i) => (
          <div key={c.id} className={'mini-livro m' + (i + 1)}>
            <Capa livro={c} />
          </div>
        ))}
      </div>
      <h2>{titulo}</h2>
      <p>{texto}</p>
      {itens && (
        <ul>
          {itens.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default PainelAuth;
