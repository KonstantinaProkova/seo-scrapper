<script lang="ts">
  export let title: string = "";
  //   export let content: string = "";
  export let error: string = "";
  export let success: boolean = false;
</script>

<div>
  <h2 class="bg-sky-700 border border-sky-500 p-2 rounded-md p-4;">{title}</h2>
  {#if success}
    <p class="text-sm text-sky-400 pt-2 pb-2">
      <slot></slot>
    </p>
  {:else}
    <p class="text-red-300 text-sm pt-2 pb-4">{error}</p>
  {/if}
</div>
