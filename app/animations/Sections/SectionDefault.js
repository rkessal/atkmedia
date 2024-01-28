import Animation from 'classes/Animations'

export default class SectionDefault extends Animation {
  constructor ({ element, elements }) {
    super({
      isScrub: true,
      element,
      elements: {
        ...elements,
        left: '.home__section__default__left'
      }
    })
  }

  onScroll () {
  }

  onResize () {
  }
}
