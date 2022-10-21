<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  asyncData({ redirect }) {
    redirect('/user/edit');
  }
})
export default class extends Vue {}
</script>
