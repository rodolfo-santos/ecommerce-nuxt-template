<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SubHeader, UserForm } from '@/components/utils';
import { LoginForm } from '@/components/pages/login';
import { IBreadcrumb } from '@/models/data';

@Component({ components: { SubHeader, UserForm, LoginForm } })
export default class Login extends Vue {
  public isShowCreateAccount: boolean = false;
  public breadCrumbs: IBreadcrumb[] = [
    { text: 'Home', disabled: false, to: '/' },
    { text: 'Login', disabled: true, to: '/login' },
  ];
}
</script>

<template>
  <v-main>
    <SubHeader title="Login" :breadCrumbs="breadCrumbs" />
    <v-container>
      <div max-width="1000px" class="bloco-login mx-auto mt-16">
        <h1 class="mb-5 text-muted">
          <span @click="isShowCreateAccount = false" :class="{ active: !isShowCreateAccount }"> Entrar </span>
          <div class="mx-5">|</div>
          <span @click="isShowCreateAccount = true" :class="{ active: isShowCreateAccount }"> Cadastrar </span>
        </h1>
        <div v-show="!isShowCreateAccount">
          <LoginForm />
        </div>
        <div v-show="isShowCreateAccount">
          <UserForm> Cadastrar </UserForm>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<style lang="scss" scoped>
@import '@/sass/custom.scss';

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

.active {
  color: $primary;
}
</style>
