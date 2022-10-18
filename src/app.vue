<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { marketplace } from '@/layouts';
import { routes } from '@/router';

@Component({ components: { marketplace } })
export default class extends Vue {
  public get isMarketplace(): boolean {
    const marketplaceRoutes = routes.filter((route) => route.layout === 'marketplace').map((route) => route.name);
    return marketplaceRoutes.includes(this.$route.name as string);
  }
}
</script>

<template>
  <marketplace v-if="isMarketplace" />
</template>
