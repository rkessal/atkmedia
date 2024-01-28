import Page from 'classes/Pages'

export default class Cdc extends Page {
  constructor () {
    super({
      id: 'cdc',
      element: '.cdc',
      elements: {
        navigation: document.querySelector('.navigation')
      }
    })
  }
}
