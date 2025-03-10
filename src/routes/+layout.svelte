<script>
	import "../app.css";
	import "lenis/dist/lenis.css";
	import "@fontsource-variable/source-serif-4";
	import "@fontsource-variable/source-serif-4/opsz.css";
	import "@fontsource-variable/source-serif-4/wght-italic.css";
	import "@fontsource-variable/source-serif-4/opsz-italic.css";
	import "@fontsource-variable/geist";
	import { windowWidth } from "$lib/globalStates.svelte";

	let { children } = $props();
</script>

<svelte:window bind:innerWidth={windowWidth.value} />
{@render children()}

<style>
</style>
