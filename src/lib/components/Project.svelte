<script>
  import { blur } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let prop
  $: console.log(prop)
  export let hovered = false
  export let notHovered = false
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section
  class:hovered
  class:not-hovered={notHovered}
  on:mouseenter={() => dispatch('hover', true)}
  on:mouseleave={() => dispatch('hover', false)}
>
  <div class="content">
    <a
      class="block mb-2 font-700 text-5xl tracking-wide"
      href={prop.source}
      target="_blank"
      rel="noopener noreferrer"
    >
      {prop.title}</a
    >
    <div class="types mb-4 flex gap-2">
      {#each prop.types as type}
        <span class="type text-2xl font-200">#{type}</span>
      {/each}
    </div>
    <div class="skills flex gap-2">
      {#each prop.skills as skill}
        <span class="skill">{skill}</span>
      {/each}
    </div>
  </div>
</section>

<style>
  section {
    /* margin-top: 2rem; */
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-top: 1px solid #000;
    /* border-bottom: 1px solid #000; */

    transition: all 0.2s ease;
  }

  .content {
    transition: all 0.2s ease;
  }

  .content:hover {
    transform: translateX(2rem);
  }

  .types {
    font-size: 1.5rem;
  }

  .skill {
    font-weight: 400;
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px dashed #000;
  }

  .hovered {
    opacity: 1;
  }

  .hovered .content {
    opacity: 1;
    transform: translateX(2rem);
  }

  .not-hovered {
    opacity: 0.2;
  }
</style>
