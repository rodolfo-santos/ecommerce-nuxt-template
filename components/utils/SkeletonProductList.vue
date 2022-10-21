<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class extends Vue {
  @Prop() public heading!: boolean;
  @Prop() public rows!: number;
  @Prop() public cols!: number;
  @Prop({ default: 2 }) public size!: number;
}
</script>

<template>
  <div>
    <v-skeleton-loader v-if="heading" type="heading" class="my-4"></v-skeleton-loader>
    <div v-for="r in rows" :key="r" class="d-flex mb-5">
      <div v-for="c in cols" :key="c" class="bloco mx-2">
        <v-skeleton-loader v-for="n in size" :key="n" type="image" width="100%"></v-skeleton-loader>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bloco {
  width: 100%;
}
</style>
