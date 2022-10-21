<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { cepService } from '~/services/utils';
import { IUser } from '~/models/data';
import { user } from '~/store';
import { IUserStore } from '~/models/store';
import { formRules } from '~/assets/ts/utils';

@Component
export default class extends Vue {
  @user.State private user!: IUserStore['user'];

  public rules = formRules;
  public isValidForm: boolean = false;
  public isShowPassword: boolean = false;
  public userForm: IUser = {
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
    phone: ''
  };

  created(): void {
    this.userForm = { ...this.user };
  }

  public getAddressByCep(): void {
    const cep = this.userForm.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      cepService.get(cep).then((response) => {
        this.userForm.street = response.data.logradouro;
        this.userForm.neighborhood = response.data.neighborhood;
        this.userForm.city = response.data.localidade;
        this.userForm.state = response.data.uf;
      });
    }
  }

  public submit(): void {
    //
  }
}
</script>

<template>
  <v-form v-model="isValidForm" @submit.prevent="submit">
    <v-text-field
      v-model="userForm.name"
      label="Nome Completo"
      type="text"
      maxlength="80"
      :rules="rules.required"
      :disabled="true"
      required />
    <v-text-field
      v-model="userForm.cpf"
      label="CPF"
      type="text"
      maxlength="11"
      :rules="rules.cpf"
      :disabled="true"
      required />
    <v-text-field
      v-model="userForm.email"
      label="E-mail"
      type="email"
      maxlength="80"
      :rules="rules.required"
      :disabled="true"
      required />
    <v-text-field
      v-model="userForm.password"
      label="Senha"
      required
      :rules="rules.password"
      :append-icon="isShowPassword ? 'mdi-eye-off-outline' : 'mdi-eye'"
      :type="isShowPassword ? 'text' : 'password'"
      :disabled="true"
      @click:append="() => (isShowPassword = !isShowPassword)" />
    <v-divider class="mt-4"></v-divider>
    <v-row>
      <v-col class="col-12 col-md-3">
        <v-text-field
          v-model="userForm.cep"
          label="CEP"
          type="text"
          maxlength="8"
          required
          :rules="rules.required"
          :disabled="true"
          @keyup="getAddressByCep()" />
      </v-col>
      <v-col class="col-12 col-md-9">
        <v-text-field
          v-model="userForm.street"
          label="Rua"
          type="text"
          required
          :rules="rules.required"
          :disabled="true" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12 col-md-3">
        <v-text-field
          v-model="userForm.number"
          label="Numero"
          type="text"
          required
          maxlength="6"
          :rules="rules.required"
          :disabled="true" />
      </v-col>
      <v-col class="col-12 col-md-9">
        <v-text-field
          v-model="userForm.neighborhood"
          label="Bairro"
          type="text"
          required
          maxlength="6"
          :rules="rules.required"
          :disabled="true" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12 col-md-9">
        <v-text-field
          v-model="userForm.city"
          label="Cidade"
          type="text"
          required
          :rules="rules.required"
          :disabled="true" />
      </v-col>
      <v-col class="col-12 col-md-3">
        <v-text-field
          v-model="userForm.state"
          label="Estado"
          type="text"
          required
          :rules="rules.required"
          :disabled="true" />
      </v-col>
    </v-row>
    <v-text-field
      v-model="userForm.phone"
      label="Telefone"
      type="number"
      required
      :rules="rules.phone"
      :disabled="true" />

    <div class="flex-center mt-4">
      <v-btn class="btn-login pa-6" type="submit" :disabled="!isValidForm || true">
        <slot></slot>
      </v-btn>
    </div>
  </v-form>
</template>

<style lang="scss">
.btn-login {
  width: 100%;
  max-width: 300px !important;
  background-color: darken($primary, 10%) !important;
}
</style>
