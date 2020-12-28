<template>
  <v-main>
    <SubHeader :titulo="dados.nome" />
    <p>{{ dados }}</p>
  </v-main>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import ProdutosServ from '@/services/produtos';
import SubHeader from '@/components/SubHeader.vue';

@Component({
  components: {
    SubHeader,
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


</style>