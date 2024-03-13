import Animation from 'classes/Animations'

export default class Image extends Animation {
  constructor ({ element, elements }) {
    super({ element, elements })
  }

  animateIn (entry) {
    this.element.classList.toggle('active', entry.isIntersecting)
  }

  onResize () {
  }
}
