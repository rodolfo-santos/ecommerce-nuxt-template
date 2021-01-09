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
    <p class="text-center mt-4">Perdeu a senha? <a @click="recuperar = !recuperar">Clique aqui para recuperar.</a></p>
    <transition name="fade" mode="out-in">
      <RecuperarSenha v-show="recuperar" />
    </transition>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginModel from '@/models/Login';
import RecuperarSenha from '@/components/Usuario/RecuperarSenha.vue';
import { mapActions, mapState } from 'vuex';

@Component({
  components: {
    RecuperarSenha,
  },
  computed: mapState('geral', ['rules']),
  methods: mapActions('usuario', ['getUsuario']),
})
export default class LoginForm extends Vue {
  private valido: boolean = false;
  private viewPass: boolean = false;
  private login: LoginModel = {
    email: '',
    senha: '',
    manterConectado: false,
  };
  private recuperar: boolean = false;
  private getUsuario!: (login: LoginModel) => void;

  private async logar(): Promise<void> {
    try {
      const response: any = await this.getUsuario(this.login);
      if (response.status === 200) {
        this.$router.push({ name: 'Usuario' });
      }
    } catch {
      alert('Não foi possível logar!');
    }
  }
}
</script>

<style lang="scss" scoped></style>
