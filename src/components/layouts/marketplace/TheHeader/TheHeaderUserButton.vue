<script lang="ts">
import { IAuthStore, IUserStore } from '@/models/store';
import { auth, user } from '@/store';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @user.State public readonly user!: IUserStore['user'];
  @auth.Getter public readonly isLoggedIn!: IAuthStore['isLoggedIn'];
}
</script>

<template>
  <div class="user d-none d-md-block">
    <v-btn :to="{ name: 'user-edit' }" v-if="isLoggedIn">
      <v-icon left>mdi-account</v-icon>
      {{ user.name }}
    </v-btn>
    <v-btn :to="{ name: 'login' }" v-else>
      <v-icon left>mdi-account</v-icon>
      Entrar / Cadastrar
    </v-btn>
  </div>
</template>
