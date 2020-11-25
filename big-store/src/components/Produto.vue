<template>
  <v-card class="mx-auto my-4" :width="width" :height="height">
    <v-img
      :src="dados.fotos[0]"
    ></v-img>


    <v-card-text align="center">
      <div class="">
        <ul class="list-inline">
          <li class="ml-2 text-capitalize" v-for="(categoria, index) in dados.categorias" :key="index"> {{ categoria }} </li>
        </ul>
      </div>
      <h2 class="my-3 white--text">{{ dados.nome}}</h2>

      <v-chip-group
        v-model="selection"
        active-class="primary"
      >
        <v-chip>PP</v-chip>
        <v-chip>P</v-chip>
        <v-chip>M</v-chip>
        <v-chip>G</v-chip>
        <v-chip>GG</v-chip>
        <v-chip>GX</v-chip>

      </v-chip-group>
    </v-card-text>

    <v-card-actions class="flex-center">
      <v-btn
        color="primary"
        text
      >
        + Carrinho
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Produto extends Vue {
  @Prop() private readonly dados!: object;
  @Prop() private readonly width!: number;
  @Prop() private readonly height!: number;
  private selection: number = 1;
}
</script>

<style lang="scss" scoped>
@import '@/sass/custom.scss';

.v-card {
  transition: 1s;
  border: solid $secondary 1px;
  
  &:hover {
    border: solid $primary 1px;
  }
}
</style>