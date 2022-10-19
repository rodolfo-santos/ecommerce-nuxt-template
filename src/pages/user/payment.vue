<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreditCardForm from '@/components/pages/payment/CreditCardForm.vue';

@Component({ components: { CreditCardForm } })
export default class extends Vue {}
</script>

<template>
  <CreditCardForm />
</template>
