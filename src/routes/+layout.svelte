<script>
	import "../app.css";
	import "$lib/styles/fonts.css";
	import "lenis/dist/lenis.css";
	import { windowWidth } from "$lib/globalStates.svelte";

	let { children } = $props();
</script>

<svelte:window bind:innerWidth={windowWidth.value} />
<nav>
	<ul class="flex gap-4">
		<li><a href="/">Home</a></li>
		<li><a href="/resume">Resume</a></li>
	</ul>
</nav>
{@render children()}

<style>
</style>
