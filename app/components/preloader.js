import Component from 'classes/Component'
import gsap from 'gsap'
import { each } from 'lodash'
import { split } from 'utils/text'
import { calculate } from '../utils/text'

export default class Preloader extends Component {
  constructor () {
    super({
      element: '.preloader',
      elements: {
        title: '.preloader__text',
        number: '.preloader__number',
        images: document.querySelectorAll('img'),
        body: document.querySelector('body'),
        html: document.querySelector('html')
      }
    })

    split({ element: this.elements.title })
    split({ element: this.elements.title })

    this.elements.titleSpans = this.elements.title.querySelectorAll('span span')
    this.elements.lines = calculate(this.elements.titleSpans)

    this.count = 0
    this.createLoader()
  }

  createLoader () {
    each(this.elements.images, element => {
      element.src = element.getAttribute('data-src')
      element.onload = _ => this.onAssetsLoaded()
    })
  }

  onAssetsLoaded () {
    this.count++
    const percentage = Math.round(this.count / this.elements.images.length) * 100

    this.elements.number.innerHTML = `${percentage}%`

    if (percentage === 100) this.onLoaded()
  }

  onLoaded () {
    this.animateOut = gsap.timeline({
      delay: 1
    })

    this.animateOut.to(this.elements.titleSpans, {
      duration: 1.5,
      ease: 'expo.out',
      y: '120%',
      stagger: {
        grid: [this.elements.lines.length, this.elements.lines[0].length],
        axis: 'y',
        amount: 0.1
      }
    })

    this.animateOut.to(this.elements.number, {
      autoAlpha: 0,
      duration: 0.5
    })

    this.animateOut.to(this.element, {
      duration: 1.5,
      ease: 'expo.out',
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
    })

    this.animateOut.call(_ => this.emit('completed'))
  }

  destroy () {
    this.element.remove()
  }
}
