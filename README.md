# 💱 Conversor de Moedas React

> **Projeto demonstrativo de habilidades**, desenvolvido em 2 dias apenas, com foco em React, consumo de API, responsividade e dark mode.

Projeto de conversor de moedas desenvolvido com React, utilizando React Router para navegação, Tailwind CSS para estilização e responsividade. O app consome uma API externa para obter taxas de câmbio atualizadas.

---

## 🛠️ Tecnologias Utilizadas

- ⚛️ **React** (com React Router para rotas e navegação)
- 🎨 **Tailwind CSS** para estilo e design responsivo
- 🌐 **Fetch API** para consumo de dados externos
- 🔐 Arquivo `.env` para armazenamento seguro da chave da API
- 🧩 Arquitetura modular com services para separação das requisições
- 📘 **TypeScript** (se aplicável) para tipagem estática
- 🌙 Dark Mode com toggle e persistência da preferência no `localStorage`

---

## 🚀 Funcionalidades

- Conversão entre 6 moedas disponíveis:
  - Real (BRL)
  - Dólar (USD)
  - Euro (EUR)
  - Peso Argentino (ARS)
  - Iene Japonês (JPY)
  - Franco Suíço (CHF)
- Consumo de API externa para obtenção das taxas de câmbio atualizadas
- Utilização de `fetch` para requisições HTTP separadas em service dedicado
- Armazenamento da chave da API em variável de ambiente para segurança
- Componentização clara e reutilizável dos campos de conversão
- Responsividade avançada para desktop, tablets e dispositivos mobile
- Toggle de modo escuro (dark mode) integrado
- Persistência da escolha do usuário para modo claro/escuro usando `localStorage`
- Otimização da performance e experiência do usuário

---

## 📦 Como rodar o projeto localmente

1. Clone o repositório
   ```bash
   git clone https://github.com/seu-usuario/conversor-moedas-react.git
   ```

2.Instale as dependências

```
  npm install # ou
  yarn install
```

3.Crie um arquivo .env na raiz do projeto com a chave da API:

```
  VITE_EXCHANGE_RATE_API_KEY=SUA_CHAVE_AQUI
```

4.Rode o projeto

```
  npm run dev # ou
  yarn dev
```

5.Acesse no navegador:

```
  http://localhost:5173 (ou a porta indicada pelo terminal)
```

---

## 💡 Considerações Finais

Este projeto serve como base para apps de conversão e exemplos práticos com React, mostrando boas práticas como:

Separação clara de responsabilidades

Uso de variáveis de ambiente para segredos

Componentização e hooks customizados

Estilização responsiva com Tailwind

Consumo de API de forma assíncrona e segura

Suporte a dark mode com persistência da preferência do usuário

Por ser um projeto feito em 2 dias, seu objetivo principal é demonstrar habilidades técnicas e boas práticas.
