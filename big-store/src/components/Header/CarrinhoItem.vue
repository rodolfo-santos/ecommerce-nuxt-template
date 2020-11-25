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
          <p>{{ produto.descricao}}</p>
          <v-card-actions class="d-flex justify-end">

          <v-btn
              color="primary"
              text
            >
              Remover
            </v-btn>
          </v-card-actions>
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

<style>

</style>