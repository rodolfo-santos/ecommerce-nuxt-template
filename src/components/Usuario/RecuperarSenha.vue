<template>
  <v-form @submit.prevent="" v-model="valido">
    <v-text-field v-model="email" label="Insira seu e-mail" ref="campoDeFoco" :rules="rules.email" required></v-text-field>
    <div class="flex-center mt-4">
      <v-btn class="btn-login pa-6" type="submit" :disabled="!valido"> Recuperar Senha </v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';

@Component({
  computed: mapState('geral', ['rules']),
})
export default class RecuperarSenha extends Vue {
  public valido: boolean = false;
  public email: string = '';
}
</script>

<style lang="scss" scoped></style>
