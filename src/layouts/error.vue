<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
type ErrorData = { code: number; title: string; message: string };

@Component
export default class extends Vue {
  @Prop() public error!: { statusCode: number; message: string };

  public get errorData(): ErrorData {
    if (this.error.statusCode === 500) {
      return {
        code: this.error.statusCode,
        title: 'Erro Interno',
        message: this.error.message
      };
    }

    return {
      code: this.error.statusCode,
      title: 'Página não encontrada',
      message: 'Ops, a página que você está procurando não existe.'
    };
  }

  public img404: string = require('~/assets/images/site-images/404.svg');
}
</script>

<template>
  <v-main>
    <v-container>
      <div class="bloco">
        <img :src="img404" alt="404" />
        <strong class="mt-4">{{ errorData.title }}</strong>
        <p>{{ errorData.message }}</p>
        <v-btn link :to="`/`">Voltar para a Home</v-btn>
      </div>
    </v-container>
  </v-main>
</template>

<style lang="scss" scoped>
.bloco {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  strong {
    font-size: 1.5em;
  }

  p {
    font-size: 1.2em;
  }

  img {
    width: 100%;
    max-width: 500px;
  }
}
</style>
