<template>
  <footer class="mt-15">
    <div class="notas-site">
      <v-container class="d-none d-md-flex justify-space-between">
        <div class="bloco-notas localizacao justify-start">
          <img src="~/static/images/icons/localizacao.svg" alt="Ícone Localização" />
          <span> São José dos Campos - SP</span>
        </div>
        <div class="bloco-notas entrega">
          <img src="~/static/images/icons/brasil.svg" alt="Ícone Brasil" />
          <span> Entrega para todo o país </span>
        </div>
        <div class="bloco-notas pagamento">
          <img src="~/static/images/icons/mercado-pago.svg" alt="Ícone Mercado Pago" />
          <span> Mercado Pago </span>
        </div>
        <div class="bloco-notas bandeiras justify-end">
          <img src="~/static/images/icons/visa.svg" alt="Ícone Mercado Pago" />
          <img src="~/static/images/icons/mastercard.svg" alt="Ícone Mercado Pago" />
          <img src="~/static/images/icons/hipercard.svg" alt="Ícone Mercado Pago" />
          <img src="~/static/images/icons/american-express.svg" alt="Ícone Mercado Pago" />
          <img src="~/static/images/icons/elo.svg" alt="Ícone Mercado Pago" />
        </div>
      </v-container>
    </div>
    <div class="rodape-principal">
      <v-container>
        <v-row class="px-3">
          <v-col class="col-12 col-md-6 pr-md-10">
            <v-row class="logo">
              <div>
                <img src="~/static/images/logo/logo.svg" alt="Logotipo Big Store" />
                <div class="bar-div"></div>
              </div>
            </v-row>
            <v-row class="contato mt-4">
              <div>
                <span class="rotulo"> Endereço: </span> Av. Adhemar de Barros, 000, Vila Adyana, São José dos Campos/SP
                - 12241-040
              </div>
              <div><span class="rotulo">Contato: </span> (12) 98227-9588 / (12) 982050-5060</div>
              <div><span class="rotulo">E-mail: </span> contato@bigstore.com.br</div>
            </v-row>
            <v-row class="newsletter mt-3 d-none d-md-block">
              <div class="campo">
                <input type="text" placeholder="Assine nossa Newsletter, digite seu melhor e-mail." />
                <v-btn>Assinar</v-btn>
              </div>
            </v-row>
          </v-col>
          <v-col class="col-md-3 d-none d-md-block column-border px-10">
            <h4>Principais products</h4>
            <ul>
              <li>Masculino</li>
              <li>Masculino</li>
              <li>Masculino</li>
              <li>Masculino</li>
              <li>Masculino</li>
              <li>Masculino</li>
              <li>Masculino</li>
            </ul>
          </v-col>
          <v-col class="col-md-3 d-none d-md-block column-border px-10">
            <h4>Categorias</h4>
            <ul>
              <li>Masculino</li>
              <li>Masculino</li>
              <li>Masculino</li>
              <li>Masculino</li>
              <li>Masculino</li>
              <li>Masculino</li>
              <li>Masculino</li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="rodape-inferior">
      <v-container class="d-flex justify-space-between">
        <div class="redes-sociais">
          <a href="https://www.instagram.com/rodolfo.d.santos/" target="_blank"
            ><v-icon class="icon mr-4">mdi-instagram</v-icon></a
          >
          <a href="https://www.facebook.com/Facemeu/" target="_blank"
            ><v-icon class="icon mr-4">mdi-facebook</v-icon></a
          >
          <a href="https://www.linkedin.com/in/rodolfosantos29/" target="_blank"
            ><v-icon class="icon mr-4">mdi-linkedin</v-icon></a
          >
        </div>
        <div class="copyright">Copyright 2020 - Todos os Direitos Reservados</div>
        <div class="desenvolvedor">
          <a href="https://rodolfo-santos.com/" target="_blank">Powered by Rodolfo Santos</a>
        </div>
      </v-container>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
h4 {
  font-size: 1.1em;
  margin-bottom: 10px;
}

footer {
  font-size: 0.9em;
}

.logo {
  > div {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    @media (max-width: $bk-md) {
      align-items: center;
    }
  }

  @media (max-width: $bk-md) {
    display: flex !important;
    justify-content: center;
  }
}

.contato {
  @media (max-width: $bk-md) {
    text-align: center;
    justify-content: center;
  }
}

.newsletter {
  max-width: 700px;
}

.campo {
  width: 100%;
  background: darken($primary, 10%);
  border-radius: 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;

  input {
    width: 80%;
    height: 100%;
    padding-left: 25px;
    color: #fff;

    &:focus {
      outline: none;
    }

    &::-webkit-input-placeholder {
      color: rgba(#fff, 0.7);
    }

    &:-moz-placeholder {
      /* Firefox 18- */
      color: rgba(#fff, 0.7);
    }

    &::-moz-placeholder {
      /* Firefox 19+ */
      color: rgba(#fff, 0.7);
    }

    &:-ms-input-placeholder {
      color: rgba(#fff, 0.7);
    }
  }

  button {
    width: 20%;
    height: 100%;
    border-radius: 50px;
    background-color: lighten($primary, 10%) !important;

    &:focus {
      outline: none;
    }
  }
}

.rodape-principal {
  background-color: darken($secondary, 2%);
  padding: 40px 0;
}

.rodape-inferior {
  border-top: $secondary 1px solid;
  background: darken($secondary, 2%);

  .container {
    @media (max-width: $bk-md) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}

.column-border {
  border-left: solid #fff 1px;
}

.rotulo {
  font-weight: bold;
}

.bar-div {
  height: 2px;
  width: 50px;
  margin-top: 10px;
  background-color: #fff;
}

.notas-site {
  background: darken($secondary, 4%);

  .bloco-notas {
    min-width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    margin-right: 10px;
  }
}

.desenvolvedor a {
  color: #fff;
  transition: 0.25s;
  &:hover {
    color: $primary;
  }
}

.redes-sociais {
  .icon {
    transition: 0.25s;
    &:hover {
      color: $primary;
    }
  }
}
</style>
