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

  @Watch('page')
  private alteraPagina(): void {
    this.novaQuery(this.page);
  }

  get totalPages() {
    const total = this.total / this.limit;
    return total !== Infinity ? Math.ceil(total) : 0;
  }

  private novaQuery(pageNum: number) {
    this.$router.push(`?_page=${pageNum}`);
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
