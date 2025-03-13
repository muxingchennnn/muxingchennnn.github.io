<script>
	import { page } from "$app/state";

	const navBarTabs = [
		{ path: "/", label: "Work" },
		// { path: "/", label: "Research" },
		{ path: "/resume", label: "Resume" }
		// { path: "/gallery", label: "Gallery" }
	];
</script>

<nav
	class="card-style sticky top-0 z-50 mx-auto flex w-full justify-between px-6 py-4"
	style:view-transition-name="navBar"
>
	<div>Logo</div>
	<div class="flex gap-8">
		{#each navBarTabs as { path, label }}
			<a
				class="relative"
				class:page-indicator={page.url.pathname === path}
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
	</div>
</nav>

<style>
	@reference "../../app.css";

	.page-indicator {
		@apply after:absolute after:bottom-[-0.5em] after:left-1/2 after:h-[0.4em] after:w-[0.4em] after:translate-x-[-50%] after:rounded-full after:bg-gray-700;
	}

	.page-indicator::after {
		view-transition-name: indicator;
	}

	/* prettier-ignore */
	.card-style {
		@apply 
    rounded-b border-b border-solid 
  bg-gray-100/60 border-gray-200 
    backdrop-blur-xs;
	}
</style>
