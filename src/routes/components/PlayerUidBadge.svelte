<script lang="ts">
  import type { Player } from '$lib/player';
  import { IconId } from '@tabler/icons-svelte';
  import { copy } from 'svelte-copy';

  export let player: Player;
  export let toastCopied: (event: CustomEvent<string>) => any;
</script>

<div class="text-sm opacity-50 mb-1">
  <div
    title="Player UID"
    class="chip variant-soft hover:variant-filled w-full justify-between"
    use:copy={player.playerUid}
    on:svelte-copy={toastCopied}
  >
    <IconId size={16} class="mr-1" />
    {player.playerUid}
  </div>
</div>
