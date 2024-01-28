import gsap from 'gsap'
import Animation from 'classes/Animations'
import { each, lastIndexOf } from 'lodash'
import { split, calculate } from '../../utils/text'
import { COLORS } from '../../classes/Colors'

const isMobile = window.innerWidth <= 768

export default class SectionHorizontal extends Animation {
  constructor ({ element, elements }) {
    super({
      isScrub: true,
      element,
      elements: {
        ...elements,
        wrapper: '.home__section__horizontal__wrapper',
        left: '.home__section__horizontal__left',
        leftItem: '.home__section__horizontal__left__labels__item',
        rightItem: '.home__section__horizontal__right_item',
        body: document.querySelector('body')
      }
    })
  }

  onScroll () {
    each(this.elements.leftItem, element => {
      split({ element, append: true })
      split({ element, append: true })
    })

    this.elementLineSpans = this.element.querySelectorAll('span span')

    if (!this.elementLines?.length) this.elementLines = calculate(this.elementLineSpans)
    each(this.elements.rightItem, (item, index) => {
      this.timeline = gsap.timeline({
        scrollTrigger: {
          id: `scrub_section_${index}`,
          trigger: item,
          start: `top ${index > 0 ? '90%' : '150%'}`,
          end: `bottom ${lastIndexOf(this.elements.rightItem !== index + 1) ? '90%' : '150%'}`,
          onEnter: () => this.updateBackground(index),
          onEnterBack: () => this.updateBackground(index),
          toggleActions: 'play reverse play reverse'
        }
      })

      const lines = this.elements.leftItem[index].querySelectorAll('span span')
      this.timeline.from(lines, {
        y: '100%',
        duration: 0.5,
        ease: 'expo.out',
        stagger: 0.1
      }, '+=1')
    })
  }

  updateBackground (index) {
    if (!isMobile) {
      gsap.to(this.elements.body, {
        duration: 0.5,
        ease: 'expo.out',
        backgroundColor: index % 2 === 0 ? COLORS['color-cornflower-blue'] : COLORS['color-port-gore'],
        color: index % 2 === 0 ? COLORS['color-port-gore'] : COLORS['color-cornflower-blue']
      })
    }
  }

  destroy () {
    this.timeline.kill()
  }

  onResize () {
    if (this.elementLineSpans.length) {
      this.elementLines = calculate(this.elementLineSpans)
    }
  }
}
