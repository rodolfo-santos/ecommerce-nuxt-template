<template>
  <div>
    <v-skeleton-loader type="heading" class="my-4" v-if="heading"></v-skeleton-loader>
    <div class="d-flex mb-5" v-for="r in rowsResponsive" :key="r">
      <div class="bloco mx-2" v-for="c in colsResponsive" :key="c">
        <v-skeleton-loader type="image" width="100%" v-for="n in size" :key="n"></v-skeleton-loader>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SkeletonProdutoList extends Vue {
  @Prop() private heading: boolean;
  @Prop() private rows: number;
  @Prop() private cols: number;
  @Prop({ default: 2 }) private size: number;

  get rowsResponsive(): number {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs':
        return this.cols;
      case 'sm':
        return this.cols;
      case 'md':
        return this.rows * 2;
      case 'lg':
        return this.rows;
      case 'xl':
        return this.rows;
    }
  }

  get colsResponsive(): number {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs':
        return 1;
      case 'sm':
        return 2;
      case 'md':
        return this.cols / 2;
      case 'lg':
        return this.cols;
      case 'xl':
        return this.cols;
    }
  }
}
</script>

<style lang="scss" scoped>
.bloco {
  width: 100%;
}
</style>
