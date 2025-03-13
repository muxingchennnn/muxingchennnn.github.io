<script>
	import { page } from "$app/state";

	const navBarTabs = [
		{ path: "/", label: "Home" },
		{ path: "/resume", label: "Resume" }
	];
</script>

<nav class="flex gap-4">
	{#each navBarTabs as { path, label }}
		<a
			href={path}
			onclick={(e) => {
				if (page.url.pathname === path) {
					e.preventDefault();
				}
			}}
		>
			{label}
		</a>
	{/each}
</nav>
