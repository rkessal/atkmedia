import Page from 'classes/Pages'

export default class Home extends Page {
  constructor () {
    super({
      id: 'home',
      element: '.home',
      elements: {
        navigation: document.querySelector('.navigation'),
        heroTitle: '.home__hero__quote',
        quotes: '.home__quote'
      }
    })
  }
}
