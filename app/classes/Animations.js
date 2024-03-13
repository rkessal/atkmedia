import { each } from 'lodash'
import Component from './Component'
import { ScrollTrigger } from 'gsap/all'

export default class Animation extends Component {
  constructor ({ element, elements, isScrub, params }) {
    super({ element, elements })
    this.isScrub = isScrub
    this.params = params ?? {}
    this.createObserver()
    this.animateOut()
  }

  buildThresholds () {
    const thresholds = [0]
    for (let i = 1.0; i <= this.element.offsetHeight * 100; i++) {
      const ratio = i / this.element.offsetHeight / 100
      thresholds.push(Number(ratio.toFixed(3)))
    }
    return thresholds
  }

  createObserver () {
    this.observer = new window.IntersectionObserver(entries => {
      each(entries, entry => {
        this.animateIn(entry)
      })
    }, {
      root: this.params.sectionServiceContainer ?? null,
      rootMargin: `${this.params.rootMargin ?? '999% 0px 10%'}`,
      threshold: this.params.thresholds ?? this.buildThresholds(100)
    })

    if (this.isScrub) {
      this.onScroll()
    } else {
      this.observer.observe(this.element)
    }
  }

  animateIn () {

  }

  animateOut () {
    this.element.style.setProperty('--intersecting', 0)
  }

  onResize () {

  }

  destroy () {
    super.destroy()
    ScrollTrigger.killAll()
  }

  onScroll () {

  }
}
