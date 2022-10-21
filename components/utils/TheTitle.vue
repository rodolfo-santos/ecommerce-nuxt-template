<template>
  <div class="flex-center flex-column mt-12 mb-6">
    <h2 class="text-upper text-center">{{ title }}</h2>
    <p v-if="subtitle">{{ subtitle }}</p>
    <div class="divider my-3"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class Titulo extends Vue {
  @Prop({ required: true }) public readonly title!: string;
  @Prop() public readonly subtitle!: string;
}
</script>

<style lang="scss">
.divider {
  border: $primary 2px solid;
  width: 20%;
}
</style>
