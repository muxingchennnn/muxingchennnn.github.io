<script>
	// import Grid from "$lib/components/Grid.svelte";
	import Intro from "$lib/components/Intro.svelte";
	import Works from "$lib/components/Works.svelte";
	import NoiseBackground from "$lib/components/NoiseBackground.svelte";
	import { lenis, smoothScroll } from "$lib/utils/lenis";
	import { onMount } from "svelte";

	onMount(() => {
		// lenis.on("scroll", (e) => {
		// 	console.log(e);
		// });
	});
</script>

<!-- <NoiseBackground /> -->
<!-- <Grid /> -->
<div class="h-16"></div>
<Intro />
<div class="h-32"></div>
<Works />
<!-- <Works /> -->
<div class="h-64"></div>

<style>
</style>
