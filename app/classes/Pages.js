import gsap from 'gsap'
import { isArray, each } from 'lodash'

export default class Page {
  constructor ({
    id,
    element,
    elements
  }) {
    this.id = id
    this.selector = element
    this.selectorChildren = {
      ...elements
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
        } else if (this.elements[key].length === 1) {
          this.elements[key] = this.element.querySelector(entry)
        }
      }
    })
  }

  show () {
    return new Promise(resolve => {
      gsap.from(this.element, {
        autoAlpha: 0,
        delay: 1,
        onComplete: resolve
      })
    })
  }

  hide () {
    return new Promise(resolve => {
      gsap.to(this.element, {
        autoAlpha: 0,
        delay: 1,
        onComplete: resolve
      })
    })
  }
}
