<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { general } from '~/store';

@Component
export default class SubHeader extends Vue {
  @general.State saving!: boolean;
  @Prop() public readonly title!: string;
  @Prop({ default: require('~/assets/images/site-images/banner_subheader.jpg') }) public background!: string;
  @Prop() public readonly breadcrumbs!: object[];

  get urlBackground(): string {
    if (this.background === '') {
      return require('~/assets/images/site-images/banner_subheader.jpg');
    }
    return this.background;
  }
}
</script>

<template>
  <div>
    <div :style="`background-image: url(${urlBackground})`" class="banner-header">
      <h1 class="text-capitalize">{{ title }}</h1>
      <v-breadcrumbs :items="breadcrumbs" divider=">" class="pl-0"></v-breadcrumbs>
    </div>
    <v-progress-linear :indeterminate="saving" color="primary"></v-progress-linear>
  </div>
</template>

<style lang="scss" scoped>
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
