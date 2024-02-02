<script lang="ts">
  import type { Player } from '$lib/player';
  import { IconBrandSteam } from '@tabler/icons-svelte';
  import { copy } from 'svelte-copy';

  export let player: Player;
  export let toastCopied: (event: CustomEvent<string>) => any;
</script>

<div class="text-sm opacity-50 mb-1">
  <div
    title="Steam ID"
    class="chip variant-soft hover:variant-filled w-full justify-between"
    use:copy={player.steamId}
    on:svelte-copy={toastCopied}
  >
    <IconBrandSteam size={16} class="mr-1" />
    {player.steamId}
  </div>
</div>
