<div align="center">
  <img src="./docs/assets/banner.gif" />
</div>

<br/>

<div align="center">
  <a href="https://vuejs.org/">
    <img alt="VueJS" src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img alt="Typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  </a>
  <a href="https://sass-lang.com/">
    <img alt="SASS" src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">
  </a>
</div>
<div align="center">
  <a href="https://jestjs.io/pt-BR/">
    <img alt="Jest" src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white">
  </a>
  <a href="https://www.docker.com/">
    <img alt="Docker" src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">
  </a>
</div>



<br />

# 💻 Ecommerce SPA Typescript (VUEJS)

Frontend SPA em Vuejs batendo uma Fake API utilizando [json-server]('https://www.npmjs.com/package/json-server')

## 🚀 Setup do Projeto

### Configuração local com docker (Recomendado)

- [Instale o Docker](https://docs.docker.com/get-docker/)
- [Instale o docker-compose](https://docs.docker.com/compose/install/)
- Abra a pasta raíz do projeto no terminal e execute o comando: 
> ```sh
> docker-compose up
> ```
- Acesso a Aplicação: http://localhost:8080
- Acesso a Fake API: http://localhost:3000

### Configuração local sem docker

Requerimentos:
- NodeJS@14.17.0
- Vue2
- Pacotes NPM
  - [json-server]('https://www.npmjs.com/package/json-server')

Após a instalação execute os comandos:
- Para rodar o client:
> ```sh
> npm install && npm run dev
> ```

- Para rodar o server:
> ```sh
> json-server ./api/ranek.json
> ```



