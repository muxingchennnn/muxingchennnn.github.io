<script>
	import "../app.css";
	import "lenis/dist/lenis.css";
	import "@fontsource-variable/source-serif-4";
	// import "@fontsource-variable/source-serif-4/opsz.css";
	import "@fontsource-variable/source-serif-4/wght-italic.css";
	// import "@fontsource-variable/source-serif-4/opsz-italic.css";
	import "@fontsource-variable/geist";
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
	/* @font-face {
		font-family: "Romie";
		font-style: italic;
		font-display: swap;
		font-weight: 400;
		src:
			url($lib/fonts/Romie-Italic.woff2) format("woff2"),
			url($lib/fonts/Romie-Italic.woff) format("woff");
	} */

	@font-face {
		font-family: "Romie";
		font-style: italic;
		font-display: swap;
		font-weight: 400;
		src:
			url(/fonts/Romie-Italic.woff2) format("woff2"),
			url(/fonts/Romie-Italic.woff) format("woff");
	}
</style>
