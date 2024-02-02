<script lang="ts">
  export let title: string;
  export let body: string | number;
  export let background: string;
</script>

<div class="card {background} m-4 space-y-8 grid">
  <header class="card-header">
    <h4 class="h4">{title}</h4>
  </header>
  <section class="p-4 place-self-end text-right">
    <h2 class="h2">{body}</h2>
  </section>
</div>
