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

SPA Vue Frontend using a [Json-Server Fake API]('https://www.npmjs.com/package/json-server')

## 🚀 Project Setup

### Local configuration with docker (recommended)

- [Install docker](https://docs.docker.com/get-docker/)
- [Install docker-compose](https://docs.docker.com/compose/install/)
- Open the root project folder at terminal and execute:
> ```sh
> npm run dev
> ```
- Application access: http://localhost:8080
- Fake API access: http://localhost:3000

### Local configuration without docker

Requirements:
- NodeJS@14.17.0
- Vue2
- NPM packages
  - [json-server]('https://www.npmjs.com/package/json-server')

After installation, execute:
- Run client:
> ```sh
> npm install && npm run dev
> ```

- Run server📝:
> ```sh
> json-server ./api/bigstore.json
> ```



