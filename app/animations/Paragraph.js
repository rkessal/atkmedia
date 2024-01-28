import Animation from 'classes/Animations'
import gsap from 'gsap'
import { calculate, split } from '../utils/text'
import { each } from 'lodash'

export default class Paragraph extends Animation {
  constructor ({ element, elements }) {
    super({ element, elements })

    this.elementLinesSpans = split({ element: this.element, append: true })
  }

  animateIn () {
    this.timeline = gsap.timeline()

    this.timeline.set(this.element, {
      autoAlpha: 1
    })

    each(this.elementLines, (line, i) => {
      this.timeline.fromTo(line, {
        autoAlpha: 0,
        y: '100%'
      }, {
        delay: i * 0.2,
        autoAlpha: 1,
        ease: 'expo.out',
        duration: 1.5,
        y: '0%'
      }, 0)
    })
  }

  animateOut () {
    gsap.set(this.element, {
      autoAlpha: 0
    }, 0)
  }

  onResize () {
    this.elementLines = calculate(this.elementLinesSpans)
  }
}
