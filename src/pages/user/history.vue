<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { HistoryProductCard } from '~/components/pages/user/history';

@Component({ components: { HistoryProductCard } })
export default class extends Vue {}
</script>

<template>
  <v-col cols="12" class="d-flex flex-column" style="gap: 16px">
    <HistoryProductCard />
    <HistoryProductCard />
    <HistoryProductCard />
    <HistoryProductCard />
    <HistoryProductCard />
  </v-col>
</template>
