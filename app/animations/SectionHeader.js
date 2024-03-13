import Animation from 'classes/Animations'

export default class SectionHeader extends Animation {
  constructor ({ element, elements }) {
    super({ element, elements })
  }

  animateIn (entry) {
    this.element.classList.toggle('animate', entry.isIntersecting)
  }

  animateOut (entry) {
  }

  onResize () {
  }
}
