import { each, get } from 'lodash'
import { Home, Privacidade, Cdc } from './pages'
import { Preloader } from './components'

class App {
  constructor () {
    // this.createPreloader()
    this.createContent()
    this.createPages()
    this.createRouter()
  }

  createPreloader () {
    this.preloader = new Preloader()
    this.preloader.once('completed', _ => this.onPreloaded())
  }

  createContent () {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
    console.log(this.content, this.template)
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
    this.preloader.destroy()
  }

  async onRouterClick (event) {
    event.preventDefault()
    const href = get(event, 'target.href', '/')
    if (href === window.location.pathname) return

    const request = await window.fetch(href)
    if (request.status !== 200) return
    window.history.pushState(null, null, href)

    const div = document.createElement('div')
    div.innerHTML = await request.text()

    const content = div.querySelector('.content')
    this.template = content.getAttribute('data-template')

    this.content.setAttribute('data-template', this.template)
    this.content.innerHTML = content.innerHTML

    await this.page.hide()
    this.page = this.pages[this.template]
    this.page.create()
    this.page.show()

    this.createRouter()
  }
}

new App()
