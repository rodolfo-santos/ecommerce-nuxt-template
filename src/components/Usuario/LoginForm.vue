<template>
  <v-form @submit.prevent="logar" v-model="valido">
    <v-text-field v-model="login.email" label="E-mail" ref="campoDeFoco" :rules="rules.email" required></v-text-field>
    <v-text-field
      v-model="login.senha"
      :rules="rules.required"
      label="Senha"
      :append-icon="viewPass ? 'mdi-eye-off-outline' : 'mdi-eye'"
      @click:append="() => (viewPass = !viewPass)"
      :type="viewPass ? 'text' : 'password'"
      required
    ></v-text-field>
    <v-checkbox v-model="login.manterConectado" value="true" label="Mantenha Conectado" type="checkbox"></v-checkbox>

    <div class="flex-center mt-4">
      <v-btn class="btn-login pa-6" type="submit" :disabled="!valido"> Login </v-btn>
    </div>
    <p class="text-center mt-4">Perdeu a senha? <router-link to="/">Clique aqui para recuperar.</router-link></p>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginModel from '@/models/Login';
import { mapState } from 'vuex';

@Component({
  computed: mapState('geral', ['rules']),
})
export default class LoginForm extends Vue {
  private valido: boolean = false;
  private viewPass: boolean = false;

  private login: LoginModel = {
    email: '',
    senha: '',
    manterConectado: false,
  };

  private logar(): void {
    this.$store.dispatch('usuario/getUsuario', this.login);
    // this.$router.push({ name: 'Home' });
  }
}
</script>

<style lang="scss" scoped></style>
