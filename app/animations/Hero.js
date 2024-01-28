import gsap from 'gsap'
import Animation from '../classes/Animations'

export default class Hero extends Animation {
  constructor ({ element, elements }) {
    super({
      isScrub: true,
      element,
      elements: {
        ...elements,
        background: '.home__hero__background',
        backgroundImg: '.home__hero__background__img',
        quote: '.home__hero__quote',
        secondary_quote: '.home__hero__secondary__quote'
      }
    })
  }

  onScroll () {
    const timeline = gsap.timeline()

    timeline.from(this.elements.backgroundImg, {
      y: '10%',
      rotate: '20deg',
      scrollTrigger: {
        trigger: this.element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  }

  onResize () {
  }
}
