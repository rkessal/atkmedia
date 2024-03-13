import Page from 'classes/Pages'
import { first, map } from 'lodash'
import Quote from '../../animations/Quote'
import SectionDefault from '../../animations/Sections/SectionDefault'
import SectionHorizontal from '../../animations/Sections/SectionHorizontal'
import Hero from '../../animations/Hero'
import SectionSeparator from '../../animations/SectionSeparator'
import SectionHeader from '../../animations/SectionHeader'
import Image from '../../animations/About/Image'
import SectionProcess from '../../animations/Sections/SectionProcess'
import SectionServiceItem from '../../animations/Sections/SectionServiceItems'

export default class Home extends Page {
  constructor () {
    super({
      id: 'home',
      element: '.home',
      elements: {
        navigation: document.querySelector('.navigation'),
        heroTitle: '.home__hero__quote',
        quotes: '.home__quote',
        sectionSeparator: '.section__separator__image',
        sectionHeader: '.home__section__header',
        imageAbout: '.home__about__image',
        sectionProcess: '.home__section__process',
        sectionServiceContainer: '.home__section__service__wrapper',
        sectionServiceItems: '.home__section__service__item',
        sectionServiceImages: '.home__section__service__images'
      }
    })
  }

  createAnimations () {
    super.createAnimations()

    const animationsSectionSeparators = map(this.elements.sectionSeparator, element => new SectionSeparator({ element }))
    this.animations.push(...animationsSectionSeparators)

    const animationsSectionHeaders = map(this.elements.sectionHeader, element => new SectionHeader({ element }))
    this.animations.push(...animationsSectionHeaders)

    const animationsSectionDefault = map(this.elements.animationsSectionDefault, element => new SectionDefault({ element }))
    this.animations.push(...animationsSectionDefault)

    const animationsImageAbout = map(this.elements.imageAbout, element => new Image({ element }))
    this.animations.push(...animationsImageAbout)

    const animationsSectionProcess = map(this.elements.sectionProcess, element => new SectionProcess({
      element,
      params: {
        rootMargin: '999% 0px -100%'
      }
    }))
    this.animations.push(...animationsSectionProcess)

    const animationsSectionServiceItems = map(this.elements.sectionServiceItems, element => new SectionServiceItem({
      element,
      elements: {
        serviceItems: this.elements.sectionServiceItems,
        serviceItemsImages: first(this.elements.sectionServiceImages)
      },
      params: {
        rootMargin: '-10% 0px -10%',
        thresholds: 0.35
      }
    }))
    this.animations.push(...animationsSectionServiceItems)

    const animationsQuotes = map(this.elements.quotes, element => new Quote({ element }))
    // this.animations.push(...animationsQuotes)

    const animationsSectionHorizontal = map(this.elements.animationsSectionHorizontal, element => new SectionHorizontal({ element }))
    this.animations.push(...animationsSectionHorizontal)

    const hero = map(this.elements.hero, element => new Hero({ element }))
    this.animations.push(...hero)
  }
}
