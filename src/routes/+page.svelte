<script>
	// import Grid from "$lib/components/Grid.svelte";
	import Intro from "$lib/components/Intro.svelte";
	import Works from "$lib/components/Works.svelte";
	import { smoothScroll } from "$lib/utils/lenis";
</script>

<div class="h-16"></div>
<!-- <Grid /> -->
<main use:smoothScroll>
	<Intro />
	<div class="h-32"></div>
	<Works />
	<!-- <Works /> -->
</main>
<div class="h-64"></div>

<style>
</style>
