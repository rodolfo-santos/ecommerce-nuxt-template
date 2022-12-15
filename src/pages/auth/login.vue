<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { LoginForm } from '~/components/pages/auth';

@Component({ components: { LoginForm } })
export default class extends Vue {}
</script>

<template>
  <LoginForm />
</template>
