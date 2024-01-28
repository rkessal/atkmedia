import { each, get } from 'lodash'
import { Home, Privacidade, Cdc } from './pages'
import { Preloader, Navigation } from './components'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

class App {
  constructor () {
    this.createContent()

    this.createPreloader()
    this.createPages()
    this.createNavigation()
    this.createRouter()
    this.createSmoothScroll()
  }

  createSmoothScroll () {
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)
  }

  createNavigation () {
    this.navigation = new Navigation()
  }

  createPreloader () {
    this.preloader = new Preloader()
    this.preloader.on('completed', _ => this.onPreloaded())
  }

  createContent () {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createPages () {
    this.pages = {
      home: new Home(),
      cdc: new Cdc(),
      privacidade: new Privacidade()
    }

    this.page = this.pages[this.template]
    this.page.create()
    this.page.show()
  }

  createRouter () {
    const links = document.querySelectorAll('a')

    each(links, link => {
      if (link.hasAttribute('data-router')) {
        link.onclick = event => this.onRouterClick(event)
      }
    })
  }

  onPreloaded () {
    this.onResize()
    this.preloader.destroy()
  }

  onResize () {
    this.resizeId = window.requestAnimationFrame(_ => {
      if (this.page) {
        this.page.onResize()
      }
    })
  }

  async onRouterClick (event) {
    event.preventDefault()
    const href = get(event, 'target.href', '/')
    if (href === window.location.pathname) return

    const request = await window.fetch(href)
    if (request.status !== 200) return
    window.history.pushState(null, null, href)

    await this.page.hide()
    this.page.destroy()
    this.removeEventListeners()

    const div = document.createElement('div')
    div.innerHTML = await request.text()

    const content = div.querySelector('.content')
    this.template = content.getAttribute('data-template')

    this.content.setAttribute('data-template', this.template)
    this.content.innerHTML = content.innerHTML

    window.scrollTo(0, 0)
    this.page = this.pages[this.template]
    this.page.create()
    this.page.show()

    this.createRouter()
    this.onResize()

    this.preloader.createLoader()
  }

  removeEventListeners () {
    window.cancelAnimationFrame(this.resizeId)
  }
}

new App()
