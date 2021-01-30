<template>
  <div>
    <div :style="`background-image: url(${background})`" class="banner-header">
      <h1 class="text-capitalize">{{ titulo }}</h1>
      <v-breadcrumbs :items="breadCrumbs" divider=">" class="pl-0"></v-breadcrumbs>
    </div>
    <v-progress-linear :indeterminate="saving" color="primary"></v-progress-linear>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: mapState('geral', ['saving']),
})
export default class SubHeader extends Vue {
  @Prop() public readonly titulo!: string;
  @Prop() public readonly background!: string;
  @Prop() public readonly breadCrumbs!: object[];
}
</script>

<style lang="scss" scoped>
@import '@/sass/custom.scss';

.banner-header {
  height: 150px;
  background-repeat: no-repeat;
  background-position: 0% -20%;
  background-attachment: fixed;

  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
</style>
