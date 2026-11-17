// Livros que já vêm na biblioteca.
// "isbns" é usado pra buscar a capa no Open Library (covers.openlibrary.org).
// Se a capa não carregar, o componente Capa mostra uma capa colorida no lugar.
// Os textos dos capítulos são resumos de demonstração feitos pelo grupo.

const livros = [
  {
    id: 'dom-casmurro',
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    genero: 'Romance',
    isbns: ['9788525406798', '9780195103090'],
    cor: '#6b4b3e',
    sinopse: 'Bentinho, já velho, conta a história do seu amor por Capitu e das dúvidas que mudaram a vida dele.',
    capitulos: [
      {
        titulo: 'Do título',
        texto: 'O narrador explica como ganhou o apelido de Dom Casmurro: um vizinho, irritado com o silêncio dele no trem, passou a chamá-lo assim. Ele resolve aceitar o nome e usá-lo como título do livro.\n\nNesse começo já dá para ver que Bentinho vai contar tudo do jeito dele, e que nem sempre vamos poder confiar no que ele diz.',
      },
      {
        titulo: 'Capitu',
        texto: 'Bentinho cresce em Matacavalos, no Rio de Janeiro, ao lado da vizinha Capitu, menina esperta e de olhos que ele nunca esquece. Os dois ficam cada vez mais próximos.\n\nO problema é que a mãe dele, dona Glória, fez uma promessa: Bentinho iria para o seminário e se tornaria padre.',
      },
      {
        titulo: 'O seminário',
        texto: 'Com a ajuda do amigo Escobar, Bentinho tenta achar um jeito de escapar da promessa da mãe. Ao mesmo tempo, o amor por Capitu só cresce.\n\nNo fim ele consegue voltar para o mundo e casa com Capitu. A pergunta que o livro deixa é: ela traiu ou foi só ciúme dele?',
      },
    ],
  },
  {
    id: 'pequeno-principe',
    titulo: 'O Pequeno Príncipe',
    autor: 'Antoine de Saint-Exupéry',
    genero: 'Fantasia',
    isbns: ['9780156012195', '9788522008731'],
    cor: '#2f6f8f',
    sinopse: 'Um piloto perdido no deserto conhece um menino de outro planeta que fala sobre amizade, amor e o que realmente importa.',
    capitulos: [
      {
        titulo: 'O piloto e o desenho',
        texto: 'O narrador conta que, quando era criança, desenhou uma jiboia que tinha engolido um elefante. Os adultos só viam um chapéu e disseram para ele deixar os desenhos de lado.\n\nAnos depois, o avião dele cai no deserto do Saara e é lá que ele conhece um menino de cabelos dourados.',
      },
      {
        titulo: 'A rosa',
        texto: 'O pequeno príncipe vem de um planeta minúsculo, onde cuida de três vulcões e de uma rosa vaidosa. Ele gosta muito dela, mas se cansa do jeito exigente da flor e resolve viajar.\n\nDepois de conhecer vários planetas, percebe que sentia falta justamente da sua rosa.',
      },
      {
        titulo: 'A raposa',
        texto: 'Na Terra, o príncipe encontra uma raposa que pede para ser cativada. Ela explica que cativar é criar laços, e que por isso a rosa dele é única no mundo.\n\nA raposa se despede com um segredo: o essencial é invisível aos olhos.',
      },
    ],
  },
  {
    id: 'harry-potter',
    titulo: 'Harry Potter e a Pedra Filosofal',
    autor: 'J. K. Rowling',
    genero: 'Fantasia',
    isbns: ['9780590353427', '9788532511010'],
    cor: '#7a1f2b',
    sinopse: 'Harry descobre aos onze anos que é bruxo e vai estudar em Hogwarts, onde faz amigos e enfrenta um grande mistério.',
    capitulos: [
      {
        titulo: 'O menino que sobreviveu',
        texto: 'Harry vive com os tios, que o tratam mal e escondem a verdade sobre os pais dele. Ele dorme no armário embaixo da escada e não entende por que coisas estranhas acontecem perto dele.',
      },
      {
        titulo: 'As cartas misteriosas',
        texto: 'Cartas começam a chegar para Harry de todos os jeitos, mas o tio Válter não deixa ele ler nenhuma. No aniversário de onze anos, um gigante chamado Hagrid aparece e conta que Harry é um bruxo.',
      },
      {
        titulo: 'Hogwarts',
        texto: 'Harry compra seus materiais no Beco Diagonal e embarca na plataforma nove e três quartos. No trem ele conhece Rony e Hermione, que viram seus melhores amigos na escola de magia.',
      },
    ],
  },
  {
    id: '1984',
    titulo: '1984',
    autor: 'George Orwell',
    genero: 'Ficção',
    isbns: ['9780451524935'],
    cor: '#9c2a2a',
    sinopse: 'Em um país vigiado o tempo todo pelo Grande Irmão, Winston tenta guardar um pouco de liberdade e pensamento próprio.',
    capitulos: [
      {
        titulo: 'O Grande Irmão',
        texto: 'Winston Smith mora em Londres, numa sociedade controlada pelo Partido. Cartazes com o rosto do Grande Irmão estão em todo lugar, e as teletelas observam cada movimento das pessoas.',
      },
      {
        titulo: 'O diário',
        texto: 'Mesmo sabendo que é perigoso, Winston começa a escrever um diário escondido. Pensar diferente do Partido é considerado um crime, o chamado crime de pensamento.',
      },
      {
        titulo: 'Júlia',
        texto: 'Winston conhece Júlia, que também é contra o sistema. Os dois começam a se encontrar escondidos, mas nunca sabem se alguém está de olho neles.',
      },
    ],
  },
  {
    id: 'hobbit',
    titulo: 'O Hobbit',
    autor: 'J. R. R. Tolkien',
    genero: 'Fantasia',
    isbns: ['9780547928227', '9780261102217'],
    cor: '#3f6b3a',
    sinopse: 'Bilbo Bolseiro, um hobbit tranquilo, é convidado a ajudar treze anões a recuperar um tesouro guardado por um dragão.',
    capitulos: [
      {
        titulo: 'Uma festa inesperada',
        texto: 'Bilbo gosta de uma vida calma na sua toca, até o mago Gandalf aparecer com treze anões famintos. Eles querem que Bilbo seja o "ladrão" da expedição.',
      },
      {
        titulo: 'O caminho até a montanha',
        texto: 'O grupo atravessa montanhas, enfrenta trolls e se perde no escuro. Em uma caverna, Bilbo encontra um anel e conhece Gollum, numa disputa de adivinhações.',
      },
      {
        titulo: 'O dragão',
        texto: 'Ao chegar à Montanha Solitária, Bilbo precisa entrar sozinho na caverna onde dorme o dragão Smaug. É a hora em que ele descobre que é mais corajoso do que imaginava.',
      },
    ],
  },
  {
    id: 'orgulho-preconceito',
    titulo: 'Orgulho e Preconceito',
    autor: 'Jane Austen',
    genero: 'Romance',
    isbns: ['9780141439518'],
    cor: '#b0577a',
    sinopse: 'Elizabeth Bennet e o orgulhoso Sr. Darcy precisam superar as primeiras impressões para entender o que sentem.',
    capitulos: [
      {
        titulo: 'Um novo vizinho',
        texto: 'A família Bennet fica animada com a chegada de um rapaz rico e solteiro à vizinhança. A mãe das cinco filhas só pensa em casá-las bem.',
      },
      {
        titulo: 'O baile',
        texto: 'No baile, Elizabeth ouve o Sr. Darcy falar mal dela e fica muito ofendida. Ele parece arrogante, e ela decide que não gosta dele.',
      },
      {
        titulo: 'A carta',
        texto: 'Depois de muitos mal-entendidos, Darcy escreve uma carta explicando seus atos. Elizabeth percebe que também errou nos julgamentos que fez.',
      },
    ],
  },
  {
    id: 'gatsby',
    titulo: 'O Grande Gatsby',
    autor: 'F. Scott Fitzgerald',
    genero: 'Romance',
    isbns: ['9780743273565'],
    cor: '#c9a227',
    sinopse: 'Nick conhece o misterioso milionário Gatsby, que dá festas enormes esperando reencontrar um antigo amor.',
    capitulos: [
      {
        titulo: 'O novo vizinho',
        texto: 'Nick Carraway se muda para Nova York em 1922 e aluga uma casa ao lado de uma mansão enorme. Toda noite acontecem festas lá, mas ninguém sabe direito quem é o dono.',
      },
      {
        titulo: 'As festas',
        texto: 'Nick é convidado para uma das festas e finalmente conhece Jay Gatsby. Aos poucos ele descobre que Gatsby faz tudo isso por causa de Daisy, prima de Nick.',
      },
      {
        titulo: 'A luz verde',
        texto: 'Do outro lado da baía, uma luz verde marca a casa de Daisy. Para Gatsby ela representa um passado que ele quer muito recuperar.',
      },
    ],
  },
  {
    id: 'sol-para-todos',
    titulo: 'O Sol é para Todos',
    autor: 'Harper Lee',
    genero: 'Drama',
    isbns: ['9780061120084'],
    cor: '#546a7b',
    sinopse: 'Scout cresce numa cidadezinha do sul dos Estados Unidos enquanto o pai, um advogado, defende um homem injustamente acusado.',
    capitulos: [
      {
        titulo: 'Verão em Maycomb',
        texto: 'Scout, o irmão Jem e o amigo Dill passam as férias tentando fazer o vizinho misterioso, Boo Radley, aparecer. A cidade é pequena e todo mundo conhece a vida de todo mundo.',
      },
      {
        titulo: 'O caso',
        texto: 'O pai de Scout, Atticus Finch, aceita defender Tom Robinson, um homem negro acusado de um crime que não cometeu. A cidade inteira passa a falar da família.',
      },
      {
        titulo: 'O julgamento',
        texto: 'Mesmo com as provas a favor de Tom, o preconceito pesa mais. Scout aprende com o pai que coragem é continuar fazendo o que é certo mesmo sabendo que vai perder.',
      },
    ],
  },
  {
    id: 'alquimista',
    titulo: 'O Alquimista',
    autor: 'Paulo Coelho',
    genero: 'Aventura',
    isbns: ['9780062315007', '9788576653721'],
    cor: '#d08a2e',
    sinopse: 'O pastor Santiago sai da Espanha em busca de um tesouro nas pirâmides do Egito e aprende muito pelo caminho.',
    capitulos: [
      {
        titulo: 'O sonho',
        texto: 'Santiago é um jovem pastor andaluz que tem sempre o mesmo sonho: um tesouro escondido perto das pirâmides. Uma cigana e um velho rei dizem a ele para seguir esse sonho.',
      },
      {
        titulo: 'O deserto',
        texto: 'Depois de ser roubado em Tânger, Santiago trabalha numa loja de cristais e junta dinheiro. Ele então se junta a uma caravana que atravessa o deserto do Saara.',
      },
      {
        titulo: 'A Lenda Pessoal',
        texto: 'No oásis, Santiago conhece Fátima e o alquimista, que ensina a ele a ouvir o próprio coração. A viagem passa a ser mais importante do que o tesouro.',
      },
    ],
  },
  {
    id: 'frankenstein',
    titulo: 'Frankenstein',
    autor: 'Mary Shelley',
    genero: 'Terror',
    isbns: ['9780141439471'],
    cor: '#3e4c3a',
    sinopse: 'O cientista Victor Frankenstein dá vida a uma criatura e depois foge da própria criação.',
    capitulos: [
      {
        titulo: 'As cartas do capitão',
        texto: 'Um capitão de navio escreve cartas para a irmã contando sua viagem ao Polo Norte. No meio do gelo, ele encontra um homem muito doente: Victor Frankenstein.',
      },
      {
        titulo: 'A criação',
        texto: 'Victor conta que estudava ciência obsessivamente e conseguiu dar vida a um corpo montado com partes de outros corpos. Quando vê o resultado, ele se assusta e abandona a criatura.',
      },
      {
        titulo: 'A criatura',
        texto: 'Sozinha e rejeitada por todos, a criatura aprende a falar e a ler escondida. Ela exige que o criador assuma a responsabilidade pelo que fez.',
      },
    ],
  },
  {
    id: 'dracula',
    titulo: 'Drácula',
    autor: 'Bram Stoker',
    genero: 'Terror',
    isbns: ['9780141439846'],
    cor: '#5a1a1a',
    sinopse: 'O advogado Jonathan Harker viaja até um castelo na Transilvânia e descobre que o conde que o recebeu esconde um segredo sombrio.',
    capitulos: [
      {
        titulo: 'O diário de Jonathan',
        texto: 'Jonathan Harker viaja para a Transilvânia para fechar um negócio de imóveis com o Conde Drácula. Os moradores da região ficam assustados quando ouvem o nome do castelo.',
      },
      {
        titulo: 'O castelo',
        texto: 'Aos poucos Jonathan percebe que está preso no castelo. O conde só aparece à noite e nunca come na frente dele.',
      },
      {
        titulo: 'A chegada a Londres',
        texto: 'Drácula embarca num navio rumo à Inglaterra. Quando o barco chega, só o capitão morto está a bordo, amarrado ao leme.',
      },
    ],
  },
  {
    id: 'alice',
    titulo: 'Alice no País das Maravilhas',
    autor: 'Lewis Carroll',
    genero: 'Fantasia',
    isbns: ['9780141439761'],
    cor: '#3a7ca5',
    sinopse: 'Alice persegue um coelho de colete e cai num mundo onde nada faz muito sentido.',
    capitulos: [
      {
        titulo: 'Pela toca do coelho',
        texto: 'Alice está entediada ao lado da irmã quando vê um coelho branco que consulta um relógio. Ela corre atrás dele e cai por uma toca muito, muito funda.',
      },
      {
        titulo: 'O chá maluco',
        texto: 'Alice chega a uma mesa enorme onde o Chapeleiro Maluco e a Lebre de Março tomam chá o dia todo. Eles fazem perguntas sem resposta e mudam de lugar o tempo inteiro.',
      },
      {
        titulo: 'A Rainha de Copas',
        texto: 'Na corte da Rainha de Copas, qualquer um que a contrarie é condenado a perder a cabeça. Alice acaba enfrentando a rainha e acorda de repente do sonho.',
      },
    ],
  },
  {
    id: 'jogos-vorazes',
    titulo: 'Jogos Vorazes',
    autor: 'Suzanne Collins',
    genero: 'Ficção',
    isbns: ['9780439023528'],
    cor: '#c4552d',
    sinopse: 'Katniss se oferece no lugar da irmã para participar de um jogo mortal transmitido para todo o país.',
    capitulos: [
      {
        titulo: 'O Distrito 12',
        texto: 'Katniss Everdeen mora num distrito pobre e caça escondida para alimentar a mãe e a irmã Prim. Na manhã do sorteio anual dos Jogos Vorazes, o nome sorteado é o de Prim.',
      },
      {
        titulo: 'A voluntária',
        texto: 'Katniss grita que se oferece no lugar da irmã. Ela e Peeta, o outro escolhido do distrito, seguem de trem para a Capital.',
      },
      {
        titulo: 'A arena',
        texto: 'Na arena, vinte e quatro jovens precisam lutar até sobrar só um. Katniss usa o que aprendeu na caça para tentar sobreviver.',
      },
    ],
  },
  {
    id: 'duna',
    titulo: 'Duna',
    autor: 'Frank Herbert',
    genero: 'Ficção',
    isbns: ['9780441172719'],
    cor: '#b5803d',
    sinopse: 'A família Atreides recebe o controle do planeta deserto Arrakis, a única fonte da especiaria mais valiosa do universo.',
    capitulos: [
      {
        titulo: 'A viagem para Arrakis',
        texto: 'O jovem Paul Atreides se prepara para deixar o planeta onde nasceu. Seu pai, o duque Leto, foi escolhido para governar Arrakis, um planeta cheio de perigos.',
      },
      {
        titulo: 'A especiaria',
        texto: 'Em Arrakis existe a especiaria, que permite viajar pelo espaço e prolonga a vida. Muita gente poderosa está disposta a tudo para controlá-la.',
      },
      {
        titulo: 'Os Fremen',
        texto: 'Depois de uma traição, Paul e a mãe fogem para o deserto e são acolhidos pelos Fremen, o povo que sabe sobreviver ali. Paul começa a ter visões do futuro.',
      },
    ],
  },
  {
    id: 'sapiens',
    titulo: 'Sapiens',
    autor: 'Yuval Noah Harari',
    genero: 'Não ficção',
    isbns: ['9780062316110'],
    cor: '#4a6fa5',
    sinopse: 'Uma história resumida da humanidade, desde os primeiros humanos até o mundo de hoje.',
    capitulos: [
      {
        titulo: 'Um animal sem importância',
        texto: 'O livro começa lembrando que o Homo sapiens foi só uma entre várias espécies humanas que viveram na Terra. Por muito tempo, ele não era o mais forte nem o mais numeroso.',
      },
      {
        titulo: 'A revolução cognitiva',
        texto: 'Por volta de setenta mil anos atrás, os sapiens passaram a usar a linguagem para falar de coisas que não existem, como deuses e nações. Isso ajudou grupos grandes a cooperar.',
      },
      {
        titulo: 'A revolução agrícola',
        texto: 'Ao começar a plantar e criar animais, os humanos passaram a viver em lugares fixos. O autor discute se essa mudança realmente melhorou a vida de todo mundo.',
      },
    ],
  },
  {
    id: 'diario-anne-frank',
    titulo: 'O Diário de Anne Frank',
    autor: 'Anne Frank',
    genero: 'Biografia',
    isbns: ['9780553296983'],
    cor: '#8a7f5c',
    sinopse: 'O diário de uma menina judia que ficou escondida por dois anos durante a Segunda Guerra Mundial.',
    capitulos: [
      {
        titulo: 'O presente de aniversário',
        texto: 'Anne ganha um diário no aniversário de treze anos e decide tratá-lo como uma amiga. Ela escreve sobre a escola, os colegas e as regras cada vez mais duras impostas aos judeus.',
      },
      {
        titulo: 'O Anexo secreto',
        texto: 'Em 1942, a família Frank se muda para um esconderijo atrás do escritório do pai. Ali vivem escondidas oito pessoas, que precisam ficar em silêncio durante o dia.',
      },
      {
        titulo: 'Os dias escondida',
        texto: 'Anne escreve sobre o medo, as brigas pequenas e os sonhos de ser escritora. Mesmo no esconderijo, ela continua acreditando que as pessoas são boas.',
      },
    ],
  },
];

export default livros;
