<script lang="ts">
  import '../app.postcss';

  import { AppBar, AppShell, Toast, initializeStores } from '@skeletonlabs/skeleton';

  initializeStores();
</script>

<Toast />
<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <h2 class="h2">PalCON</h2>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <slot />
</AppShell>
