<div align="center">
  <img src="./docs/assets/banner.gif" />
</div>

<br/>

<div align="center">
  <a href="https://vuejs.org/">
    <img alt="VueJS" src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D">
  </a>
  <a href="https://www.mysql.com/">
    <img alt="Javascript" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
  </a>
  <a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML">
    <img alt="HTML" src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white">
  </a>
</div>
<div align="center">
  <a href="https://developer.mozilla.org/pt-BR/docs/Web/CSS">
    <img alt="CSS" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  </a>
  <a href="https://www.docker.com/">
    <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">
  </a>
</div>



<br />

# 💻 Ecommerce MVP (VUEJS)

CRUD de produtos em Vuejs e uma Fake API utilizando [json-server]('https://www.npmjs.com/package/json-server')

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



