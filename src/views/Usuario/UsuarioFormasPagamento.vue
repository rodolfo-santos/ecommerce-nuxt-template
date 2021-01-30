<template>
  <CreditCard />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreditCard from '@/components/CreditCard.vue';

@Component({
  components: {
    CreditCard,
  },
})
export default class UsuarioEditar extends Vue {}
</script>

<style></style>
