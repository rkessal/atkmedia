import gsap from 'gsap'
import Animation from '../classes/Animations'

export default class Footer extends Animation {
  constructor ({ element, elements }) {
    super({
      isScrub: true,
      element,
      elements: {
        ...elements,
        background: '.footer__background',
        backgroundImg: '.footer__background__img'
      }
    })
  }

  onScroll () {
    const timeline = gsap.timeline()

    timeline.from(this.elements.backgroundImg, {
      y: '4%',
      rotate: '2deg',
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
