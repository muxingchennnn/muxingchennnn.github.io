<script>
  import Notice from '$lib/components/Notice.svelte'
  import Header from '$lib/components/Header.svelte'
  import Intro from '$lib/components/Intro.svelte'
  import Work from '$lib/components/Work.svelte'
  import project from '$lib/utilities/projects.js'
  import { useLenis } from '$lib/utilities/lenis.js'
  import { Toast } from 'flowbite-svelte'
  import { fly } from 'svelte/transition'

  let hoveredProject = null

  function handleHover(id, isHovered) {
    hoveredProject = isHovered ? id : null
  }
</script>

<main use:useLenis>
  <section>
    <!-- <Notice /> -->
    <!-- <Header /> -->
    <Intro />
  </section>
  <p class="font-romie italic text-2xl">Work</p>
  {#each project as prop (prop.id)}
    <Work
      {prop}
      on:hover={(e) => handleHover(prop.id, e.detail)}
      hovered={hoveredProject === prop.id}
      notHovered={hoveredProject !== null && hoveredProject !== prop.id}
    />
  {/each}
</main>

<Toast
  position="top-right"
  class="w-full bg-foreground text-background"
  contentClass="w-full text-sm"
  dismissable="true"
>
  Welcome!👋&nbspI'm gradually building up my site and refining my works.🤯 <br
  /><br />Stay tuned for something awesome!✨
</Toast>

<style>
  section {
    /* height: 100vh; */
  }
</style>
