<template>
  <v-main>
    <SubHeader titulo="Login" class="mb-8" :breadCrumbs="breadCrumbs" />
    <v-container>
      <v-row>
        <v-col class="col-12 col-md-4 col-lg-3 ">
          <v-list nav width="100%">
            <v-list-item-group v-model="opcaoSelecionada" color="primary">
              <v-list-item v-for="(item, i) in items" :key="i" class="btn-opcao">
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title> {{ item.text }}</v-list-item-title>
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
            <h2>{{ selecionado.text }}</h2>
            <UsuarioForm class="form-usuario" v-if="opcaoSelecionada === 0"> Salvar Alterações </UsuarioForm>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import SubHeader from '@/components/SubHeader.vue';
import UsuarioForm from '@/components/Usuario/UsuarioForm.vue';
import { mapActions } from 'vuex';

@Component({
  components: {
    SubHeader,
    UsuarioForm,
  },
  methods: mapActions('usuario', ['deslogarUsuario']),
})
export default class Usuario extends Vue {
  public menu: string[] = ['', '', '', '', ''];
  public items: object[] = [
    { text: 'Dados de Usuário', icon: 'mdi-account', select: 'dados' },
    { text: 'Formas de Pagamento', icon: 'mdi-credit-card', select: 'formas-de-pagamento' },
    { text: 'Pedidos em Andamento', icon: 'mdi-truck-delivery', select: 'meus-pedidos' },
    { text: 'Histórico de Compras', icon: 'mdi-shopping', select: 'historico-de-compras' },
    { text: 'Falar com um Vendedor', icon: 'mdi-account-voice', select: 'falar-com-vendedor' },
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
