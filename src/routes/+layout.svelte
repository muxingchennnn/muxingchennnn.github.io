<script>
	import "../app.css";
	import "$lib/styles/fonts.css";
	import "lenis/dist/lenis.css";
	import { windowWidth, windowHeight } from "$lib/globalStates.svelte";
	import { lenis, smoothScroll } from "$lib/utils/lenis";
	import ViewTransition from "$lib/components/ViewTransition.svelte";

	let { children } = $props();
</script>

<svelte:window bind:innerWidth={windowWidth.value} bind:innerHeight={windowHeight.value} />
<ViewTransition />
<nav>
	<ul class="flex gap-4">
		<li><a href="/">Home</a></li>
		<li><a href="/resume">Resume</a></li>
	</ul>
</nav>
<main use:smoothScroll>
	{@render children()}
</main>

<style>
</style>
