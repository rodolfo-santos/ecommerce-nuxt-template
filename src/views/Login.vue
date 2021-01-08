<template>
  <v-main>
    <SubHeader titulo="Login" :breadCrumbs="breadCrumbs" />
    <v-container>
      <div max-width="1000px" class="bloco-login mx-auto mt-16">
        <h1 class="mb-5 text-muted">
          <span @click="criarConta = false" :class="{ active: !criarConta }"> Entrar </span>
          <div class="mx-5">|</div>
          <span @click="criarConta = true" :class="{ active: criarConta }"> Cadastrar </span>
        </h1>
        <div v-show="!criarConta">
          <v-form @submit.prevent="submit" v-model="validLogin">
            <v-text-field v-model="login.email" label="E-mail" ref="campoDeFoco" :rules="rules.required" required></v-text-field>
            <v-text-field v-model="login.senha" label="Senha" :rules="rules.required" type="password" required></v-text-field>
            <v-checkbox v-model="login.manterConectado" value="true" label="Mantenha Conectado" type="checkbox"></v-checkbox>

            <div class="flex-center mt-4">
              <v-btn class="btn-login pa-6" type="submit" :disabled="!validLogin"> Login </v-btn>
            </div>
            <p class="text-center mt-4">Perdeu a senha? <router-link to="/">Clique aqui para recuperar.</router-link></p>
          </v-form>
        </div>
        <div v-show="criarConta">
          <UsuarioForm>
            <!-- <v-btn class="btn-login pa-6" type="submit" @click.prevent="criarUsuario" :disabled="!valido">
                Cadastrar
              </v-btn> -->
            Cadastrar
          </UsuarioForm>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { required, digits, email, max, regex } from 'vee-validate/dist/rules';
import { mapState } from 'vuex';

import SubHeader from '@/components/SubHeader.vue';
import UsuarioForm from '@/components/Usuario/UsuarioForm.vue';

import LoginModel from '@/models/Login';

@Component({
  components: {
    SubHeader,
    UsuarioForm,
  },
  computed: mapState(['rules']),
})
export default class Login extends Vue {
  private validLogin: boolean = false;
  private login: LoginModel = {
    email: '',
    senha: '',
    manterConectado: false,
  };

  private breadCrumbs: object = [
    {
      text: 'Home',
      disabled: false,
      href: '/',
    },
    {
      text: 'Login',
      disabled: true,
      href: '/login',
    },
  ];

  private criarConta: boolean = false;

  private logar(): void {
    this.$store.dispatch('getUsuario', this.login.email);
    // this.$router.push({ name: 'usuario' });
  }
}
</script>

<style lang="scss" scoped>
@import '@/sass/custom.scss';

.bloco-login {
  width: 100%;
  transition: 0.25s;
  box-sizing: border-box;
}

.btn-login {
  width: 100%;
  max-width: 300px !important;
  background-color: darken($primary, 10%) !important;
}

form {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  display: flex;
  justify-content: center;
  max-width: 400px;
  margin: auto;

  span {
    cursor: pointer;
    transition: 0.25s;
    &:hover {
      color: #fff;
    }
  }
}

.active {
  color: $primary;
}
</style>
