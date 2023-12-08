import Lenis from '@studio-freight/lenis'

export function useLenis(el) {
  const lenis = new Lenis()

  lenis.on('scroll', (e) => {
    // console.log(e);
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  // return {
  //   destroy() {
  //     // Cleanup
  //     lenis.off('scroll');
  //   },
  // };
}
