<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import CreditCardForm from '~/components/utils/CreditCardForm.vue';

@Component({ components: { CreditCardForm } })
export default class extends Vue {}
</script>

<template>
  <CreditCardForm />
</template>
