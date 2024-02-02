<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { onMount } from 'svelte';
  import { getToastStore } from '@skeletonlabs/skeleton';
  import type { ServerInfo } from '$lib/serverinfo';
  import ServerInfoHeader from './components/ServerInfoHeader.svelte';
  import PlayersList from './components/PlayersList.svelte';

  export let data: ServerInfo;
  const toastStore = getToastStore();

  onMount(() => {
    const interval = setInterval(() => {
      invalidateAll();
    }, 5000);

    return () => clearInterval(interval);
  });

  function toastCopied() {
    toastStore.trigger({
      message: 'Copied to clipboard',
      background: 'variant-ghost-success',
      hideDismiss: true,
    });
  }

  data.players = [];
</script>

<div class="container h-full mx-auto grid lg:grid-cols-3">
  <ServerInfoHeader title="Name" body={data.serverName} background="variant-ghost-primary" />
  <ServerInfoHeader
    title="Version"
    body={data.serverVersion}
    background="variant-ghost-secondary"
  />
  <ServerInfoHeader
    title="Players Online"
    body={data.players.length}
    background="variant-ghost-error"
  />
  <PlayersList {data} {toastCopied} />
</div>
