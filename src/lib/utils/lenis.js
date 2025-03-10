import Lenis from "lenis";

export function smoothScroll() {
	// Initialize Lenis
	const lenis = new Lenis({
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
	});

	// Use requestAnimationFrame to continuously update the scroll
	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);

	lenis.on("scroll", (e) => {
		// console.log(e);
	});
}
