<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { parsePlayers, type Player } from '$lib/player.js';
  import { onMount } from 'svelte';

  export let data;

  onMount(() => {
    const interval = setInterval(() => {
      invalidateAll();
    }, 5000);

    return () => clearInterval(interval);
  });
</script>

<div class="container h-full mx-auto grid lg:grid-cols-3">
  <div class="card variant-ghost-primary m-4 space-y-8 grid">
    <header class="card-header">
      <h4 class="h4">Name</h4>
    </header>
    <section class="p-4 place-self-end text-right">
      <h2 class="h2">{data.serverName}</h2>
    </section>
  </div>
  <div class="card variant-ghost-secondary m-4 space-y-8 grid">
    <header class="card-header grow">
      <h4 class="h4">Version</h4>
    </header>
    <section class="p-4 place-self-end">
      <h2 class="h2">{data.serverVersion}</h2>
    </section>
  </div>
  <div class="card variant-ghost-error m-4 space-y-8 grid">
    <header class="card-header grow">
      <h4 class="h4">Players Online</h4>
    </header>
    <section class="p-4 place-self-end">
      <h2 class="h2">{data.players.length}</h2>
    </section>
  </div>
  <div class="card variant-ghost-surface m-4 space-y-8 lg:col-span-3 lg:row-span:2">
    <header class="card-header">
      <h3 class="h3">Players</h3>
    </header>
    <section class="p-4">
      <div class="table-container">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Player UID</th>
              <th>Steam ID</th>
            </tr>
          </thead>
          <tbody>
            {#if data.players.length > 0}
              {#each data.players as player}
                <tr>
                  <td>{player.name}</td>
                  <td>{player.playerUid}</td>
                  <td>{player.steamId}</td>
                </tr>
              {/each}
            {:else}
              <tr>
                <td colspan="3" class="text-center">No Players Online</td>
              </tr>
            {/if}
          </tbody>
        </table>
      </div>
    </section>
  </div>
</div>
