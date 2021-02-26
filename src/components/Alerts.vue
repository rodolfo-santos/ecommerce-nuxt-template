<template>
  <div>
    <transition name="fade" mode="out-in">
      <v-alert type="success" class="custom-alert" v-show="cartAdd" key="1">
        Item adicionado ao carrinho!
      </v-alert>
    </transition>
    <transition name="fade" mode="out-in">
      <v-alert type="success" class="custom-alert" v-show="userUpdate" key="1">
        Usuário Atualizado com Sucesso!
      </v-alert>
    </transition>
    <transition name="fade" mode="out-in">
      <v-alert type="error" class="custom-alert" v-show="userUpdateError" key="1">
        Não foi possível atualizar os dados.
      </v-alert>
    </transition>
    <transition name="fade" mode="out-in">
      <v-alert type="warning" class="custom-alert" v-show="loginError" key="1">
        Não foi possível realizar o login. Verifique o usuário e senha.
      </v-alert>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: {
    ...mapState('carrinho', { cartAdd: 'alert' }),
    ...mapState('usuario', { userUpdate: 'alert', userUpdateError: 'alert_error', loginError: 'alert_warning' }),
  },
})
export default class Alerts extends Vue {}
</script>

<style lang="scss">
.custom-alert {
  position: fixed !important;
  z-index: 99999;
  top: 92vh;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 600px) {
    top: 80vh;
  }
}
</style>
