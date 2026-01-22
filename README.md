
# Sistema de Gestão Farmácia Barateira

Projeto Realizado na Universidade por 3 desenvolvedores.

Sistema completo de gestão para farmácias desenvolvido com React, TypeScript, Tailwind CSS e Supabase.

## 📋 Funcionalidades

- **Gestão de Medicamentos**: Cadastro, edição e controle de estoque
- **Vendas**: Registro de vendas com controle de estoque automático
- **Fornecedores**: Gestão completa de fornecedores
- **Promoções**: Sistema de promoções com desconto percentual ou valor fixo
- **Consulta de Preços**: Busca rápida de medicamentos e preços
- **Histórico de Vendas**: Relatórios e histórico completo
- **Estoque por Filial**: Controle de estoque distribuído
- **Autenticação**: Sistema de login seguro

## 🚀 Como Executar o Sistema

### Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 18 ou superior) - [Download aqui](https://nodejs.org/)
- **npm** (geralmente vem com o Node.js)
- **Git** (opcional, para clonar o repositório) - [Download aqui](https://git-scm.com/)

### Passo 1: Obtendo o Código

#### Opção A: Download Direto
1. Baixe o código fonte do projeto
2. Extraia os arquivos em uma pasta de sua escolha

### Passo 2: Instalação das Dependências

Abra o terminal na pasta do projeto e execute:

```bash
# Instalar as dependências
npm install
```

### Passo 3: Executar o Sistema

```bash
# Iniciar o servidor de desenvolvimento
npm run dev
```

O sistema estará disponível em: `http://localhost:8080`

### Passo 4: Primeiro Acesso

#### Credenciais de Teste:
- **Email**: `admin@barateira.com`
- **Senha**: `password`

#### O que você pode fazer após o login:
1. **Cadastrar Medicamentos**: Vá em "Medicamentos" e clique em "Adicionar"
2. **Registrar Vendas**: Acesse "Vendas" e registre uma nova venda
3. **Gerenciar Fornecedores**: Configure seus fornecedores em "Fornecedores"
4. **Criar Promoções**: Configure promoções em "Promoções"
5. **Consultar Preços**: Use a busca rápida em "Consulta de Preços"

## 🗄️ Configuração do Banco de Dados

O sistema usa **Supabase** como backend. As configurações já estão prontas, mas se você quiser conectar seu próprio Supabase:

1. Crie uma conta em [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Execute as migrações SQL que estão na pasta `supabase/migrations/`
4. Atualize as configurações em `src/integrations/supabase/client.ts`

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de interface (shadcn/ui)
│   ├── AppSidebar.tsx  # Menu lateral
│   ├── Header.tsx      # Cabeçalho
│   └── ...
├── pages/              # Páginas do sistema
│   ├── Medicamentos.tsx
│   ├── Vendas.tsx
│   ├── Promocoes.tsx
│   └── ...
├── hooks/              # Hooks customizados para API
├── contexts/           # Contextos React (Auth, etc)
├── types/              # Definições de tipos TypeScript
└── integrations/       # Integrações (Supabase)
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build para produção
npm run build        # Gera versão de produção
npm run preview      # Visualiza versão de produção

# Linting
npm run lint         # Verifica código
```

## 🔧 Personalização

### Adicionando Novos Medicamentos
1. Acesse a página "Medicamentos"
2. Clique em "Adicionar Medicamento"
3. Preencha os dados: nome, categoria, fabricante, preços, etc.
4. Defina estoque mínimo para alertas automáticos

### Configurando Fornecedores
1. Vá em "Fornecedores"
2. Cadastre fornecedores com CNPJ, contato e endereço
3. Vincule medicamentos aos fornecedores

### Criando Promoções
1. Acesse "Promoções"
2. Escolha o medicamento (ou "todos")
3. Defina tipo de desconto: percentual ou valor fixo
4. Configure período de validade

## 🎨 Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL)
- **Build**: Vite
- **Roteamento**: React Router DOM
- **Formulários**: React Hook Form + Zod
- **Ícones**: Lucide React

## 🆘 Problemas Comuns

### O sistema não carrega após npm run dev
- Verifique se a porta 8080 está livre
- Rode `npm install` novamente
- Verifique se o Node.js está na versão correta

### Erro de login
- Use as credenciais: `admin@barateira.com` / `password`
- Verifique sua conexão com internet

### Dados não aparecem
- O sistema usa dados de demonstração
- Cadastre novos dados através das páginas do sistema

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique se seguiu todos os passos corretamente
2. Consulte os logs no terminal onde rodou `npm run dev`
3. Verifique se todas as dependências foram instaladas

## 🚀 Deploy para Produção

### Via Lovable (Mais Fácil)
1. Acesse seu projeto no Lovable
2. Clique em "Publish" no canto superior direito
3. Siga as instruções para publicar

### Deploy Manual
O projeto pode ser deployado em qualquer plataforma que suporte aplicações React:
- Vercel
- Netlify  
- GitHub Pages
- Heroku

Execute `npm run build` e faça upload da pasta `dist/` gerada.

---

## 🎉 Pronto!

Agora você tem um sistema completo de gestão para farmácia rodando. Explore as funcionalidades e personalize conforme suas necessidades!
