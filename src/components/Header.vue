<template>
  <nav>
    <v-app-bar fixed class="app-bar">
      <v-app-bar-nav-icon @click.stop="menuMobile = !menuMobile" class="hidden-md-and-up"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/">
          <v-img :src="logo" class="logo"></v-img>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <transition name="fade">
        <div v-show="!searchActive">
          <div class="menu d-none d-md-flex">
            <ul>
              <router-link tag="li" class="px-2" role="button" v-for="item in menu" :key="item.nome" :to="{ name: 'Categoria', params: { id: item.id } }">{{
                item.nome
              }}</router-link>
            </ul>
          </div>
        </div>
      </transition>

      <div class="p-relative d-none d-md-block">
        <transition name="fade">
          <div v-show="searchActive" class="div-search">
            <v-text-field placeholder="Pesquisar" class="input-search" ref="inpSearch" @blur="searchActive = false"></v-text-field>
          </div>
        </transition>

        <transition name="fade" mode="out-in">
          <v-icon @click="searchShow" v-if="!searchActive" class="mx-5" key="icon-search">mdi-magnify</v-icon>
          <v-icon @click="searchActive = false" v-else class="mx-5" key="icon-close">mdi-close</v-icon>
        </transition>
      </div>

      <div class="carrinho flex-center">
        <v-btn @click.stop="carrinho = !carrinho">
          <v-icon left>mdi-cart</v-icon>
          {{ itens.length }}
        </v-btn>
      </div>

      <div class="usuario d-none d-md-block">
        <v-btn :to="{ name: 'Login' }" v-if="!!logado">
          <v-icon left>mdi-account</v-icon>
          {{ usuario.nome }}
        </v-btn>
        <v-btn :to="{ name: 'Login' }" v-else>
          <v-icon left>mdi-account</v-icon>
          Entrar / Cadastrar
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="menuMobile" fixed temporary app>
      <v-list-item two-line link :to="{ name: 'Login' }">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-if="!!logado">{{ usuario.nome }}</v-list-item-title>
          <v-list-item-subtitle>Logado</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item link :to="{ name: 'Home' }">
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="item in menu" :key="item.nome" link :to="{ name: 'Categoria', params: { id: item.id } }">
          <v-list-item-content>
            <v-list-item-title> {{ item.nome }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="carrinho" fixed bottom right temporary width="400" class="carrinho-menu">
      <v-container id="scroll-target" class="overflow-y-auto carrinho-lista-itens">
        <div v-if="itens.length === 0" class="carrinho-vazio">
          <p>Seu carrinho ainda está vazio,</p>
          <router-link :to="{ name: 'Loja' }">Visite nossa loja</router-link>
        </div>
        <transition-group name="fade" mode="out-in">
          <CarrinhoItem v-for="(produto, index) in itens" :key="index + 1" :produto="produto" :index="index" class="mb-1" />
        </transition-group>
      </v-container>

      <v-card class="pa-5 carrinho-rodape">
        <div class="text-center carrinho-total"><strong>Total:</strong> {{ TotalCarrinho | numeroPreco }}</div>
        <v-row>
          <v-col class="col-6 p-2">
            <v-btn color="" width="100%"> Finalizar </v-btn>
          </v-col>
          <v-col class="col-6 p-2">
            <v-btn color="error" width="100%" @click="esvaziarCarrinho">Esvaziar</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-navigation-drawer>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CarrinhoItem from './Header/CarrinhoItem.vue';
import CategoriasServ from '@/services/categorias';
import Categoria from '@/models/Categoria';
import Produto from '@/models/Produto';
import { mapState } from 'vuex';

@Component({
  components: {
    CarrinhoItem,
  },
  computed: {
    ...mapState('carrinho', ['itens']),
    ...mapState('usuario', ['usuario', 'logado']),
  },
})
export default class Header extends Vue {
  private searchActive: boolean = false;
  private carrinho: boolean = false;
  private menuMobile: boolean = false;
  private logo: string = require('../assets/logo/logo.svg');
  private menu: Categoria[] = [];
  private itens!: Produto[];

  get TotalCarrinho(): number {
    let total: number = 0;
    this.itens.forEach((el: Produto) => {
      total = total + el.preco;
    });
    return total;
  }

  private searchShow(): void {
    this.searchActive = true;
    const theField = this.$refs.inpSearch as HTMLInputElement;
    this.$nextTick(() => theField.focus());
  }

  private getCategorias(): void {
    CategoriasServ.listar(10).then((response) => {
      this.menu = response.data;
    });
  }

  private esvaziarCarrinho(): void {
    this.$store.dispatch('carrinho/esvaziarCarrinho');
  }

  private created(): void {
    this.getCategorias();
  }
}
</script>

<style lang="scss" scoped>
@import '@/sass/custom.scss';

.carrinho-vazio {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
}

.carrinho-lista-itens {
  background: darken($secondary, 10%);
  height: 85%;
  @media (max-width: $bk-md) {
    max-height: 70%;
  }
}

.carrinho-menu {
  min-height: 500px;
  @media (max-width: $bk-md) {
    border-top: $primary 5px solid;
  }
}

.carrinho-rodape {
  display: flex;
  flex-direction: column;
  background-color: darken($secondary, 5%);
  border-top: $primary solid 5px;
  height: 100%;
  max-height: 15%;

  @media (max-width: $bk-md) {
    max-height: 30%;
  }

  .row {
    align-items: flex-end;
  }
}

.app-bar {
  background-color: darken($secondary, 10%);
  z-index: 2 !important;
}

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

.logo {
  max-width: 100px;
}

.router-link-exact-active {
  color: $primary;
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
