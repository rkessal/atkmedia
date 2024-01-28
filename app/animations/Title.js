import Animation from 'classes/Animations'
import gsap from 'gsap'
import { calculate, split } from '../utils/text'
import { each } from 'lodash'

export default class Title extends Animation {
  constructor ({ element, elements }) {
    super({ element, elements })

    split({ element: this.element, append: true })
    split({ element: this.element, append: true })

    this.elementLinesSpans = this.element.querySelectorAll('span span')
  }

  animateIn () {
    const timeline = gsap.timeline()

    timeline.set(this.element, {
      autoAlpha: 1
    })

    each(this.elementLines, (line, i) => {
      timeline.fromTo(line, {
        y: '100%'
      }, {
        delay: i * 0.1,
        ease: 'expo.out',
        duration: 1.5,
        y: '0%'
      }, 0)
    })
  }

  animateOut () {
    gsap.set(this.element, {
      autoAlpha: 0
    })
  }

  onResize () {
    this.elementLines = calculate(this.elementLinesSpans)
  }
}
