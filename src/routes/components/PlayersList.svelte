<script lang="ts">
  import type { ServerInfo } from '$lib/serverinfo';
  import PlayerUidBadge from './PlayerUidBadge.svelte';
  import SteamIdBadge from './SteamIdBadge.svelte';

  export let data: ServerInfo;
  export let toastCopied: (event: CustomEvent<string>) => any;
</script>

<div class="card variant-ringed-tertiary m-4 space-y-8 lg:col-span-3 lg:row-span:2">
  <header class="card-header">
    <h3 class="h3">Players</h3>
  </header>
  <section class="p-4 grid md:grid-cols-2 lg:grid-cols-4">
    {#if data.players.length > 0}
      {#each data.players as player}
        <div class="card variant-ringed-secondary p-4 mb-2 mx-2 grid grid-cols-1">
          <div class="font-bold pb-2">{player.name}</div>
          <PlayerUidBadge {player} {toastCopied} />
          <SteamIdBadge {player} {toastCopied} />
        </div>
      {/each}
    {:else}
      <div class="card variant-ringed-secondary p-4 mb-2 mx-2 col-span-4 text-center">
        No Players Online
      </div>
    {/if}
  </section>
</div>
