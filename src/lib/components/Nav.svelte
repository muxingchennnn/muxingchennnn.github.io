<script>
	import { page, navigating } from "$app/state";
	import { lenis } from "$lib/utils/lenis";
	import { goto } from "$app/navigation";

	let window;

	$inspect(navigating);

	const navBarTabs = [
		{ path: "/", label: "Work" },
		// { path: "/", label: "Research" },
		{ path: "/resume", label: "Resume" }
		// { path: "/gallery", label: "Gallery" }
	];

	const smoothScrollAndNavigate = async (path) => {
		// Return if already at top
		if (window.scrollY === 0) {
			await goto(path);
			return;
		}

		// Scroll then navigate
		await new Promise((resolve) => {
			const handleScroll = ({ _isScrolling }) => {
				if (!_isScrolling && window.scrollY === 0) {
					lenis.off("scroll", handleScroll);
					resolve();
				}
			};

			lenis.on("scroll", handleScroll);
			lenis.scrollTo(0, { duration: 0.5 });
		});

		await goto(path);
	};
</script>

<svelte:window bind:this={window} />
<nav
	class="card-style sticky top-0 z-50 mx-auto flex w-full justify-between px-6 py-4"
	style:view-transition-name="nav-bar"
>
	<div>Logo</div>
	<div class="flex gap-8">
		{#each navBarTabs as tab (tab.label)}
			<a
				class="relative"
				class:page-indicator={page.url.pathname === tab.path}
				aria-current={page.url.pathname === tab.path}
				href={tab.path}
				onclick={(e) => {
					e.preventDefault();
					console.log(page.url.pathname, tab.path);
					if (page.url.pathname !== tab.path) {
						smoothScrollAndNavigate(tab.path);
					}
				}}
			>
				{tab.label}
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
