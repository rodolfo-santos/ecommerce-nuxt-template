<template>
  <UsuarioForm class="form-usuario"> Salvar Alterações </UsuarioForm>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UsuarioForm from '@/components/Usuario/UsuarioForm.vue';

@Component({
  components: {
    UsuarioForm,
  },
})
export default class UsuarioEditar extends Vue {}
</script>

<style></style>
