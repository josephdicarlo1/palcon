<script lang="ts">
  import '../app.postcss';

  import { AppBar, AppShell } from '@skeletonlabs/skeleton';
</script>

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
