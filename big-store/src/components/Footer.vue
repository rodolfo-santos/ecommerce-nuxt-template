<template>
  <footer class="mt-15">
    <div class="notas-site">
      <v-container class="d-flex justify-space-between">
        <div class="bloco-notas localizacao justify-start">
          <img src="@/assets/icons/localizacao.svg" alt="Icone Localização">
          <span> São José dos Campos - SP</span>
        </div>
        <div class="bloco-notas entrega"> 
          <img src="@/assets/icons/brasil.svg" alt="Icone Brasil"> 
          <span> Entrega para todo o país  </span>
        </div>
        <div class="bloco-notas pagamento"> 
          <img src="@/assets/icons/mercado-pago.svg" alt="Icone Mercado Pago"> 
          <span> Mercado Pago </span>
        </div>
        <div class="bloco-notas bandeiras justify-end"> 
          <img src="@/assets/icons/visa.svg" alt="Icone Mercado Pago"> 
          <img src="@/assets/icons/mastercard.svg" alt="Icone Mercado Pago"> 
          <img src="@/assets/icons/hipercard.svg" alt="Icone Mercado Pago"> 
          <img src="@/assets/icons/american-express.svg" alt="Icone Mercado Pago"> 
          <img src="@/assets/icons/elo.svg" alt="Icone Mercado Pago"> 
        </div>

      </v-container>
    </div>
    <div class="rodape-principal">
      <v-container>
      <v-row>
        <v-col class="col-6 pr-10">
           <v-row class="logo">
             <img src="@/assets/logo/logo.svg" alt="Logotipo Big Store">
             <div class="bar-div"></div>
           </v-row>
           <v-row class="contato mt-4 flex-column">
             <div><span class="rotulo"> Endereço: </span> Av. Adhemar de Barros, 000, Vila Adyana, São José dos Campos/SP - 12241-040 </div>
             <div><span class="rotulo">Contato: </span> (12) 98227-9588 / (12) 982050-5060</div>
             <div><span class="rotulo">E-mail: </span> contato@bigstore.com.br</div>
           </v-row>
           <v-row class="newsletter mt-3">
             <div class="campo">
                <input type="text" placeholder="Assine nossa Newsletter, digite seu melhor e-mail.">
                <v-btn>Assinar</v-btn>
             </div>
           </v-row>
        </v-col>
        <v-col class="col-3 column-border px-10">
          <h4>Principais Produtos</h4>
          <ul>
            <li>Masculino</li>
            <li>Masculino</li>
            <li>Masculino</li>
            <li>Masculino</li>
            <li>Masculino</li>
            <li>Masculino</li>
            <li>Masculino</li>          </ul>
        </v-col>
        <v-col class="col-3 column-border px-10">
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
          <a href="https://www.instagram.com/rodolfo.d.santos/" target="_blank"><v-icon class="icon mr-4">mdi-instagram</v-icon></a>
          <a href="https://www.facebook.com/Facemeu/" target="_blank"><v-icon class="icon mr-4">mdi-facebook</v-icon></a>
          <a href="https://www.linkedin.com/in/rodolfosantos29/" target="_blank"><v-icon class="icon mr-4">mdi-linkedin</v-icon></a>
        </div>
        <div class="copyright">Copyright 2020 - Todos os Direitos Reservados</div>
        <div class="desenvolvedor"><a href="https://rodolfo-santos.com/" target="_blank">Powered by Rodolfo Santos</a></div>
      </v-container>
    </div>
  </footer>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
@import '@/sass/variaveis';

.redes-sociais {
  .icon {
    transition: .25s;
    &:hover {
      color: $primary;
    }
  }
}




h4 {
  font-size: 1.1em;
  margin-bottom: 10px;
}


footer {
  font-size: .9em;
}

.newsletter {

  .campo {
    width: 100%;
    background: $primary;
    border-radius: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 40px;

    input {
      width: 80%;
      height: 100%;
      padding-left: 25px;

      &:focus{
        outline: none;
      }

      &::-webkit-input-placeholder {
        color: #fff;
      }

      &:-moz-placeholder { /* Firefox 18- */
        color: #fff;  
      }

      &::-moz-placeholder {  /* Firefox 19+ */
        color: #fff;  
      }

      &:-ms-input-placeholder {  
        color: #fff;  
      }
    }

    button {
      width: 20%;
      height: 100%;
      border-radius: 50px;
      background-color: lighten($primary, 10%)!important;

      &:focus{
        outline: none;
      }

    }
  }
}

.rotulo {
  font-weight: bold;
}


.logo {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.bar-div {
  height: 2px;
  width: 50px;
  margin-top: 10px;
  background-color: #fff;
}

.notas-site {
  background: darken($secondary, 10%);

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


.rodape-principal {
  background-color: darken($secondary, 10%);
  padding: 40px 0;
}

.rodape-inferior {
  border-top: $primary 1px solid;
  background: darken($secondary, 10%);
}

.column-border {
  border-left: solid #fff 1px;
}

.desenvolvedor a {
  color: #fff;
  transition: .25s;
  &:hover {
    color: $primary;
  }
}

</style>