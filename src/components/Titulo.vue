<template>
  <div class="flex-center flex-column mt-12 mb-6">
    <h2 class="text-upper text-center">{{ titulo }}</h2>
    <p v-if="subtitulo">{{ subtitulo }}</p>
    <div class="divider my-3"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Titulo extends Vue {
  @Prop({ required: true }) public readonly titulo!: string;
  @Prop() public readonly subtitulo!: string;
}
</script>

<style lang="scss">
@import '@/sass/custom.scss';

.divider {
  border: $primary 2px solid;
  width: 20%;
}
</style>
