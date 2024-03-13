import Animation from 'classes/Animations'
import gsap from 'gsap'
import { calculate, split } from '../utils/text'
import { each } from 'lodash'

export default class Paragraph extends Animation {
  constructor ({ element, elements }) {
    super({ element, elements })

    this.elementLinesSpans = split({ element: this.element, append: true })
  }

  animateIn (entry) {
    each(this.elementLines, (line, i) => {
      setTimeout(() => {
        each(line, span => {
          span.classList.toggle('active', entry.isIntersecting)
        })
      }, 200 * i)
    })
  }

  animateOut () {
    // gsap.set(this.element, {
    //   autoAlpha: 0
    // }, 0)
  }

  onResize () {
    this.elementLines = calculate(this.elementLinesSpans)
  }
}
