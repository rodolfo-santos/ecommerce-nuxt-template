<template>
  <div>
    <transition name="fade" mode="out-in">
      <v-alert :type="alert.variant" class="custom-alert" v-show="alert.isShow" key="1"> {{ alert.message }} </v-alert>
    </transition>
  </div>
</template>

<script lang="ts">
import { IAlertStore } from '@/models/store';
import { alert } from '@/store';
import { Component, Vue } from 'vue-property-decorator';

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
