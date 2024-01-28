import gsap from 'gsap'
import { isArray, each, map } from 'lodash'
import Title from '../animations/Title'
import Paragraph from '../animations/Paragraph'
import AsyncLoad from './AsyncLoad'
import Footer from '../animations/Footer'

export default class Page {
  constructor ({
    id,
    element,
    elements
  }) {
    this.id = id
    this.selector = element
    this.selectorChildren = {
      ...elements,
      animationsTitles: '[data-animation="title"]',
      animationsParagraphs: '[data-animation="paragraph"]',
      animationsQuotes: '[data-animation-scroll="quotes"]',
      animationsSectionDefault: '[data-animation-scroll="section_default"]',
      animationsSectionHorizontal: '[data-animation-scroll="section_horizontal"]',
      preload: '[data-src]',
      footer: document.querySelector('footer')
    }
  }

  create () {
    this.element = document.querySelector(this.selector)
    this.elements = {}

    each(this.selectorChildren, (entry, key) => {
      if (entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        isArray(entry)) {
        this.elements[key] = entry
      } else {
        this.elements[key] = this.element.querySelectorAll(entry)

        if (!this.elements[key].length) {
          delete this.elements[key]
        }
      }
    })

    this.createAnimations()
  }

  createAnimations () {
    this.animations = []

    const animationsTitles = map(this.elements.animationsTitles, element => {
      return new Title({ element })
    })
    this.animations.push(...animationsTitles)

    const animationsParagraphs = map(this.elements.animationsParagraphs, element => {
      return new Paragraph({ element })
    })
    this.animations.push(...animationsParagraphs)

    const preload = map(this.elements.preload, element => new AsyncLoad({ element }))
    this.animations.push(...preload)

    this.animations.push(new Footer({ element: this.elements.footer }))
  }

  show () {
    return new Promise(resolve => {
      gsap.fromTo([this.element, this.elements.footer], {
        autoAlpha: 0
      }, {
        delay: 1,
        autoAlpha: 1,
        onComplete: resolve
      })
    })
  }

  hide () {
    return new Promise(resolve => {
      gsap.to([this.element, this.elements.footer], {
        autoAlpha: 0,
        delay: 1,
        onComplete: resolve
      })
    })
  }

  destroy () {
    each(this.animations, animation => {
      animation.destroy()
    })

    this.animations = []
    this.element.remove()
    this.element = null
  }

  onResize () {
    each(this.animations, animation => {
      animation?.onResize()
    })
  }
}
