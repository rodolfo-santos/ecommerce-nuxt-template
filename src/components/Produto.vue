<template>
  <v-card class="mx-auto my-4" :width="width" :height="height">
    <v-img :src="dados.fotos[0]"></v-img>

    <v-card-text align="center">
      <div class="">
        <div class="d-flex justify-center">
          <router-link
            :to="`/categoria/${dados.categorias[n]}`"
            class="ml-2 text-capitalize link-categoria text-muted"
            v-for="n in 3"
            :key="n"
          >
            {{ dados.categorias[n] }}
          </router-link>
        </div>
      </div>
      <h2 class="my-3 white--text">
        <router-link :to="{ name: 'Produto', params: { id: dados.id } }">{{
          dados.nome
        }}</router-link>
      </h2>

      <v-chip-group
        v-model="selection"
        active-class="primary"
        center-active
        class="chip-produto"
      >
        <v-chip v-for="variacao in dados.variacoes" :key="variacao">{{
          variacao
        }}</v-chip>
      </v-chip-group>
      <div class="preco mt-4">{{ dados.preco | numeroPreco }}</div>
    </v-card-text>

    <v-card-actions class="flex-center">
      <v-btn
        :disabled="!btnAddCarrinho"
        @click="adicionarCarrinho(dados)"
        color="primary"
        text
      >
        + Carrinho
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Produto extends Vue {
  @Prop() private readonly dados!: object;
  @Prop() private readonly width!: number;
  @Prop() private readonly height!: number;
  private selection: number = 1;
  private btnAddCarrinho = true;

  private adicionarCarrinho(produto: object) {
    this.$store.commit('addCarrinho', produto);
    this.btnAddCarrinho = false;
    setTimeout(() => {
      this.btnAddCarrinho = true;
    }, 2000);
  }
}
</script>

<style lang="scss" scoped>
@import '@/sass/custom.scss';
.preco {
  color: #fff;
}

.v-card {
  transition: 1s;
  border: solid $secondary 1px;

  &:hover {
    background-color: lighten($secondary, 2%) !important;
  }
}
</style>
