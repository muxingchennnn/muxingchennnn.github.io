<script>
	import { resumeData } from "$lib/data/resumeData";
	let { header, sectionDivider, itemName, itemDateFloat, itemTitleAndDescription, itemSkills } =
		$props();
</script>

<div class="h-16"></div>
<!-- Header-->
<section class="resume-grid space-y-1 sm:space-y-2">
	{@render header()}
</section>
<!-- Sections-->
<section class="resume-grid items-baseline">
	{#each resumeData as sectionContent, i (i)}
		<!-- Section Dividers-->
		{@render sectionDivider(sectionContent.section)}

		<!-- Experience Section -->
		{#if sectionContent.section === "EXPERIENCE"}
			{#each sectionContent.items as item, i (i)}
				{@render itemName(item.company, item.url)}
				{@render itemDateFloat(item.date, item.location)}
				{@render itemTitleAndDescription(item.title, item.date, item.description)}
			{/each}
		{/if}

		<!-- Research Section -->
		{#if sectionContent.section === "RESEARCH"}
			{#each sectionContent.items as item, i (i)}
				{#if i < 1}
					{@render itemName(item.institution, item.url)}
				{/if}
				{@render itemDateFloat(item.date, item.location)}
				{@render itemTitleAndDescription(item.title, item.date, item.description)}
			{/each}
		{/if}

		<!-- Education Section -->
		{#if sectionContent.section === "EDUCATION"}
			{#each sectionContent.items as item, i (i)}
				{@render itemName(item.institution, item.url)}
				{@render itemDateFloat(item.date, item.location)}
				{@render itemTitleAndDescription(item.degree, item.date, item.description)}
			{/each}
		{/if}

		<!-- Skills Section -->
		{#if sectionContent.section === "SKILLS"}
			{#each sectionContent.items as item, i (i)}
				{@render itemName(item.skillType, item.url)}
				<!-- {@render itemDateFloat(item.skillType)} -->
				{@render itemSkills(item.skills)}
			{/each}
		{/if}

		<!-- Leadership Section -->
		{#if sectionContent.section === "ECs"}
			{#each sectionContent.items as item, i (i)}
				{@render itemName(item.organization, item.url)}
				{@render itemDateFloat(item.date, item.location)}
				{@render itemTitleAndDescription(item.title, item.date, item.description)}
			{/each}
		{/if}
	{/each}
</section>
<div class="h-48"></div>

<style>
	@reference "../../app.css";
</style>
