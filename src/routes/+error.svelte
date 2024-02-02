<script>
  import { IconAlertTriangleFilled } from '@tabler/icons-svelte';
  import { page } from '$app/stores';
</script>

<div class="container h-full mx-auto grid grid-cols-1">
  {#if $page.error}
    <aside class="alert mt-4 variant-filled-error">
      <!-- Icon -->
      <div class="fill-white"><IconAlertTriangleFilled /></div>
      <!-- Message -->
      <div class="alert-message">
        <h3 class="h3">Something went wrong</h3>
        <p>{$page.error.message}</p>
        <p>Check the server logs for more information</p>
      </div>
    </aside>
  {/if}
</div>
