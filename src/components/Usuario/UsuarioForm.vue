<template>
  <v-form @submit.prevent="submit" v-model="valido">
    <v-text-field v-model="usuarioForm.nome" :rules="rules.required" label="Nome Completo" type="text" maxlength="80" required></v-text-field>
    <v-text-field v-model="usuarioForm.cpf" :rules="rules.cpf" label="CPF" type="text" maxlength="11" required></v-text-field>
    <v-text-field v-model="usuarioForm.email" :rules="rules.required" label="E-mail" type="email" maxlength="80" required></v-text-field>
    <v-text-field
      v-model="usuarioForm.senha"
      :rules="rules.password"
      label="Senha"
      :append-icon="viewPass ? 'mdi-eye-off-outline' : 'mdi-eye'"
      @click:append="() => (viewPass = !viewPass)"
      :type="viewPass ? 'text' : 'password'"
      required
    ></v-text-field>
    <v-divider class="mt-4"></v-divider>
    <v-row>
      <v-col class="col-12 col-md-3">
        <v-text-field v-model="usuarioForm.cep" :rules="rules.required" label="CEP" type="text" @keyup="cep" maxlength="8" required></v-text-field>
      </v-col>
      <v-col class="col-12 col-md-9">
        <v-text-field v-model="usuarioForm.rua" :rules="rules.required" label="Rua" type="text" required></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12 col-md-3">
        <v-text-field v-model="usuarioForm.numero" :rules="rules.required" label="Numero" type="text" maxlength="6" required></v-text-field>
      </v-col>
      <v-col class="col-12 col-md-9">
        <v-text-field v-model="usuarioForm.bairro" :rules="rules.required" label="Bairro" type="text" maxlength="6" required></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12 col-md-9">
        <v-text-field v-model="usuarioForm.cidade" :rules="rules.required" label="Cidade" type="text" required></v-text-field>
      </v-col>
      <v-col class="col-12 col-md-3">
        <v-text-field v-model="usuarioForm.estado" :rules="rules.required" label="Estado" type="text" required></v-text-field>
      </v-col>
    </v-row>
    <v-text-field v-model="usuarioForm.telefone" :rules="rules.phone" label="Telefone" type="number" required></v-text-field>

    <div class="flex-center mt-4">
      <v-btn class="btn-login pa-6" type="submit" @click.prevent="submeter" :disabled="!valido">
        <slot></slot>
      </v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { getCep } from '@/services/cep';

import Usuario from '@/models/Usuario';
import Login from '@/models/Login';
import { mapActions, mapState } from 'vuex';

@Component({
  computed: {
    ...mapState('geral', ['rules']),
    ...mapState('usuario', ['usuario', 'logado']),
  },
  methods: mapActions('usuario', ['criarUsuario', 'getUsuario', 'atualizarUsuario']),
})
export default class UsuarioForm extends Vue {
  private valido: boolean = false;
  private viewPass: boolean = false;
  private usuario: Usuario;
  private usuarioForm: Usuario;
  private logado!: boolean;
  private criarUsuario!: (usuario: Usuario) => any;
  private getUsuario!: (login: Login) => void;
  private atualizarUsuario!: (usuario: Usuario) => void;

  private cep(): void {
    const cep = this.usuario.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      getCep(cep).then((response) => {
        this.usuario.rua = response.data.logradouro;
        this.usuario.bairro = response.data.bairro;
        this.usuario.cidade = response.data.localidade;
        this.usuario.estado = response.data.uf;
      });
    }
  }

  private async submeter(): Promise<void> {
    if (!this.logado) {
      try {
        const response = await this.criarUsuario(this.usuario);
        const usuario = response.data;
        this.getUsuario({ email: usuario.email, senha: usuario.senha });
        this.$router.push({ name: 'Usuario' });
      } catch {
        alert('Erro ao criar o Usuário');
      }
    } else {
      try {
        this.atualizarUsuario(this.usuarioForm);
      } catch {
        alert('Não foi Possível Atualizar o Usuário');
      }
    }
  }

  private created() {
    this.usuarioForm = { ...this.usuario };
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
