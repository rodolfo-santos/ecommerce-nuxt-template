<template>
  <v-main>
    <SubHeader titulo="Usuario" class="mb-8" :breadCrumbs="breadCrumbs" />
    <v-container>
      <v-row>
        <v-col class="col-12 col-md-4 col-lg-3 ">
          <v-list nav width="100%">
            <v-list-item-group v-model="opcaoSelecionada" color="primary">
              <v-list-item v-for="(item, i) in items" :key="i" class="btn-opcao" :to="{ name: item.route }">
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title> {{ item.texto }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item class="btn-opcao" @click="sair">
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
            <h2>{{ selecionado.texto }}</h2>
            <p>{{ selecionado.descricao }}</p>
            <router-view></router-view>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import SubHeader from '@/components/SubHeader.vue';
import { mapActions } from 'vuex';

@Component({
  components: {
    SubHeader,
  },
  methods: mapActions('usuario', ['deslogarUsuario']),
})
export default class Usuario extends Vue {
  public menu: string[] = ['', '', '', '', ''];
  public items: object[] = [
    {
      texto: 'Dados de Usuário',
      descricao: 'Adicione informações sobre você',
      icon: 'mdi-account',
      route: 'UsuarioEditar',
    },
    {
      texto: 'Formas de Pagamento',
      descricao: 'Atualize os dados do seu cartão de crédito',
      icon: 'mdi-credit-card',
      route: 'FormasDePagamento',
    },
    {
      texto: 'Pedidos em Andamento',
      descricao: 'Verifique o andamento dos seus pedidos',
      icon: 'mdi-truck-delivery',
      route: 'Pedidos',
    },
    {
      texto: 'Histórico de Compras',
      descricao: 'Verifique todas as compras feitas por você',
      icon: 'mdi-shopping',
      route: 'HistoricoCompras',
    },
    {
      texto: 'Falar com um Vendedor',
      descricao: 'Precisa de ajuda? Fale com um vendedor',
      icon: 'mdi-account-voice',
      route: 'FalarComVendedor',
    },
  ];
  public opcaoSelecionada: number = 0;
  public breadCrumbs: object = [
    {
      text: 'Home',
      disabled: false,
      to: '/',
    },
    {
      text: 'Usuario',
      disabled: true,
      to: '/usuario',
    },
  ];
  public deslogarUsuario: () => void;

  get selecionado(): object {
    return this.items[this.opcaoSelecionada];
  }

  public sair(): void {
    this.deslogarUsuario();
    this.$router.push({ name: 'Login' });
  }
}
</script>

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

  .form-usuario {
    width: 100%;
    max-width: 700px;
  }
}
</style>
