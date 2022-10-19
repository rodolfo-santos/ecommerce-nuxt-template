<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ILogin } from '@/models/data';
import { formRules } from '@/assets/ts';
import LoginPasswordRecovery from '@/components/pages/login/LoginPasswordRecovery.vue';

@Component({ components: { LoginPasswordRecovery } })
export default class extends Vue {
  public rules = formRules;
  public isValidForm: boolean = false;
  public isShowPassword: boolean = false;
  public isShowRecoveryPassword: boolean = false;
  public loginForm: ILogin = {
    email: '',
    password: '',
    keepConnected: false
  };

  public async login(): Promise<void> {
    // const response: any = await this.getUsuario(this.login);
    // if (response.status === 200) {
    //   this.$router.push({ name: 'UsuarioEditar' });
    // }
  }
}
</script>

<template>
  <v-form @submit.prevent="login" v-model="isValidForm">
    <v-text-field
      id="email"
      v-model="loginForm.email"
      label="E-mail"
      ref="campoDeFoco"
      :rules="rules.email"
      required></v-text-field>
    <v-text-field
      id="password"
      v-model="loginForm.password"
      label="Senha"
      :rules="rules.required"
      :append-icon="isShowPassword ? 'mdi-eye-off-outline' : 'mdi-eye'"
      :type="isShowPassword ? 'text' : 'password'"
      @click:append="() => (isShowPassword = !isShowPassword)"
      required></v-text-field>
    <v-checkbox
      id="manter-conectado"
      v-model="loginForm.keepConnected"
      value="true"
      label="Mantenha Conectado"
      type="checkbox"></v-checkbox>

    <div class="flex-center mt-4">
      <v-btn class="btn-login pa-6" type="submit" :disabled="!isValidForm"> Login </v-btn>
    </div>
    <p class="text-center mt-4">
      Perdeu a password?
      <a @click="isShowRecoveryPassword = !isShowRecoveryPassword">Clique aqui para recuperar a senha.</a>
    </p>
    <transition name="fade" mode="out-in">
      <LoginPasswordRecovery v-show="isShowRecoveryPassword" />
    </transition>
  </v-form>
</template>
