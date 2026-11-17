# Ideal Book — Front-end (Fase 3)

Projeto Integrador 2 — IFSP Bragança Paulista
Eloah, Gabriel, Nicollas e Tamyres

## Como rodar

```
npm install
npm run dev
```

## Como o site funciona

A **primeira página é o Cadastro**. Nele a pessoa escolhe se é **Leitor** ou **Escritor**.
Sem conta, só dá para abrir Cadastro, Login, Recuperar senha, Sobre e Contato.

| | Leitor | Escritor |
|---|---|---|
| Biblioteca, busca e leitura | ✅ | ✅ |
| Histórico de leitura e livros salvos | ✅ | ✅ |
| Escrever / editar / publicar livros | ❌ (a área é bloqueada) | ✅ |
| Ver livros de outros autores no editor | — | ❌ (só os próprios livros) |
| Ler rascunhos (livros não publicados) | ❌ | só os próprios |

Os livros escritos pelos usuários ganham uma **capa aleatória** (cores, desenho e posição
sorteados na criação do livro, `src/capas.js`). A capa fica salva no livro e o escritor pode
clicar em "🎲 Sortear outra capa" no editor.

## O que tem (estórias da Sprint #1)

| Estória | Onde está |
|---|---|
| 1. Leitura de livros | `pages/Leitor.jsx` (páginas ou rolagem, tamanho da letra, tela de erro com "Tentar novamente") |
| 2. Escrita de livros | `pages/Escrever.jsx` e `pages/Editor.jsx` |
| 3. Publicação de livros | botão "Publicar livro" em `Editor.jsx` (valida os dados antes) |
| 4. Criação de capítulos | "+ Novo capítulo" em `Editor.jsx` |
| 5. Edição de capítulos | editor de texto em `Editor.jsx` |
| 6. Organização de capítulos | setas ↑ ↓ em `Editor.jsx` (a ordem já é salva) |
| 7. Biblioteca de livros | `pages/Biblioteca.jsx` |
| 8. Busca de livros | campo de busca + filtro de gênero em `Biblioteca.jsx` e na Home |
| 9. Histórico de leitura | `pages/Historico.jsx` (com barra de progresso) |
| 10. Coleção de livros salvos | `pages/Salvos.jsx` + botão salvar nos cards |
| 11. Cadastro de usuário | `pages/Cadastro.jsx` (com escolha leitor/escritor) |
| 12. Login de usuário | `pages/Login.jsx` |
| 13. Recuperação de senha | `pages/RecuperarSenha.jsx` (e-mail simulado) |

## Observações

- Enquanto o back-end não está ligado, os dados (usuários, livros dos escritores,
  histórico e salvos) ficam no `localStorage` do navegador (`src/storage.js`).
  Quando a API estiver pronta, é só trocar as funções desse arquivo.
- As capas dos livros da biblioteca vêm do Open Library pelo ISBN (precisa de internet).
  Se a capa não carregar, aparece uma capa sorteada com o título.
- Os textos dos capítulos dos livros da biblioteca são resumos de demonstração.
- Contas criadas na versão anterior (sem papel) passam a ser tratadas como Leitor.
