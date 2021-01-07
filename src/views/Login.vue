<template>
  <v-main>
    <SubHeader titulo="Login" :breadCrumbs="breadCrumbs" />
    <v-container>
      <div max-width="1000px" class="bloco-login mx-auto mt-16">
        <h1 class="mb-5 text-muted">
          <span @click="criarConta = false" :class="{ active: !criarConta }"> Entrar </span>
          <span> | </span>
          <span @click="criarConta = true" :class="{ active: criarConta }"> Cadastrar </span>
        </h1>
        <transition name="fade" mode="out-in">
          <div v-if="!criarConta">
            <v-form @submit.prevent="submit" v-model="validLogin">
              <v-text-field v-model="login.email" label="E-mail" ref="campoDeFoco" :rules="regras.obrigatorio" required></v-text-field>
              <v-text-field v-model="login.senha" label="Senha" :rules="regras.obrigatorio" type="password" required></v-text-field>
              <v-checkbox v-model="login.manterConectado" value="true" label="Mantenha Conectado" type="checkbox"></v-checkbox>

              <div class="flex-center mt-4">
                <v-btn class="btn-login pa-6" type="submit" :disabled="!validLogin"> Login </v-btn>
              </div>
              <p class="text-center mt-4">Perdeu a senha? <router-link to="/">Clique aqui para recuperar.</router-link></p>
            </v-form>
          </div>
          <div v-else>
            <v-form @submit.prevent="submit" v-model="validCadastro">
              <v-text-field
                v-model="cadastro.nome"
                :rules="regras.obrigatorio"
                ref="campoDeFoco"
                label="Nome Completo"
                type="text"
                required
              ></v-text-field>
              <v-text-field v-model="cadastro.email" :rules="regras.obrigatorio" label="E-mail" type="email" required></v-text-field>
              <v-text-field v-model="cadastro.senha" :rules="regras.obrigatorio" label="Senha" type="password" required></v-text-field>
              <v-text-field v-model="cadastro.confirmarSenha" label="Confirmar Senha" type="password" required></v-text-field>

              <div class="flex-center mt-4">
                <v-btn class="btn-login pa-6" type="submit" :disabled="!validCadastro">
                  Cadastrar
                </v-btn>
              </div>
            </v-form>
          </div>
        </transition>
      </div>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { required, digits, email, max, regex } from 'vee-validate/dist/rules';
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';
import SubHeader from '@/components/SubHeader.vue';

setInteractionMode('eager');

extend('required', { ...required, message: '{_field_} não pode ser vazio!' });

extend('email', { ...email, message: 'Insira um E-mail válido.' });

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
    SubHeader,
  },
})
export default class Login extends Vue {
  private regras: object = {
    obrigatorio: [(v) => !!v || 'Este campo obrigatório'],
  };
  private validLogin: boolean = false;
  private validCadastro: boolean = false;
  private login: object = {
    email: '',
    senha: '',
    manterConectado: false,
  };

  private cadastro: object = {
    name: '',
    email: '',
    senha: '',
    confirmarSenha: '',
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

  @Watch('criarConta')
  private alerarGuia() {
    setTimeout(() => {
      const campo = this.$refs.campoDeFoco as HTMLInputElement;
      this.$nextTick(() => campo.focus());
    });
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
  justify-content: space-between;
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
