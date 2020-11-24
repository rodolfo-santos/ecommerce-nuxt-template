<template>
  <v-container class="mt-10">
      <v-row>
        <v-col class="m-auto col-3" v-for="categoria in categorias" :key="categoria.id">
          <v-card class="categoria" :style="`background: url(${categoria.imagem})`">
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CategoriaServ from '@/services/categorias';

@Component
export default class Categorias extends Vue {
  private categorias: object[] = [];

  private getCategorias() {
    CategoriaServ.listar(8).then((response) => {
      this.categorias = response.data;
    });
  }

  private created() {
    this.getCategorias();
  }
}
</script>

<style lang="scss" scoped>

@import '@/sass/custom.scss';
  .categoria {
    min-height: 250px;
    max-width: 250px;
    background-position: center!important;
    background-repeat: no-repeat!important;
    background-size: cover!important;
  }
</style>