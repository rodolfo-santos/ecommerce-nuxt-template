<template>
  <v-card class="pa-2">
    <v-row>
      <v-col class="col-4 flex-center">    
        <v-img
          :src="produto.fotos[0]"
        ></v-img>
      </v-col>
      <v-col class="col-8">
          <p>{{ produto.nome}}</p>
          <p>{{ produto.preco | numeroPreco }}</p>
          
          <div class="d-flex justify-end">
            <v-btn color="primary" text>
                Remover
            </v-btn>
          </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class CarrinhoItem extends Vue {
@Prop() private readonly produto !: object;

}
</script>

<style lang="scss" scoped>
@import '@/sass/variaveis';

.v-card {
  transition: 1s;
  border: solid $secondary 1px;
  
  &:hover {
    border: solid $primary 1px;
  }
}
</style>