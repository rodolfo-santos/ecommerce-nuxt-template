<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { formRules } from '~/assets/ts/utils';

@Component
export default class extends Vue {
  public ifValidForm: boolean = false;
  public rules = formRules;
  public email: string = '';
}
</script>

<template>
  <v-form v-model="ifValidForm" @submit.prevent="">
    <v-text-field v-model="email" label="Insira seu e-mail" :rules="rules.email" required></v-text-field>
    <div class="flex-center mt-4">
      <v-btn class="btn-login pa-6" type="submit" :disabled="!ifValidForm"> Recuperar Senha </v-btn>
    </div>
  </v-form>
</template>
