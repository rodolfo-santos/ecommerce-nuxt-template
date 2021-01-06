<template>
  <v-container class="mt-10">
    <v-row v-if="categorias.length === 0">
      <v-col>
        <Loading />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        class="m-auto col-6 col-md-3 col-lg-2"
        v-for="categoria in categorias"
        :key="categoria.id"
      >
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              class="categoria"
              :to="{ name: 'Categoria', params: { id: categoria.id } }"
              :style="`background: url(${categoria.imagem})`"
              hover
            >
              <v-card-text class="texto">{{ categoria.nome }}</v-card-text>

              <v-fade-transition>
                <v-overlay
                  v-if="hover"
                  absolute
                  color="#16D17E"
                  class="overlay-texto"
                >
                  {{ categoria.nome }}
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CategoriaServ from '@/services/categorias';
import Loading from '@/components/Loading.vue';

@Component({
  components: {
    Loading,
  },
})
export default class Categorias extends Vue {
  private categorias: object[] = [];
  private overlay: boolean = false;

  private getCategorias() {
    CategoriaServ.listar(6).then((response) => {
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
  border: $primary 2px solid;
  min-height: 200px;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  transition: 0.25s !important;

  display: flex;
  align-items: center;
  text-align: center;

  &:hover {
    transform: scale(1.05);
  }

  .texto,
  .overlay-texto {
    font-size: 1.5em !important;
  }
}
</style>
