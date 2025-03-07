<script>
	import '../app.css';
	import '@fontsource-variable/source-serif-4';
	import '@fontsource-variable/source-serif-4/opsz.css';
	import '@fontsource-variable/source-serif-4/wght-italic.css';
	import '@fontsource-variable/source-serif-4/opsz-italic.css';
	import '@fontsource-variable/geist';

	let { children } = $props();
</script>

{@render children()}

<style>
	@font-face {
		font-family: 'Romie';
		font-style: italic;
		font-display: swap;
		font-weight: 400;
		src: url($lib/fonts/Romie-Italic.woff2) format('woff2');
	}
</style>
