<script>
	let columns = $state(0);
	let width = $state(400);

	function getBreakpointValue(size) {
		// Get the computed value of the CSS custom property
		let styles = getComputedStyle(document.documentElement);
		let breakpoint = styles.getPropertyValue(`--breakpoint-${size}`);

		return parseInt(breakpoint.replace("px", ""));
	}

	$inspect(getBreakpointValue("xs"));

	function updateColumns(width) {
		if (width >= getBreakpointValue("lg")) {
			columns = 12;
		} else if (width >= getBreakpointValue("sm")) {
			columns = 8;
		} else {
			columns = 4;
		}
	}

	$effect(() => {
		updateColumns(width);
	});
</script>

<svelte:window bind:innerWidth={width} />
<div class="grid-ctn">
	{#each Array(columns), index}
		<div class="col-span-1 bg-gray-500 text-center text-base font-bold">
			Col{index + 1}
		</div>
	{/each}
</div>
