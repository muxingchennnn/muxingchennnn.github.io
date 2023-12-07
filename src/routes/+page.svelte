<script>
	import project from '$lib/projects.js';
	import Notice from '$lib/Notice.svelte';
	import Header from '$lib/Header.svelte';
	import Intro from '$lib/Intro.svelte';
	import Work from '$lib/Work.svelte';

	let hoveredButton = null;

	function handleHover(id, isHovered) {
		hoveredButton = isHovered ? id : null;
	}
</script>

<main>
	<section>
		<Notice />
		<!-- <Header /> -->
		<Intro />
	</section>
	<p class="font-romie italic text-2xl">Work</p>
	{#each project as prop (prop.id)}
		<Work
			{prop}
			on:hover={(e) => handleHover(prop.id, e.detail)}
			hovered={hoveredButton === prop.id}
			notHovered={hoveredButton !== null && hoveredButton !== prop.id}
		/>
	{/each}
</main>

<style>
	section {
		/* height: 100vh; */
	}
</style>
