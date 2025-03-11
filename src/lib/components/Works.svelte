<script>
	import { projectList } from "$lib/data/projectList";
	import { windowWidth } from "$lib/globalStates.svelte";

	let hoveredProject = $state(null);
	// $inspect(hoveredProject);
</script>

<section class="grid-ctn">
	<p class="font-display col-span-full mb-[0.2em] text-[1.125rem] leading-none lg:text-[1.5rem]">
		Selected Work
	</p>
	{#each projectList as project, i (i)}
		<!-- project outer wrapper -->
		<div
			role="listitem"
			class="border-t border-gray-400 py-[1.5rem] lg:col-span-8 lg:col-start-1 lg:py-[2rem]"
			class:col-span-full={windowWidth.value < 1024}
			onmouseover={() => (hoveredProject = project)}
			onmouseleave={() => (hoveredProject = null)}
			onfocus={() => (hoveredProject = project)}
			onblur={() => (hoveredProject = null)}
		>
			<!-- project inner wrapper -->
			<div
				class="transition-all duration-250 ease-in-out"
				class:translate-x-[1rem]={hoveredProject?.title === project.title}
				class:opacity-30={hoveredProject && hoveredProject.title !== project.title}
				class:blur-[1px]={hoveredProject && hoveredProject.title !== project.title}
			>
				<!-- project title -->
				<a class="project-title" href={project.url} target="_blank" rel="noopener noreferrer"
					>{project.title}</a
				>
				<!-- project type -->
				<div class="project-type -mt-0.5 flex flex-wrap gap-x-[0.8em]">
					{#each project.types as type}
						<span class="text-nowrap text-gray-500">#{type}</span>
					{/each}
				</div>
				<!-- project tech -->
				<div class="mt-3 flex flex-wrap items-center gap-2 lg:mt-4">
					{#each project.techs as tech}
						<div class="tech-chip">
							<img
								class="h-[1.25rem] transition-all duration-500 ease-in-out"
								class:grayscale={hoveredProject && hoveredProject.title !== project.title}
								src={tech.techLogo}
								alt="{tech.techName} Logo"
							/>
							<span class="text-nowrap">{tech.techName}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</section>

<style>
	@reference "../../app.css";

	/* prettier-ignore */
	.project-title {
    @apply sans-18 font-[700]
           md:sans-24
           lg:sans-32;
  }

	/* prettier-ignore */
	.project-type {
    @apply sans-14
           md:sans-16
           ;
  }

	/* prettier-ignore */
	.tech-chip {
    @apply flex items-center gap-[2px] px-[0.4em] py-[0.1em]
           sans-10
           lg:sans-14
           rounded-sm border border-gray-300 bg-gray-200/60 backdrop-blur-sm;
  }
</style>
