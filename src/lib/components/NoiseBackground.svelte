<script>
	import { windowWidth, windowHeight } from "$lib/globalStates.svelte";

	let { baseFrequencyValue = 0.65, numOctavesValue = 3 } = $props();
</script>

<svg class="hidden" xmlns="http://www.w3.org/2000/svg">
	<filter id="noiseFilter">
		<feTurbulence
			type="fractalNoise"
			baseFrequency={baseFrequencyValue}
			numOctaves={numOctavesValue}
			stitchTiles="noStitch"
		/>
	</filter>
	<rect width="100%" height="100%" filter="url(#noiseFilter)" />
</svg>

<div
	class="bg-background fixed inset-0 -z-10 h-full w-full"
	style:filter="contrast(100%) brightness(100%) grayscale(100%) opacity(0.5)"
	style:backdrop-filter="url(#noiseFilter)"
></div>
