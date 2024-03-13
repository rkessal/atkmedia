import Animation from 'classes/Animations'
import { each, map } from 'lodash'

export default class SectionProcess extends Animation {
  constructor ({ element, elements, params }) {
    super({
      element,
      elements: {
        ...elements,
        processItems: '.home__section__process__item',
        circle: '.home__section__process__little__circle'
      },
      params
    })

    this.init()
  }

  init () {
    this.thresholds = map(this.elements.processItems, (_, index) => index * this.elements.processItems.length / 10)

    const [firstItem, secondItem] = this.thresholds
    this.delta = secondItem - firstItem

    this.maxRotation = -240
  }

  animateIn (entry) {
    each(this.thresholds, (t, index) => {
      const currentItem = this.elements.processItems[index]
      const currentCircle = this.elements.circle[index]

      const rotationValue = Math.max(
        parseInt(entry.intersectionRatio * -360) + (index * 120),
        this.maxRotation + (index * 120)
      )

      entry.target.style.setProperty(`--ratio-${index + 1}`, `${rotationValue}deg`)

      if (entry.intersectionRatio > t && entry.intersectionRatio <= t + this.delta) {
        currentItem.classList.add('active')
        currentCircle.classList.add('active')
      } else {
        currentItem.classList.remove('active')
        currentCircle.classList.remove('active')
      }
    })

    if (entry.intersectionRatio <= 0) {
      this.elements.circle[0].classList.add('active')
      this.elements.processItems[0].classList.add('active')
    }

    if (entry.intersectionRatio >= 0.6) {
      this.elements.circle[2].classList.add('active')
      this.elements.processItems[2].classList.add('active')
    }
  }

  onResize () {}
}
