

const paletas = [
  ['#7c3aed', '#4c1d95'], 
  ['#a855f7', '#581c87'], 
  ['#c026d3', '#6b21a8'], 
  ['#6366f1', '#3730a3'], 
  ['#8b5cf6', '#2e1065'], 
  ['#d946ef', '#7e22ce'], 
  ['#9333ea', '#312e81'], 
  ['#ec4899', '#6d28d9'], 
  ['#7c3aed', '#be185d'], 
  ['#a78bfa', '#4338ca'], 
];

const padroes = ['circulos', 'ondas', 'listras', 'estrelas', 'losangos', 'montanhas'];

export function novaSeed() {
  return Math.floor(Math.random() * 1000000000);
}


export function seedDoTexto(texto) {
  let h = 0;
  for (let i = 0; i < texto.length; i++) {
    h = (h * 31 + texto.charCodeAt(i)) % 1000000007;
  }
  return h;
}


function criarSorteio(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}


export function gerarCapa(seed) {
  const sorteio = criarSorteio(seed);
  const paleta = paletas[Math.floor(sorteio() * paletas.length)];
  const padrao = padroes[Math.floor(sorteio() * padroes.length)];
  const angulo = Math.floor(sorteio() * 360);
  const formas = [];

  if (padrao === 'circulos') {
    const qtd = 5 + Math.floor(sorteio() * 4);
    for (let i = 0; i < qtd; i++) {
      formas.push({
        tipo: 'circulo',
        x: sorteio() * 200,
        y: sorteio() * 300,
        r: 18 + sorteio() * 55,
        opacidade: 0.08 + sorteio() * 0.2,
      });
    }
  }

  if (padrao === 'ondas') {
    for (let i = 0; i < 5; i++) {
      const y = 120 + i * 40;
      const alt = 12 + sorteio() * 18;
      formas.push({
        tipo: 'caminho',
        d: `M0 ${y} Q 50 ${y - alt} 100 ${y} T 200 ${y} L200 300 L0 300 Z`,
        opacidade: 0.1 + i * 0.04,
      });
    }
  }

  if (padrao === 'listras') {
    const qtd = 6 + Math.floor(sorteio() * 4);
    for (let i = 0; i < qtd; i++) {
      formas.push({
        tipo: 'listra',
        x: -100 + i * (400 / qtd),
        largura: 8 + sorteio() * 22,
        opacidade: 0.07 + sorteio() * 0.14,
      });
    }
  }

  if (padrao === 'estrelas') {
    for (let i = 0; i < 16; i++) {
      formas.push({
        tipo: 'estrela',
        x: sorteio() * 200,
        y: sorteio() * 300,
        tamanho: 3 + sorteio() * 10,
        opacidade: 0.25 + sorteio() * 0.55,
      });
    }
  }

  if (padrao === 'losangos') {
    for (let linha = 0; linha < 7; linha++) {
      for (let coluna = 0; coluna < 5; coluna++) {
        if (sorteio() > 0.45) {
          formas.push({
            tipo: 'losango',
            x: coluna * 50 + (linha % 2) * 25,
            y: linha * 50,
            tamanho: 10 + sorteio() * 16,
            opacidade: 0.08 + sorteio() * 0.2,
          });
        }
      }
    }
  }

  if (padrao === 'montanhas') {
    for (let i = 0; i < 3; i++) {
      const base = 300;
      const topo = 150 + i * 40 + sorteio() * 25;
      const meio = 40 + sorteio() * 120;
      formas.push({
        tipo: 'caminho',
        d: `M-10 ${base} L${meio} ${topo} L${meio + 60 + sorteio() * 40} ${base} Z`,
        opacidade: 0.12 + i * 0.07,
      });
      formas.push({
        tipo: 'caminho',
        d: `M${80 + sorteio() * 40} ${base} L${140 + sorteio() * 40} ${topo + 10} L230 ${base} Z`,
        opacidade: 0.1 + i * 0.06,
      });
    }
  }


  const luaX = 40 + sorteio() * 120;
  const luaY = 40 + sorteio() * 40;

  return { cores: paleta, padrao, angulo, formas, lua: { x: luaX, y: luaY, r: 14 + sorteio() * 14 } };
}
