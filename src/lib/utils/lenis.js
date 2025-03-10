import Lenis from "lenis";

export let lenis;

export function smoothScroll() {
	// Initialize Lenis
	lenis = new Lenis({
		autoRaf: true,
		duration: 1.2
	});

	// Use requestAnimationFrame to continuously update the scroll
	// function raf(time) {
	// 	lenis.raf(time);
	// 	requestAnimationFrame(raf);
	// }
	// requestAnimationFrame(raf);
}
