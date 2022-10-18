<template>
  <v-form @submit.prevent="logar" v-model="valido">
    <v-text-field id="email" v-model="login.email" label="E-mail" ref="campoDeFoco" :rules="rules.email" required></v-text-field>
    <v-text-field
      id="password"
      v-model="login.password"
      label="Senha"
      :rules="rules.required"
      :append-icon="viewPass ? 'mdi-eye-off-outline' : 'mdi-eye'"
      :type="viewPass ? 'text' : 'password'"
      @click:append="() => (viewPass = !viewPass)"
      required
    ></v-text-field>
    <v-checkbox id="manter-conectado" v-model="login.manterConectado" value="true" label="Mantenha Conectado" type="checkbox"></v-checkbox>

    <div class="flex-center mt-4">
      <v-btn class="btn-login pa-6" type="submit" :disabled="!valido"> Login </v-btn>
    </div>
    <p class="text-center mt-4">Perdeu a password? <a @click="recuperar = !recuperar">Clique aqui para recuperar.</a></p>
    <transition name="fade" mode="out-in">
      <RecuperarSenha v-show="recuperar" />
    </transition>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginModel from '@/models/data/ILogin';
import RecuperarSenha from '@/components/Usuario/RecuperarSenha.vue';
import { mapActions, mapState } from 'vuex';

@Component({
  components: {
    RecuperarSenha,
  },
  computed: mapState('geral', ['rules']),
  methods: mapActions('user', ['getUsuario']),
})
export default class LoginForm extends Vue {
  public valido: boolean = false;
  public viewPass: boolean = false;
  public login: LoginModel = {
    email: '',
    password: '',
    manterConectado: false,
  };
  public recuperar: boolean = false;
  public getUsuario!: (login: LoginModel) => Promise<void>;

  public async logar(): Promise<void> {
    const response: any = await this.getUsuario(this.login);
    if (response.status === 200) {
      this.$router.push({ name: 'UsuarioEditar' });
    }
  }
}
</script>

<style lang="scss" scoped></style>
