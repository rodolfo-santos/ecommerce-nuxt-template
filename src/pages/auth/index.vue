<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  asyncData({ redirect }) {
    redirect('/auth/login');
  }
})
export default class extends Vue {}
</script>
