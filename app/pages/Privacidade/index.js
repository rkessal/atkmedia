import Page from 'classes/Pages'

export default class Privacidade extends Page {
  constructor () {
    super({
      id: 'privacidade',
      element: '.privacidade',
      elements: {
        navigation: document.querySelector('.navigation')
      }
    })
  }
}
