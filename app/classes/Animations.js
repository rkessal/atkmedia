import { each } from 'lodash'
import Component from './Component'
import { ScrollTrigger } from 'gsap/all'

export default class Animation extends Component {
  constructor ({ element, elements, isScrub }) {
    super({ element, elements })
    this.isScrub = isScrub
    this.createObserver()
    this.animateOut()
  }

  createObserver () {
    this.observer = new window.IntersectionObserver(entries => {
      each(entries, entry => {
        if (entry.isIntersecting) {
          this.animateIn()
        } else {
          this.animateOut()
        }
      })
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
