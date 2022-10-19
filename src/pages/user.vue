<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { SubHeader } from '@/components/utils';
import { IBreadcrumb } from '@/models/data';

@Component({ components: { SubHeader } })
export default class extends Vue {
  public menuItems = [
    {
      text: 'Dados de Usuário',
      description: 'Adicione informações sobre você',
      icon: 'mdi-account',
      route: 'user-edit'
    },
    {
      text: 'Formas de Pagamento',
      description: 'Atualize os dados do seu cartão de crédito',
      icon: 'mdi-credit-card',
      route: 'user-payment'
    },
    {
      text: 'Pedidos em Andamento',
      description: 'Verifique o andamento dos seus pedidos',
      icon: 'mdi-truck-delivery',
      route: 'user-orders'
    },
    {
      text: 'Histórico de Compras',
      description: 'Verifique todas as compras feitas por você',
      icon: 'mdi-shopping',
      route: 'user-history'
    },
    {
      text: 'Falar com um seller',
      description: 'Precisa de ajuda? Fale com um seller',
      icon: 'mdi-account-voice',
      route: 'user-talk-to-seller'
    }
  ];
  public selectedMenuItemIndex: number = 0;
  public breadCrumbs: IBreadcrumb[] = [
    { text: 'Home', disabled: false, to: '/' },
    { text: 'Usuário', disabled: true, to: '/user' }
  ];

  get selectedMenuItem() {
    return this.menuItems[this.selectedMenuItemIndex];
  }

  public exit(): void {
    // this.logout();
    this.$router.push({ name: 'Login' });
  }
}
</script>

<template>
  <v-main>
    <SubHeader title="Usuário" class="mb-8" :breadCrumbs="breadCrumbs" />
    <v-container>
      <v-row>
        <v-col class="col-12 col-md-4 col-lg-3">
          <v-list nav width="100%">
            <v-list-item-group v-model="selectedMenuItemIndex" color="primary">
              <v-list-item v-for="(item, i) in menuItems" :key="i" class="btn-opcao" :to="{ name: item.route }">
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title> {{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item class="btn-opcao" @click="exit">
                <v-list-item-icon>
                  <v-icon>mdi-exit-run</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Sair</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>

        <v-col class="col-12 col-md-8 col-lg-9">
          <div class="configuracoes">
            <h2>{{ selectedMenuItem.text }}</h2>
            <p>{{ selectedMenuItem.description }}</p>
            <router-view></router-view>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style lang="scss" scoped>
@import '@/sass/custom';

.btn-opcao {
  border-bottom: solid 1px lighten($secondary, 5%);
}

.configuracoes {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  .form-user {
    width: 100%;
    max-width: 700px;
  }
}
</style>
