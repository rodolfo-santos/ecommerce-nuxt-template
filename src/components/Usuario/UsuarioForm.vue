<template>
  <v-form @submit.prevent="submit" v-model="valido">
    <v-text-field v-model="user.nome" :rules="rules.required" label="Nome Completo" type="text" maxlength="80" required></v-text-field>
    <v-text-field v-model="user.email" :rules="rules.required" label="E-mail" type="email" maxlength="80" required></v-text-field>
    <v-text-field v-model="user.senha" :rules="rules.required" label="Senha" type="password" required></v-text-field>
    <v-divider class="mt-4"></v-divider>
    <v-row>
      <v-col class="col-12 col-md-3">
        <v-text-field v-model="user.cep" :rules="rules.required" label="CEP" type="text" @keyup="cep" maxlength="8" required></v-text-field>
      </v-col>
      <v-col class="col-12 col-md-9">
        <v-text-field v-model="user.rua" :rules="rules.required" label="Rua" type="text" required></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12 col-md-3">
        <v-text-field v-model="user.numero" :rules="rules.required" label="Numero" type="text" maxlength="6" required></v-text-field>
      </v-col>
      <v-col class="col-12 col-md-9">
        <v-text-field v-model="user.bairro" :rules="rules.required" label="Bairro" type="text" maxlength="6" required></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12 col-md-9">
        <v-text-field v-model="user.cidade" :rules="rules.required" label="Cidade" type="text" required></v-text-field>
      </v-col>
      <v-col class="col-12 col-md-3">
        <v-text-field v-model="user.estado" :rules="rules.required" label="Estado" type="text" required></v-text-field>
      </v-col>
    </v-row>
    <v-text-field v-model="user.telefone" :rules="rules.required" label="Telefone" type="text" required></v-text-field>

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
import { mapState } from 'vuex';

@Component({
  computed: mapState(['rules']),
})
export default class UsuarioForm extends Vue {
  private valido: boolean = false;
  private user: Usuario = {
    nome: '',
    email: '',
    senha: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    telefone: '',
  };

  private cep(): void {
    const cep = this.user.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      getCep(cep).then((response) => {
        this.user.rua = response.data.logradouro;
        this.user.bairro = response.data.bairro;
        this.user.cidade = response.data.localidade;
        this.user.estado = response.data.uf;
      });
    }
  }

  private submeter() {
    if (!this.$store.state.logado) {
      this.$store.dispatch('criarUsuario', this.user);
    } else {
      this.$store.dispatch('atualizarUsuario', this.user);
    }
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
