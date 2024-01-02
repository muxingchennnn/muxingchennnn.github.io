<script>
  import Notice from '$lib/components/Notice.svelte'
  import Header from '$lib/components/Header.svelte'
  import Intro from '$lib/components/Intro.svelte'
  import Work from '$lib/components/Work.svelte'

  import { useLenis } from '$lib/utilities/lenis.js'
  import { Toast } from 'flowbite-svelte'
  import { fly } from 'svelte/transition'
</script>

<main use:useLenis>
  <section>
    <!-- <Notice /> -->
    <!-- <Header /> -->
    <Intro />
  </section>
  <Work />
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
