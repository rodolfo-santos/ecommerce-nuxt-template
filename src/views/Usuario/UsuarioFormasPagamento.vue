<template>
  <CreditCardForm />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreditCardForm from '@/components/Pagamento/CreditCardForm.vue';

@Component({
  components: {
    CreditCardForm,
  },
})
export default class UsuarioEditar extends Vue {}
</script>

<style></style>
