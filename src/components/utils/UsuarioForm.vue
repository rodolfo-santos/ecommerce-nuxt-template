<template>
  <v-form @submit.prevent="submit" v-model="valido">
    <v-text-field v-model="usuarioForm.name" :rules="rules.required" label="Nome Completo" type="text" maxlength="80" :disabled="true" required></v-text-field>
    <v-text-field v-model="usuarioForm.cpf" :rules="rules.cpf" label="CPF" type="text" maxlength="11" :disabled="true" required></v-text-field>
    <v-text-field v-model="usuarioForm.email" :rules="rules.required" label="E-mail" type="email" maxlength="80" :disabled="true" required></v-text-field>
    <v-text-field
      v-model="usuarioForm.password"
      :rules="rules.password"
      label="Senha"
      :append-icon="viewPass ? 'mdi-eye-off-outline' : 'mdi-eye'"
      @click:append="() => (viewPass = !viewPass)"
      :type="viewPass ? 'text' : 'password'"
      :disabled="true"
      required
    ></v-text-field>
    <v-divider class="mt-4"></v-divider>
    <v-row>
      <v-col class="col-12 col-md-3">
        <v-text-field
          v-model="usuarioForm.cep"
          :rules="rules.required"
          label="CEP"
          type="text"
          @keyup="cep"
          maxlength="8"
          :disabled="true"
          required
        ></v-text-field>
      </v-col>
      <v-col class="col-12 col-md-9">
        <v-text-field v-model="usuarioForm.street" :rules="rules.required" label="Rua" type="text" :disabled="true" required></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12 col-md-3">
        <v-text-field v-model="usuarioForm.number" :rules="rules.required" label="Numero" type="text" maxlength="6" :disabled="true" required></v-text-field>
      </v-col>
      <v-col class="col-12 col-md-9">
        <v-text-field
          v-model="usuarioForm.neighborhood"
          :rules="rules.required"
          label="Bairro"
          type="text"
          maxlength="6"
          :disabled="true"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12 col-md-9">
        <v-text-field v-model="usuarioForm.city" :rules="rules.required" label="Cidade" type="text" :disabled="true" required></v-text-field>
      </v-col>
      <v-col class="col-12 col-md-3">
        <v-text-field v-model="usuarioForm.state" :rules="rules.required" label="Estado" type="text" :disabled="true" required></v-text-field>
      </v-col>
    </v-row>
    <v-text-field v-model="usuarioForm.phone" :rules="rules.phone" label="Telefone" type="number" :disabled="true" required></v-text-field>

    <div class="flex-center mt-4">
      <v-btn class="btn-login pa-6" type="submit" :disabled="!valido || true">
        <slot></slot>
      </v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { cepService } from '@/services/utils';

import { IUser } from '@/models/data';
import Login from '@/models/data/ILogin';
import { mapActions, mapState } from 'vuex';
import { general } from '@/store';

@Component({
  computed: {
    ...mapState('geral', ['rules']),
    ...mapState('user', ['user', 'logado', 'disabled']),
  },
  methods: mapActions('user', ['criarUsuario', 'getUsuario', 'atualizarUsuario']),
})
export default class UsuarioForm extends Vue {
  @general.State('rules') rules!: any;

  public valido: boolean = false;
  public viewPass: boolean = false;
  public user: IUser;
  public usuarioForm: IUser = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: '',
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    phone: '',
  };
  public logado!: boolean;
  public criarUsuario!: (user: IUser) => any;
  public getUsuario!: (login: Login) => void;
  public atualizarUsuario!: (user: IUser) => void;

  public cep(): void {
    const cep = this.usuarioForm.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      cepService.get(cep).then((response) => {
        this.usuarioForm.street = response.data.logradouro;
        this.usuarioForm.neighborhood = response.data.neighborhood;
        this.usuarioForm.city = response.data.localidade;
        this.usuarioForm.state = response.data.uf;
      });
    }
  }

  public async submit(): Promise<void> {
    if (!this.logado) {
      const response = await this.criarUsuario(this.usuarioForm);
      if (response) {
        this.getUsuario({ email: this.usuarioForm.email, password: this.usuarioForm.password });
        this.$router.push({ name: 'Usuario' });
      }
    } else {
      this.atualizarUsuario(this.usuarioForm);
    }
  }

  public created(): void {
    this.usuarioForm = { ...this.user };
  }
}
</script>

<style lang="scss">
@import '@/sass/custom.scss';
.btn-login {
  width: 100%;
  max-width: 300px !important;
  background-color: darken($primary, 10%) !important;
}
</style>
