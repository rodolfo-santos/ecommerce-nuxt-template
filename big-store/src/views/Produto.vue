<template>
  <v-main>
    <p>id: {{ id }}</p>
  </v-main>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Produto extends Vue {
@Prop() private readonly id!: string;
}
</script>

<style lang="scss" scoped>


</style>