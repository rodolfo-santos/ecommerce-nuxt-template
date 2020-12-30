<template>
  <v-parallax src="@/assets/imagens/banner-subheader.jpg" height="150">
    <div class="subheader">
      <h1>{{ titulo }}</h1>
      <v-breadcrumbs :items="items" divider=">" class="pl-0"></v-breadcrumbs> 
     </div>
  </v-parallax>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';


@Component
export default class SubHeader extends Vue {
@Prop() private readonly titulo!: string;

private items: object[] = [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ];
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