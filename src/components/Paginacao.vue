<template>
  <v-row>
    <v-col class="text-right"> </v-col>
    <v-col class="pagination">
      <v-pagination v-model="page" :length="totalPages" :total-visible="10"></v-pagination>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { serialize } from '@/helpers';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Paginacao extends Vue {
  @Prop() private readonly limit!: number;
  @Prop() private readonly total!: number;
  private page: number = 1;

  @Watch('$route', { immediate: true, deep: true })
  private atualizarNumeroPagina(): void {
    if (this.$route.query._page) {
      this.page = Number(this.$route.query._page);
    }
  }

  @Watch('page')
  private alteraPagina(): void {
    if (Number(this.$route.query._page) !== this.page) {
      const params = { _page: this.page };
      this.filtrar(params, false);
    }
  }

  get totalPages(): number {
    const total = this.total / this.limit;
    return total !== Infinity ? Math.ceil(total) : 0;
  }

  private filtrar(filtro, primeiraPagina: boolean): void {
    const query = { ...this.$route.query };
    if (primeiraPagina) {
      filtro = Object.assign(filtro, { _page: 1 });
    }
    const novaQuery = Object.assign(query, filtro);
    const url: string = serialize(novaQuery);
    this.$router.push('?' + url).catch(() => {});
  }

  private created(): void {
    if (!!this.$route.query._page) {
      this.page = Number(this.$route.query._page);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/sass/custom';

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
