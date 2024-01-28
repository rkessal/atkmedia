import gsap from 'gsap'
import Animation from '../classes/Animations'
import { calculate, split } from '../utils/text'

export default class Quote extends Animation {
  constructor ({ element, elements }) {
    super({
      isScrub: true,
      element,
      elements: {
        ...elements,
        text: '.home__quote__text',
        body: document.querySelector('body')
      }
    })
  }

  split () {
    split({ element: this.elements.text, append: true })
    split({ element: this.elements.text, append: true })

    this.elementLinesSpans = this.element.querySelectorAll('span span')
    this.elementLines = calculate(this.elementLinesSpans)
    this.elementSpans = this.element.querySelectorAll('span')
  }

  onScroll () {
    this.split()
    const timeline = gsap.timeline()

    timeline.from(this.elementLines, {
      autoAlpha: 0.1,
      duration: 1.5,
      stagger: 0.2,
      scrollTrigger: {
        trigger: this.element,
        start: 'top center',
        end: '80% bottom',
        scrub: 2
      }
    })
  }

  onResize () {
    this.elementLines = calculate(this.elementLinesSpans)
  }
}
