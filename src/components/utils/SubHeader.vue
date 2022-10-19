<template>
  <div>
    <div :style="`background-image: url(${urlBackground})`" class="banner-header">
      <h1 class="text-capitalize">{{ title }}</h1>
      <v-breadcrumbs :items="breadCrumbs" divider=">" class="pl-0"></v-breadcrumbs>
    </div>
    <v-progress-linear :indeterminate="saving" color="primary"></v-progress-linear>
  </div>
</template>

<script lang="ts">
import { general } from '@/store';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: mapState('geral', ['saving'])
})
export default class SubHeader extends Vue {
  @general.State saving!: boolean;
  @Prop() public readonly title!: string;
  @Prop({ default: require('@/assets/images/banner-subheader.jpg') }) public background: string;
  @Prop() public readonly breadCrumbs!: object[];

  get urlBackground(): string {
    if (this.background === '') {
      return require('@/assets/images/banner-subheader.jpg');
    }
    return this.background;
  }
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
