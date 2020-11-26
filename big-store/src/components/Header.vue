<template>
  <nav>
    <v-app-bar fixed class="app-bar">
      <v-app-bar-nav-icon 
      @click.stop="menuMobile = !menuMobile" 
      class="hidden-md-and-up"></v-app-bar-nav-icon>
      
      <v-toolbar-title>
        <router-link to="/">
          <v-img :src="logo" class="logo"></v-img>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      
      <transition name="fade">
        <div v-show="!searchActive">
          <div  class="menu d-none d-md-flex">
            <ul>
            <router-link 
                    tag="li"
                    class="px-2" 
                    role="button" 
                    v-for="item in items" 
                    :key="item.text" 
                    :to="item.path">{{ item.text}}</router-link>
            </ul>
          </div>

        </div>
      </transition>

      <div class="p-relative d-none d-md-block">
        <transition name="fade">
          <div v-show="searchActive" class="div-search">
            <v-text-field 
              placeholder="Pesquisar" 
              class="input-search" 
              ref="inpSearch"
              @blur="searchActive = false"></v-text-field>
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
          {{ $store.state.carrinho.length }}
        </v-btn>
      </div>

      <div class="usuario d-none d-md-block">
        <v-btn>
          <v-icon left>mdi-account</v-icon>
          {{ $store.state.usuario }}
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="menuMobile" 
      absolute temporary app>
      <v-list-item two-line>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ $store.state.usuario}}</v-list-item-title>
          <v-list-item-subtitle>Logado</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item link to="/">
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="item in items" :key="item.text" link :to="item.path">
          <v-list-item-content>
            <v-list-item-title>{{ item.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-navigation-drawer v-model="carrinho"
      fixed
      bottom
      right
      temporary
      width="400"
      class="carrinho-menu"
    >

      <v-container
        id="scroll-target"
        class="overflow-y-auto carrinho-lista-itens"
      >
          <CarrinhoItem v-for="(produto, index) in $store.state.carrinho" 
            :key="index" 
            :produto="produto"
            class="mb-1" />
      </v-container>

      <v-card class="pa-5 carrinho-rodape">
        <div class="text-center carrinho-total"> {{ TotalCarrinho | numeroPreco }} </div>
        <v-divider color="#444" class="my-2"></v-divider>
        <v-row>
          <v-col class="col-6 p-2">
            <v-btn color="success" width="100%"> Finalizar </v-btn>
          </v-col>
          <v-col class="col-6 p-2">
            <v-btn color="error" width="100%">Limpar</v-btn>
          </v-col>
        </v-row>

      </v-card>
    </v-navigation-drawer>

  </nav>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CarrinhoItem from './Header/CarrinhoItem.vue';

@Component({
  components: {
    CarrinhoItem,
  },
})
export default class Header extends Vue {
  private searchActive: boolean = false;
  private carrinho: boolean = false;
  private menuMobile: boolean = false;
  private usuario: string = 'Rodolfo dos Santos';
  private logo: string = require('../assets/logo/logo.svg');
  private items: object[] = [
        {
          path: '/moletons',
          text: 'Moletons',
          icon: 'mdi-tshirt-crew',
        },
        {
          path: '/bones',
          text: 'Bonés',
          icon: 'mdi-tshirt-crew',
        },
        {
          path: '/jeans',
          text: 'Jeans',
          icon: 'mdi-tshirt-crew',
        },
        {
          path: '/camisetas',
          text: 'Camisetas',
          icon: 'mdi-tshirt-crew',
        },
        {
          path: '/Shorts',
          text: 'Shorts',
          icon: 'mdi-tshirt-crew',
        },
        {
          path: '/Acessorios',
          text: 'Acessórios',
          icon: 'mdi-tshirt-crew',
        },
      ];

  get TotalCarrinho(): number {
    let total = 0;
    this.$store.state.carrinho.forEach((el: any) => {
      total = total + Number(el.preco);
    });
    return total;
  }

  private searchShow(): void {
    this.searchActive = true;
    const theField = this.$refs.inpSearch as HTMLInputElement;
    this.$nextTick(() => theField.focus());
  }

}
</script>



<style lang="scss" scoped>
@import '@/sass/custom.scss';

.carrinho-lista-itens {
  height: 80%;
  @media(max-width: $bk-md) {
    max-height: 70%;
  }
}

.carrinho-menu {
  min-height: 500px;
  @media(max-width: $bk-md) {
    border-top: $primary 5px solid
  }
}

.carrinho-total {
  color: lighten($primary, 30%);
}

.carrinho-rodape {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: darken($secondary, 5%);
  border-top: $primary solid 5px;
  height: 20%;

  @media(max-width: $bk-md) {
    max-height: 30%;
  }

  .row {
    align-items: flex-end;
  }
}

.app-bar {
  background-color: darken($secondary, 10%);
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
  font-size: .90rem;
  ul {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-left: 10px;
    list-style: none;
    li {
      padding: 0 15px;
      transition: .5s;
      text-transform: uppercase;
      &:hover {
        color: $primary;
        cursor: pointer;
      }
    }
  }
}

</style>