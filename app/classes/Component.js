import { isArray, each } from 'lodash'
import EventEmitter from 'events'

export default class Component extends EventEmitter {
  constructor ({
    element,
    elements
  }) {
    super()

    this.selector = element
    this.selectorChildren = {
      ...elements
    }

    this.create()
    this.addEventListeners()
    this.removeEventListeners()
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

  addEventListeners () {

  }

  removeEventListeners () {
  }
}
