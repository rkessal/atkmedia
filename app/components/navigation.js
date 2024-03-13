import Component from 'classes/Component'
import gsap from 'gsap'
import { each } from 'lodash'

export default class Navigation extends Component {
  constructor () {
    super({
      element: '.navigation',
      elements: {
        openIcon: '.navigation__menu__icon',
        closeIcon: '.navigation__menu__close__icon',
        menu: '.navigation__menu',
        wrapper: '.navigation__wrapper',
        links: '.navigation__menu a',
        copyright: '.navigation__menu__copyright',
        currentTime: '.navigation__time'
      },
      noScroll: false
    })
    this.build()
  }

  build () {
    this.setCurrentTime()
    this.visible = false
    this.isAnimating = false
    this.addEventListeners()
    this.elements.menu.remove()
  }

  setCurrentTime () {
    setInterval(() => {
      const now = new Date()
      const hours = (now.getUTCHours() - 3).toString().padStart(2, '0')
      const minutes = now.getUTCMinutes().toString().padStart(2, '0')
      this.elements.currentTime.innerHTML = `${hours}:${minutes} GMT-3 Brasilia`
    }, 5000)
  }

  async toggleMenu () {
    if (this.isAnimating) return

    if (this.visible) {
      await this.hide()
      this.elements.menu.remove()
    } else {
      this.element.appendChild(this.elements.menu)
      await this.show()
    }
    this.visible = !this.visible
    this.isAnimating = false
  }

  async show () {
    this.isAnimating = true
    const timeline = gsap.timeline({
      delay: 0.5
    })
    return new Promise(resolve => {
      timeline.set(this.elements.menu, {
        autoAlpha: 1
      }, 0)
      timeline.fromTo(this.elements.menu, {
        scaleY: 0,
        transformOrigin: '0 0'
      }, {
        scaleY: 1,
        duration: 1,
        ease: 'expo.out',
        onComplete: resolve
      }, 0)

      each(this.elements.links, (link, i) => {
        timeline.fromTo(link, {
          autoAlpha: 0,
          y: '100%'
        }, {
          autoAlpha: 1,
          delay: i * 0.1,
          ease: 'expo.out',
          duration: 1.5,
          y: '0%'
        }, 0.5)
      })

      timeline.fromTo([this.elements.copyright, this.elements.closeIcon], {
        autoAlpha: 0
      }, {
        autoAlpha: 1
      }, '-=0.3')
    })
  }

  async hide () {
    this.isAnimating = true

    const timeline = gsap.timeline({
      delay: 0.5
    })

    return new Promise(resolve => {
      each(this.elements.links, (link, i) => {
        timeline.fromTo(link, {
          autoAlpha: 1,
          y: '0%'
        }, {
          autoAlpha: 0,
          delay: i * 0.1,
          ease: 'expo.out',
          duration: 0.2,
          y: '100%'
        }, 0)
      })

      timeline.to([this.elements.copyright, this.elements.closeIcon], {
        autoAlpha: 0,
        duration: 0.1
      }, 0)

      timeline.to(this.elements.menu, {
        transformOrigin: '1 1',
        scaleY: 0,
        duration: 1,
        ease: 'expo.out'
      })

      timeline.call(resolve)
    })
  }

  addEventListeners () {
    this.togglingMenu = [
      this.elements.openIcon,
      this.elements.closeIcon,
      this.elements.links
    ]

    const recursive = (items) => {
      each(items, (item) => {
        if (item.length) {
          recursive(item)
        } else {
          item.addEventListener('click', () => this.toggleMenu())
        }
      })
    }

    recursive(this.togglingMenu)
  }

  removeEventListeners () {
    super.removeEventListeners()

    const recursive = (items) => {
      each(items, (item) => {
        if (item.length) {
          recursive(item)
        } else {
          item.removeEventListener('click', () => this.toggleMenu())
        }
      })
    }

    recursive(this.togglingMenu)
  }

  destroy () {
    this.element.remove()
    this.removeEventListeners()
  }
}
