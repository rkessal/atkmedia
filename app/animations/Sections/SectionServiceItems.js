import Animation from 'classes/Animations'
import { each, filter, map } from 'lodash'

export default class SectionServiceItem extends Animation {
  constructor ({ element, elements, params }) {
    super({
      element,
      elements: {
        ...elements
      },
      params
    })
    this.itemNumber = this.element.dataset.serviceItemNumber
    console.log(this.elements)
  }

  animateIn (entry) {
    if (entry.isIntersecting) {
      this.elements.serviceItemsImages.style.setProperty('--current-image', this.itemNumber)
    }
    // this.elements.serviceItemsImages[this.itemNumber].classList.toggle('active', entry.isIntersecting)
  }

  onResize () {}
}
