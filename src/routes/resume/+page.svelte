<script>
	import Grid from "$lib/components/Grid.svelte";
	import NoiseBackground from "$lib/components/NoiseBackground.svelte";
	import Resume from "$lib/components/Resume.svelte";
</script>

<!-- <NoiseBackground /> -->
<!-- <Grid /> -->
<Resume
	{header}
	{sectionDivider}
	{itemName}
	{itemDateFloat}
	{itemTitleAndDescription}
	{itemSkills}
/>

{#snippet header()}
	<h1 class="col-span-full">Muxing Chen</h1>
	<h2 class="col-span-full">
		Visualization&nbsp;<span style:view-transition-name="identity"
			>Researcher, Designer & Developer</span
		>
	</h2>
{/snippet}

{#snippet sectionDivider(sectionName)}
	<div class="col-span-full mt-4 mb-2 grid grid-cols-subgrid items-center first:mt-8 sm:mb-4">
		<h3
			class="relative after:absolute after:top-1/2 after:ml-2 after:h-[0.5px] after:w-[100vw] after:bg-gray-400 lg:after:hidden"
		>
			{sectionName}
		</h3>

		<div class="hidden lg:col-span-4 lg:col-start-2 lg:block">
			<div class="h-[0.5px] bg-gray-400"></div>
		</div>
	</div>
{/snippet}

{#snippet itemName(itemName, itemUrl)}
	<div
		class="sans-16 col-span-full -mb-1 font-[700] sm:col-span-6 sm:col-start-3 md:col-span-3 md:col-start-3"
	>
		<a
			href={itemUrl ?? "#"}
			target="_blank"
			class={itemUrl ? "underline-offset-[0.25em] hover:underline" : "cursor-default"}
			onclick={(e) => {
				if (!itemUrl) e.preventDefault();
			}}>{itemName}</a
		>
	</div>
{/snippet}

{#snippet itemDateFloat(itemDate)}
	<div class="hidden sm:col-span-2 sm:block md:col-span-1 md:col-start-2">
		<p class="sans-14 font-[300] text-gray-500/70">
			{itemDate}
		</p>
	</div>
{/snippet}

{#snippet itemTitleAndDescription(itemTitleData, itemDateData, itemDescriptionData)}
	{#snippet itemTitle(itemTitle)}
		<p
			class="serif-16 col-span-full text-pretty text-gray-500/70 italic sm:col-span-6 sm:col-start-3 md:col-span-3 md:col-start-3"
		>
			{itemTitle}
		</p>
	{/snippet}

	{#snippet itemDateInline(itemDate)}
		<p class="sans-14 pl-4 text-nowrap text-gray-500/70 sm:hidden">{itemDate}</p>
	{/snippet}

	{#snippet itemDescription(itemDescription)}
		<p class="sans-16 font-[300] text-gray-900">
			{#each itemDescription as descriptionText, i (i)}
				- {@html descriptionText}<br />
			{/each}
		</p>
	{/snippet}

	<div
		class="col-span-full mb-4 last:mb-0 sm:col-span-6 sm:col-start-3 md:col-span-3 md:col-start-3"
	>
		<div class="mb-1.5 flex place-content-between items-baseline">
			{@render itemTitle(itemTitleData)}
			{@render itemDateInline(itemDateData)}
		</div>
		{@render itemDescription(itemDescriptionData)}
	</div>
{/snippet}

{#snippet itemSkills(skills)}
	<div
		class="col-span-full mb-4 last:mb-0 sm:col-span-6 sm:col-start-3 md:col-span-3 md:col-start-3"
	>
		<p class="sans-16 font-[300] text-pretty text-gray-900">
			{#each skills as skill, i (i)}
				<span>{i !== skills.length - 1 ? `${skill}, ` : `${skill}`}</span>
			{/each}
		</p>
	</div>
{/snippet}

<style>
	@reference "../../app.css";

	/* prettier-ignore */
	:global(.resume-grid) {
		@apply grid grid-cols-4 mx-[1.5rem] gap-x-[1rem] gap-y-[2px] max-w-[1024px] 
					 sm:grid-cols-8  
					 md:grid-cols-5 md:mx-[2rem] md:gap-x-[1.5rem] 
					 lg:mx-auto;
	}

	h1 {
		@apply text-[2rem] font-[700] tracking-[-0.021em];
	}

	h2 {
		@apply font-display text-[1.125rem] text-balance text-gray-500 italic sm:text-[1.5rem];
	}

	h3 {
		@apply text-[0.875rem] tracking-[0.6em] text-nowrap text-gray-500;
	}
</style>
