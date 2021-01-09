<template>
  <div>
    <v-skeleton-loader type="heading" class="my-4" v-if="heading"></v-skeleton-loader>
    <div class="d-flex mb-5" v-for="r in rows" :key="r">
      <div class="bloco mx-2" v-for="c in cols" :key="c">
        <v-skeleton-loader type="image" width="100%"></v-skeleton-loader>
        <v-skeleton-loader type="image" width="100%"></v-skeleton-loader>
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
}
</script>

<style lang="scss" scoped>
.bloco {
  width: 100%;
}
</style>
