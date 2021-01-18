<template>
  <div>
    <v-parallax src="@/assets/imagens/banner-subheader.jpg" height="150">
      <div class="subheader">
        <h1 class="text-capitalize">{{ titulo }}</h1>
        <v-breadcrumbs :items="breadCrumbs" divider=">" class="pl-0"></v-breadcrumbs>
      </div>
    </v-parallax>
    <v-progress-linear :indeterminate="saving" color="primary"></v-progress-linear>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: mapState('geral', ['saving']),
})
export default class SubHeader extends Vue {
  @Prop() private readonly titulo!: string;
  @Prop() private readonly breadCrumbs!: object[];
}
</script>

<style lang="scss" scoped>
@import '@/sass/custom.scss';

.subheader {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
</style>
