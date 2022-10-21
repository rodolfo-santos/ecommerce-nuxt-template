<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { ICategory } from '~/models/data';

@Component
export default class TheHeaderInputSearch extends Vue {
  @Prop({ required: true }) public readonly categories!: ICategory[];

  public isShowInputSearch: boolean = false;
  public search: string = '';

  public showSearchInput(): void {
    this.isShowInputSearch = true;
    const theField = this.$refs.inputSearch as HTMLInputElement;
    this.$nextTick(() => theField.focus());
  }

  public searchProduct(): void {
    if ('/category/' + this.search !== this.$route.path) {
      this.$router.push(`/category/${this.search}`);
    }
  }
}
</script>

<template>
  <div class="d-md-flex">
    <transition name="fade">
      <div v-show="!isShowInputSearch">
        <div class="menu d-none d-md-flex">
          <ul>
            <nuxt-link
              v-for="item in categories"
              :key="item.name"
              tag="li"
              class="px-2"
              role="button"
              :to="`/category/${item.id}`"
              >{{ item.name }}</nuxt-link
            >
          </ul>
        </div>
      </div>
    </transition>

    <div class="p-relative d-none d-md-block">
      <transition name="fade">
        <div v-show="isShowInputSearch" class="div-search">
          <v-text-field
            ref="inputSearch"
            v-model="search"
            placeholder="Pesquisar"
            class="input-search"
            @blur="isShowInputSearch = false"
            @keypress.enter="searchProduct"></v-text-field>
        </div>
      </transition>

      <transition name="fade" mode="out-in">
        <v-icon v-if="!isShowInputSearch" key="icon-search" class="mx-5" @click="showSearchInput">mdi-magnify</v-icon>
        <v-icon v-else key="icon-close" class="mx-5" @click="isShowInputSearch = false">mdi-close</v-icon>
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
.div-search {
  position: absolute;
  right: 75px;
  top: -10px;
}

.input-search {
  color: #fff;
  min-width: 500px;
}

.search-form {
  width: 300px;
  margin-bottom: -15px;
}

.menu {
  width: 100%;
  justify-content: end;
  align-items: center;
  font-size: 0.9rem;
  ul {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-left: 10px;
    list-style: none;
    li {
      padding: 0 15px;
      transition: 0.5s;
      text-transform: uppercase;
      &:hover {
        color: $primary;
        cursor: pointer;
      }
    }
  }
}
</style>
