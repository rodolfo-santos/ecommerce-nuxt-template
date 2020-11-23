<template>
    <nav>
      <v-app-bar fixed>
          <v-app-bar-nav-icon 
          @click.stop="drawer = !drawer" 
          class="hidden-md-and-up"></v-app-bar-nav-icon>
          <v-toolbar-title>
            <router-link to="/">
              <v-img :src="logo" class="logo"></v-img>
            </router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>
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

            <div class="carrinho flex-center ml-10">
              <v-btn>
                <v-icon left>mdi-cart</v-icon>
                {{ $store.state.carrinho }}
              </v-btn>
            </div>

            <div class="usuario ">
              <v-btn>
                <v-icon left>mdi-account</v-icon>
                {{ $store.state.usuario }}
              </v-btn>
            </div>

          </div>
          <div class="carrinho flex-center ml-10 hidden-md-and-up">
            <v-icon left>mdi-cart</v-icon>
            {{ $store.state.carrinho }}
          </div>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute temporary app>
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
    </nav>
</template>

<script>

export default {
  name: 'Header',
  data() {
    return {
      drawer: null,
      usuario: 'Rodolfo dos Santos',
      items: [
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
      ],
      logo: require('../assets/logo/logo.svg'),
    };
  },
};
</script>



<style lang="scss" scoped>
@import '@/sass/variaveis.scss';
@import '@/sass/custom.scss';

.search-form {
  width: 300px;
  margin-bottom: -15px;;
}

.logo {
  max-width: 50px;
}

.router-link-exact-active {
  color: $primary;
}

.menu {
  width: 100%;
  display: flex;
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