import livrosFixos from './data/livros.js';

// funções para guardar as coisas no localStorage do navegador
// (como ainda não temos o back-end ligado, os dados ficam aqui)

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

// livros que os autores criaram dentro do site
export function pegarLivrosDosAutores() {
  return ler('ib_livros_autores', []);
}

// livros da biblioteca = os fixos + os que foram publicados
export function pegarLivrosPublicados() {
  const dosAutores = pegarLivrosDosAutores().filter((l) => l.publicado);
  return [...livrosFixos, ...dosAutores];
}

export function acharLivro(id) {
  const todos = [...livrosFixos, ...pegarLivrosDosAutores()];
  return todos.find((l) => l.id === id);
}

// regra de acesso: livro de autor que não foi publicado só aparece para o próprio autor
export function podeVerLivro(livro, usuario) {
  if (!livro) return false;
  if (!livro.autorEmail) return true;
  if (livro.publicado) return true;
  return !!usuario && usuario.email === livro.autorEmail;
}

// ---------- papéis (leitor ou escritor) ----------
// Todo usuário tem um papel escolhido no cadastro. Contas antigas (sem papel) viram leitor.
export function normalizarUsuario(u) {
  return { nome: u.nome, email: u.email, papel: u.papel === 'escritor' ? 'escritor' : 'leitor' };
}

export function ehEscritor(usuario) {
  return !!usuario && usuario.papel === 'escritor';
}

// ---------- livros salvos (coleção) ----------
export function pegarSalvos(email) {
  return ler('ib_salvos_' + email, []);
}

// se o livro já está salvo tira da lista, se não está coloca
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

// ---------- histórico de leitura ----------
export function pegarHistorico(email) {
  return ler('ib_historico_' + email, []);
}

// guarda em qual capítulo a pessoa parou. O mais recente fica no começo
export function registrarLeitura(email, livroId, capitulo) {
  let lista = pegarHistorico(email).filter((h) => h.livroId !== livroId);
  lista.unshift({ livroId: livroId, capitulo: capitulo, data: new Date().toISOString() });
  gravar('ib_historico_' + email, lista);
}
