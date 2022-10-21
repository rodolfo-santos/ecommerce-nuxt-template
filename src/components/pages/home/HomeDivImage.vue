<template>
  <v-parallax
    :src="require('~/assets/images/site-images/jeans_banner.jpg')"
    height="350"
    class="home-div-image | flex-center">
    <div class="text-center">
      <span class="home-div-image__up-title | text-upper">Nova Coleção</span>
      <h2 class="home-div-image__title | text-upper">Moda Jeans Premium</h2>
      <p>De uma olhada em nossas novidades, acesse nosso catálogo agora.</p>
      <v-btn>Confira Agora</v-btn>
    </div>
  </v-parallax>
</template>

<style lang="scss">
.home-div-image {
  margin-top: 50px;
  border-top: $primary solid 5px;
  border-bottom: $primary solid 5px;
}

.home-div-image__up-title {
  font-size: 1.5em;
}

.home-div-image__title {
  font-size: 2em;
}
</style>
