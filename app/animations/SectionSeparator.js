import Animation from 'classes/Animations'

export default class SectionSeparator extends Animation {
  constructor ({ element, elements, params, isPhone }) {
    super({ element, elements, params, isPhone })
  }

  animateIn (entry) {
    const ratio = entry.intersectionRatio
    const max = this.isPhone ? 3 : 2
    const offset = max * ratio + 1
    entry.target.style.setProperty('--grow-ratio', offset)
    this.element.classList.toggle('grow', entry.isIntersecting)
    this.element.classList.toggle('moveup', entry.isIntersecting)
  }

  animateOut (entry) {
  }

  onResize () {
  }
}
