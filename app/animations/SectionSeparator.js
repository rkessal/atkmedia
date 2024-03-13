import Animation from 'classes/Animations'

export default class SectionSeparator extends Animation {
  constructor ({ element, elements }) {
    super({ element, elements })
  }

  animateIn (entry) {
    const ratio = entry.intersectionRatio
    const max = 2
    const offset = max * ratio + 1
    entry.target.style.setProperty('--grow-ratio', offset)
    this.element.classList.toggle('grow', entry.isIntersecting)
    this.element.classList.toggle('moveup', entry.isIntersecting)

    // timeline.set(this.element, {
    //   autoAlpha: 1
    // })

    // each(this.elementLines, (line, i) => {
    //   timeline.fromTo(line, {
    //     y: '100%'
    //   }, {
    //     delay: i * 0.1,
    //     ease: 'expo.out',
    //     duration: 1.5,
    //     y: '0%'
    //   }, 0)
    // })
  }

  animateOut (entry) {
  }

  onResize () {
  }
}
