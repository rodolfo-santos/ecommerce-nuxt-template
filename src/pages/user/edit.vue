<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { UserForm } from '~/components/utils';

@Component({
  components: { UserForm }
})
export default class extends Vue {}
</script>

<template>
  <UserForm class="form-user"> Salvar Alterações </UserForm>
</template>
