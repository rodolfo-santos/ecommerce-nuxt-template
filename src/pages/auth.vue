<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { SubHeader } from '~/components/utils';
import { IBreadcrumb } from '~/models/data';

@Component({ components: { SubHeader } })
export default class Login extends Vue {
  public isShowCreateAccount: boolean = false;
  public breadcrumbs: IBreadcrumb[] = [
    { text: 'Home', disabled: false, to: '/' },
    { text: 'Login', disabled: true, to: '/auth/login' }
  ];
}
</script>

<template>
  <v-main>
    <SubHeader title="Login" :breadcrumbs="breadcrumbs" />
    <v-container>
      <div max-width="1000px" class="bloco-login mx-auto mt-16">
        <h1 class="mb-5 text-muted">
          <nuxt-link to="/auth/login" class="nuxt-link"> Entrar </nuxt-link>
          <div class="mx-5">|</div>
          <nuxt-link to="/auth/register" class="nuxt-link"> Cadastrar </nuxt-link>
        </h1>
        <nuxt-child></nuxt-child>
      </div>
    </v-container>
  </v-main>
</template>

<style lang="scss" scoped>
.bloco-login {
  width: 100%;
  transition: 0.25s;
  box-sizing: border-box;
}

.btn-login {
  width: 100%;
  max-width: 300px !important;
  background-color: darken($primary, 10%) !important;
}

form {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  display: flex;
  justify-content: center;
  max-width: 400px;
  margin: auto;

  span {
    cursor: pointer;
    transition: 0.25s;
    &:hover {
      color: #fff;
    }
  }
}

a {
  color: #666;
}

.nuxt-link-active {
  color: $primary !important;
}
</style>
