import Page from 'classes/Pages'
import { map } from 'lodash'
import Quote from '../../animations/Quote'
import SectionDefault from '../../animations/Sections/SectionDefault'
import SectionHorizontal from '../../animations/Sections/SectionHorizontal'
import Hero from '../../animations/Hero'

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

  createAnimations () {
    super.createAnimations()

    const animationsSectionDefault = map(this.elements.animationsSectionDefault, element => new SectionDefault({ element }))
    this.animations.push(...animationsSectionDefault)

    const animationsQuotes = map(this.elements.quotes, element => new Quote({ element }))
    this.animations.push(...animationsQuotes)

    const animationsSectionHorizontal = map(this.elements.animationsSectionHorizontal, element => new SectionHorizontal({ element }))
    this.animations.push(...animationsSectionHorizontal)

    const hero = map(this.elements.hero, element => new Hero({ element }))
    this.animations.push(...hero)
  }
}
