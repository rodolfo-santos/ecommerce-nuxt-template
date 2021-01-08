<template>
  <v-card class="pa-2">
    <v-row>
      <v-col class="col-4 flex-center">
        <v-img :src="produto.fotos[0]"></v-img>
      </v-col>
      <v-col class="col-8">
        <h3 class="my-3 white--text">
          <router-link :to="{ name: 'Produto', params: { id: produto.id } }">{{ produto.nome }}</router-link>
        </h3>
        <p>{{ produto.preco | numeroPreco }}</p>

        <div class="d-flex justify-end">
          <v-btn color="primary" text @click="removerCarrinho(index)">
            Remover
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CarrinhoItem extends Vue {
  @Prop() private readonly produto!: object;
  @Prop() private readonly index!: number;

  private removerCarrinho(index) {
    this.$store.dispatch('carrinho/removerCarrinho', index);
  }
}
</script>

<style lang="scss" scoped>
@import '@/sass/variaveis';

.v-card {
  transition: 1s;
  border: solid $secondary 1px;

  &:hover {
    background-color: lighten($secondary, 2%) !important;
  }
}
</style>
