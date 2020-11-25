<template>
  <v-container>
    <Titulo titulo="Produtos com Preços Incríveis" subtitulo="Produtos separados especialmente para você" />
  <!-- <v-sheet
    class="mx-auto"
  >
    <v-slide-group
      active-class="success"
      show-arrows
    >
      <v-slide-item 
        v-for="produto in produtos" 
        :key="produto.id"
        v-slot="{ toggle }">
        <Produto :dados="produto" width="300" class="mr-3 ml-3" @click="toggle"/>
      </v-slide-item>
    </v-slide-group>
  </v-sheet> -->

  <v-sheet class="bg-transparent">
    <v-slide-group
      show-arrows
    >
      <v-slide-item
        v-for="n in produtos.length"
        :key="n"
        v-slot="{ toggle }"
      >
        <div @click="toggle">
          <Produto :dados="produtos[n-1]" width="300" 
            class="mr-3 ml-3" 
            v-if="produtos[n-1]"/>
        </div>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
  </v-container>
</template>

<script lang="ts" scoped>
import Titulo from '@/components/Titulo.vue';
import {Component, Vue} from 'vue-property-decorator';
import ProdutosServ from '@/services/produtos';
import Produto from '@/components/Produto.vue';

@Component({
  components: {
    Produto,
    Titulo,
  },
})
export default class MelhoresProdutos extends Vue {
  private produtos: object[] = [];

  private getProdutos(): void {
    ProdutosServ.listar(8).then((response) => {
      this.produtos = response.data;
    });
  }

  private created() {
    this.getProdutos();
  }
}
</script>

<style lang="scss">

</style>