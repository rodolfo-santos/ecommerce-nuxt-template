<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { IAuthStore, IUserStore } from '~/models/store';
import { auth, user } from '~/store';

@Component
export default class extends Vue {
  @user.State public readonly user!: IUserStore['user'];
  @auth.State public readonly isLoggedIn!: IAuthStore['isLoggedIn'];
}
</script>

<template>
  <div class="user d-none d-md-block">
    <v-btn v-if="isLoggedIn" to="/user-edit">
      <v-icon left>mdi-account</v-icon>
      {{ user.name }}
    </v-btn>
    <v-btn v-else to="/auth/login">
      <v-icon left>mdi-account</v-icon>
      Entrar / Cadastrar
    </v-btn>
  </div>
</template>
