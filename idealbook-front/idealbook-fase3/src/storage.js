import livrosFixos from './data/livros.js';



export function ler(chave, padrao) {
  try {
    const texto = localStorage.getItem(chave);
    if (texto) {
      return JSON.parse(texto);
    }
    return padrao;
  } catch (erro) {
    return padrao;
  }
}

export function gravar(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}


export function pegarLivrosDosAutores() {
  return ler('ib_livros_autores', []);
}


export function pegarLivrosPublicados() {
  const dosAutores = pegarLivrosDosAutores().filter((l) => l.publicado);
  return [...livrosFixos, ...dosAutores];
}

export function acharLivro(id) {
  const todos = [...livrosFixos, ...pegarLivrosDosAutores()];
  return todos.find((l) => l.id === id);
}


export function podeVerLivro(livro, usuario) {
  if (!livro) return false;
  if (!livro.autorEmail) return true;
  if (livro.publicado) return true;
  return !!usuario && usuario.email === livro.autorEmail;
}


export function normalizarUsuario(u) {
  return { nome: u.nome, email: u.email, papel: u.papel === 'escritor' ? 'escritor' : 'leitor' };
}

export function ehEscritor(usuario) {
  return !!usuario && usuario.papel === 'escritor';
}


export function pegarSalvos(email) {
  return ler('ib_salvos_' + email, []);
}


export function alternarSalvo(email, livroId) {
  let lista = pegarSalvos(email);
  if (lista.includes(livroId)) {
    lista = lista.filter((id) => id !== livroId);
  } else {
    lista.push(livroId);
  }
  gravar('ib_salvos_' + email, lista);
  return lista;
}


export function pegarHistorico(email) {
  return ler('ib_historico_' + email, []);
}


export function registrarLeitura(email, livroId, capitulo) {
  let lista = pegarHistorico(email).filter((h) => h.livroId !== livroId);
  lista.unshift({ livroId: livroId, capitulo: capitulo, data: new Date().toISOString() });
  gravar('ib_historico_' + email, lista);
}
