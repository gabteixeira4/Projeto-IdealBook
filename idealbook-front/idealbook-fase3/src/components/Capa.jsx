import { useState } from 'react';
import { gerarCapa, seedDoTexto } from '../capas.js';

// Desenha uma capa sorteada (SVG) com o título e o autor por cima.
function CapaGerada({ livro }) {
  const seed = livro.capaSeed !== undefined ? livro.capaSeed : seedDoTexto(livro.id || livro.titulo);
  const capa = gerarCapa(seed);
  const idGrad = 'grad-' + seed;

  return (
    <div className="capa-falsa">
      <svg className="capa-arte" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={idGrad} gradientTransform={'rotate(' + capa.angulo + ' .5 .5)'}>
            <stop offset="0" stopColor={capa.cores[0]} />
            <stop offset="1" stopColor={capa.cores[1]} />
          </linearGradient>
        </defs>
        <rect width="200" height="300" fill={'url(#' + idGrad + ')'} />
        <circle cx={capa.lua.x} cy={capa.lua.y} r={capa.lua.r} fill="#fff" opacity="0.18" />
        {capa.formas.map((f, i) => {
          if (f.tipo === 'circulo') {
            return <circle key={i} cx={f.x} cy={f.y} r={f.r} fill="#fff" opacity={f.opacidade} />;
          }
          if (f.tipo === 'caminho') {
            return <path key={i} d={f.d} fill="#fff" opacity={f.opacidade} />;
          }
          if (f.tipo === 'listra') {
            return (
              <rect key={i} x={f.x} y="-50" width={f.largura} height="450" fill="#fff" opacity={f.opacidade} transform="rotate(25 100 150)" />
            );
          }
          if (f.tipo === 'estrela') {
            const t = f.tamanho;
            const d = `M${f.x} ${f.y - t} L${f.x + t / 4} ${f.y - t / 4} L${f.x + t} ${f.y} L${f.x + t / 4} ${f.y + t / 4} L${f.x} ${f.y + t} L${f.x - t / 4} ${f.y + t / 4} L${f.x - t} ${f.y} L${f.x - t / 4} ${f.y - t / 4} Z`;
            return <path key={i} d={d} fill="#fff" opacity={f.opacidade} />;
          }
          if (f.tipo === 'losango') {
            const t = f.tamanho;
            const d = `M${f.x} ${f.y - t} L${f.x + t} ${f.y} L${f.x} ${f.y + t} L${f.x - t} ${f.y} Z`;
            return <path key={i} d={d} fill="#fff" opacity={f.opacidade} />;
          }
          return null;
        })}
      </svg>
      <strong>{livro.titulo}</strong>
      <span>{livro.autor}</span>
    </div>
  );
}

// Mostra a capa do livro. Livros da biblioteca tentam o Open Library pelo ISBN;
// se não achar (ou se o livro foi escrito por um usuário) mostra uma capa sorteada.
function Capa({ livro, tamanho }) {
  const [tentativa, setTentativa] = useState(0);
  const isbns = livro.isbns || [];

  if (tentativa < isbns.length) {
    const letra = tamanho === 'grande' ? 'L' : 'M';
    const url = 'https://covers.openlibrary.org/b/isbn/' + isbns[tentativa] + '-' + letra + '.jpg?default=false';
    return (
      <div className="capa">
        <img
          src={url}
          alt={'Capa do livro ' + livro.titulo}
          loading="lazy"
          onError={() => setTentativa(tentativa + 1)}
        />
      </div>
    );
  }

  return (
    <div className="capa">
      <CapaGerada livro={livro} />
    </div>
  );
}

export default Capa;
