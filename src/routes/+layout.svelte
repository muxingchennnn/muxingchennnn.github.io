<script>
	import "../app.css";
	import "$lib/styles/fonts.css";
	import "lenis/dist/lenis.css";
	import { windowWidth, windowHeight } from "$lib/globalStates.svelte";
	import { lenis, smoothScroll } from "$lib/utils/lenis";
	import ViewTransition from "$lib/components/ViewTransition.svelte";
	import Nav from "$lib/components/Nav.svelte";

	let { children } = $props();
</script>

<svelte:window bind:innerWidth={windowWidth.value} bind:innerHeight={windowHeight.value} />

<ViewTransition />
<Nav />
<main use:smoothScroll class="relative overflow-x-hidden">
	{@render children()}
</main>

<style>
	/* These properties seem bypass Svelte's default CSS scoping */
	::view-transition-old(root) {
		animation: 300ms cubic-bezier(0, 0, 0.2, 1) both fade-out;
		/* animation: 1.5s cubic-bezier(0.87, 0, 0.13, 1) both move-out; */
	}

	::view-transition-new(root) {
		/* duration / delay / timing-function / fill-mode / keyframes */
		animation: 1s 800ms cubic-bezier(0, 0, 0.2, 1) both fade-in;
		/* animation: 1.5s cubic-bezier(0.87, 0, 0.13, 1) both move-in; */
	}

	::view-transition-group(identity) {
		animation-delay: 300ms;
		animation-duration: 500ms;
		animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		animation-fill-mode: both;
	}

	/* ::view-transition-old(identity),
	::view-transition-new(identity) {
	} */

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes fade-out {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes move-out {
		from {
			opacity: 1;
			transform: translateY(0);
		}
		to {
			opacity: 0;
			transform: translateY(-35%);
		}
	}

	@keyframes move-in {
		from {
			clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
		}
		to {
			clip-path: polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%);
		}
	}
</style>
