<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator';
import { objectToQuery } from '~/assets/ts';
import { IProductQuery } from '~/models/data';

@Component
export default class extends Vue {
  @Prop() public readonly limit!: number;
  @Prop() public readonly total!: number;
  public page: number = 1;

  get totalPages(): number {
    const total = this.total / this.limit;
    return total !== Infinity ? Math.ceil(total) : 0;
  }

  @Watch('$route', { immediate: true, deep: true })
  onRouteChange(): void {
    if (this.$route.query._page) {
      this.page = Number(this.$route.query._page);
    }
  }

  @Watch('page')
  onPageChange(): void {
    if (Number(this.$route.query._page) !== this.page) {
      const params: IProductQuery = { _page: this.page };
      this.filter(params, false);
    }
  }

  public filter(query: IProductQuery, firstPage: boolean): void {
    if (firstPage) query = Object.assign(query, { _page: 1 });
    const newQuery = { ...this.$route.query, ...query };
    const queryParams: string = objectToQuery(newQuery);
    this.$router.push(`${this.$route.path}${queryParams}`);
  }
}
</script>

<template>
  <v-row>
    <v-col class="text-right"> </v-col>
    <v-col class="pagination">
      <v-pagination v-model="page" :length="totalPages" :total-visible="10"></v-pagination>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  @media (min-width: 720px) {
    justify-content: flex-end;
  }
}
.page-item.active .page-link {
  background-color: $primary;
  border-color: $primary;
}

.page-link {
  color: $primary;
}
</style>
