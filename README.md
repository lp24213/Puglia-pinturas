# Puglia Pinturas - Website

Site institucional da Puglia Pinturas, especialistas em pintura residencial, comercial e industrial em Sinop-MT.

## Estrutura do Projeto

```
/
├── frontend/                 # Frontend (HTML/CSS/JS)
│   ├── index.html           # Página principal
│   ├── css/                 # Arquivos CSS
│   │   ├── styles.css       # CSS global
│   │   ├── home.css         # CSS da página home
│   │   ├── sobre.css        # CSS da página sobre
│   │   ├── trabalho.css     # CSS da página trabalho
│   │   ├── contato.css      # CSS da página contato
│   │   └── ...
│   ├── js/                  # Arquivos JavaScript
│   │   ├── app.js           # Aplicação principal
│   │   ├── home.js          # JavaScript da página home
│   │   ├── sobre.js         # JavaScript da página sobre
│   │   └── ...
│   └── images/              # Imagens
└── backend/                 # Backend (Netlify Functions)
    └── functions/           # Funções serverless
        ├── auth.js          # Autenticação admin
        ├── blog.js          # Gerenciamento do blog
        ├── clients.js       # Depoimentos de clientes
        ├── contact.js       # Processamento de contatos
        └── package.json     # Dependências
```

## Funcionalidades

### Frontend
- **SPA (Single Page Application)**: Navegação sem recarregar a página
- **Design Responsivo**: Funciona em desktop e mobile
- **Animações**: Transições suaves e estrelas animadas
- **Formulário de Contato**: Com validação e tipos de serviço
- **Loading Screen**: Com logo animada
- **Páginas**:
  - Home: Hero, serviços em destaque
  - Sobre: História, valores, equipe, informações da empresa
  - Nosso Trabalho: Portfólio de projetos
  - Contato: Formulário e informações de contato
  - Blog: Artigos sobre pintura
  - Clientes: Depoimentos e avaliações

### Backend
- **Autenticação Admin**: Login seguro com JWT
- **Gerenciamento de Blog**: CRUD de posts (apenas admin)
- **Depoimentos de Clientes**: CRUD de testimonials (apenas admin)
- **Processamento de Contatos**: Recebimento de formulários

## Cores da Marca
- **Azul Suede**: `#2C3E50`
- **Dourado**: `#D4AF37`
- **Fundo**: Branco

## Como Usar

### Desenvolvimento Local
1. Abra o arquivo `frontend/index.html` diretamente no navegador
2. Todas as funcionalidades funcionarão localmente

### Deploy
1. **Frontend**: Hospede os arquivos da pasta `frontend/` em qualquer servidor web
2. **Backend**: As funções estão preparadas para Netlify Functions

### Acesso Administrativo
- **Email**: evandoreischavespuglia@gmail.com
- **Senha**: vando@123

## Tecnologias Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Backend**: Node.js, Netlify Functions
- **Autenticação**: JWT
- **Responsividade**: CSS Grid e Flexbox

## Informações da Empresa
- **CNPJ**: 18.225.966/0001-35
- **Proprietários**: Evando Reis Chaves Puglia e Cristina Aparecida Puglia
- **Localização**: Rua dos Cajueiros, 2320 - Jardim Imperial, Sinop-MT
- **Contato**: +55 66 99686-1898
- **Instagram**: @evandoreischavespuglia

## Desenvolvimento
- Arquivos separados por funcionalidade
- Código organizado e comentado
- Estrutura escalável para futuras funcionalidades
