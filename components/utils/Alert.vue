<template>
  <transition name="fade" mode="out-in">
    <v-alert v-show="alert.isShow" :type="alert.variant" class="custom-alert"> {{ alert.message }} </v-alert>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { IAlertStore } from '~/models/store';
import { alert } from '~/store';

@Component
export default class Alerts extends Vue {
  @alert.State public readonly alert!: IAlertStore['alert'];
}
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
