<script>
	import Project from '$lib/components/Project.svelte';
	import projectList from '$lib/utilities/projectList.js';

	let hoveredProject = null;

	function handleHover(id, isHovered) {
		hoveredProject = isHovered ? id : null;
	}
</script>

<p class="font-serif text-2xl italic">Work</p>
{#each projectList as prop (prop.id)}
	<Project
		{prop}
		on:hover={(e) => handleHover(prop.id, e.detail)}
		hovered={hoveredProject === prop.id}
		notHovered={hoveredProject !== null && hoveredProject !== prop.id}
	/>
{/each}
