class MetaTheme {
  constructor({metaProperties, breakpoints}) {
    this.metaProperties = metaProperties
    this.breakpoints    = breakpoints
  }

  checkForDupes() {
    const dupes = {}
    this.eachCSSClass( (cssClass) => {
      const selector = cssClass.fullSelector()
      if (dupes[selector]) {
        dupes[selector].push(cssClass)
      }
      else {
        dupes[selector] = [ cssClass ]
      }
    })
    const errorMessage = Array.from(Object.entries(dupes)).map( ([ selector, dupesForThisSelector ]) => {
      if (dupesForThisSelector.length > 1) {
        const base = `There are ${dupesForThisSelector.length} classes for the selector '${selector}'`
        const cssClasses = dupesForThisSelector.map( (cssClass) => {
          return cssClass.toCSS()
        })
        return `${base}\nDupes:\n\n${cssClasses.join("\n")}\n\n`
      }
      else {
        return undefined
      }
    }).filter( (e) => !!e ).join("\n\n")
    if (errorMessage) {
      throw errorMessage
    }

  }

  eachCSSClass(f) {
    this.breakpoints.forEach( (breakpoint) => {
      this.metaProperties.forEach( (metaProperty) => {
        metaProperty.cssClassTemplates.forEach( (cssClassTemplate) => {
          metaProperty.enumeratedValues().forEach( (enumeratedValues) => {
            metaProperty.pseudoSelectors.forEach( (pseudoSelector) => {
              enumeratedValues.eachValue( (enumeratedValue) => {
                f(cssClassTemplate.toCSSClass(enumeratedValue).forSelector(pseudoSelector).atBreakpoint(breakpoint))
              })
            })
          })
        })
      })
    })
  }
}
export {
  MetaTheme
}

