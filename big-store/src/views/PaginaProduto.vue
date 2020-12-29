<template>
  <v-main>
    <SubHeader :titulo="dados.nome" />
    <v-container class="produto-container">
      <v-row>
        <v-row class="col-8">
          <div class="col-2">
            <v-img :src="dados.fotos[0]" alt="" class="mb-2"></v-img>
            <v-img :src="dados.fotos[0]" alt="" class="mb-2"></v-img>
            <v-img :src="dados.fotos[0]" alt="" class="mb-2"></v-img>
          </div>
          <div class="col-10">
            <InnerImageZoom :src="dados.fotos[0]" :zoomSrc="dados.fotos[0]" />
          </div>
        </v-row>
        <v-col>
          <h2>{{ dados.nome }}</h2>
          <p> {{ dados.descricao_breve }} </p>
          <p class="preco"> {{ dados.preco | numeroPreco }} </p>
          <v-divider class="mb-4"></v-divider>
          <div class="variacoes">
            <strong>Escolha a variação</strong>
            <v-chip-group v-model="selection" active-class="primary" mandatory>
              <v-chip v-for="variacao in dados.variacoes" :key="variacao">{{variacao}}</v-chip>
            </v-chip-group>
          </div>
          <v-divider class="my-4"></v-divider>
          <div>
            <p>Categorias: <router-link v-for="categoria in dados.categorias" :key="categoria" 
                            class="text-capitalize text-muted" :to="{ name: 'Categoria', params: { id: categoria} }"> {{ categoria }} </router-link>  
            </p>
            <v-text-field v-model="firstname" :rules="nameRules" :counter="8" maxlength="6" label="Calcular Frete"></v-text-field>           
          <v-row class="mt-5 pa-2">
              <v-btn class="col-12 mb-2 pa-7" color="primary">Comprar Agora</v-btn>
              <v-btn class="col-12 mb-2 pa-7" color="warning">Adicionar ao Carrinho +</v-btn>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <section class="mt-15">
        <h2>Descrição</h2>
        <p class="text-justify">{{ dados.descricao_completa}}</p>
        <h4>Informações Complementares</h4>
        <p> Peso Kg: {{ dados.peso_kg }} <br>
            Altura Cm:{{ dados.altura_cm }} <br>
            Largura Cm:{{ dados.largura_cm }} <br>
            Comprimento Cm:{{ dados.comprimento_cm }} <br>
        </p>
      </section>
      <v-divider></v-divider>
      <section>
        <h2>Produtos Relacionados</h2>
        <ProdutosRelacionados />
      </section>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import InnerImageZoom from 'vue-inner-image-zoom';
import ProdutosRelacionados from '@/components/PaginaProduto/ProdutosRelacionados.vue';
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css';

import ProdutosServ from '@/services/produtos';
import SubHeader from '@/components/SubHeader.vue';

@Component({
  components: {
    SubHeader,
    InnerImageZoom,
    ProdutosRelacionados,
  },
})
export default class Produto extends Vue {
@Prop() private readonly id!: string;
private dados: object = {};

private getProdutos(): void {
  ProdutosServ.produto_unico(this.id).then((response) => {
    this.dados = response.data;
  });
}

private created() {
  this.getProdutos();
}
}

</script>

<style lang="scss" scoped>
@import '@/sass/custom.scss';

.produto-container {
  max-width: 1300px;
}

.variacoes {
  max-width: 300px;
}

.preco {
  font-size: 1.3em;
  color: $primary;
}

</style>