export default class MetaTheme {
  constructor({metaPropertyGroupings, breakpoints}) {
    this.metaPropertyGroupings = metaPropertyGroupings
    this.breakpoints           = breakpoints
  }

  checkForDupes() {
    const dupes = {}
    this.eachCSSClass( { onCSSClass: (cssClass) => {
        const selector = cssClass.fullSelector()
        if (dupes[selector]) {
          dupes[selector].push(cssClass)
        }
        else {
          dupes[selector] = [ cssClass ]
        }
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

  _convertCBToCanonical(paramName,cb) {
    const NOOP = () => {}
    const canonical = { start: NOOP, end: NOOP }
    if (cb) {
      if (typeof cb === "function") {
        canonical.start = cb
      }
      else {
        const keys = Object.keys(cb)
        const startIndex = keys.indexOf("start")
        if (startIndex != -1) {
          canonical.start = cb.start
          keys.splice(startIndex, 1)
        }
        const endIndex = keys.indexOf("end")
        if (endIndex != -1) {
          canonical.end = cb.end
          keys.splice(endIndex, 1)
        }
        if (keys.length > 0) {
          throw `Argument ${paramName} to eachCSSClass should've had only the keys start and end.  Found: ${keys.join(",")}`
        }
      }
    }
    return canonical
  }

  eachCSSClass({
    onBreakpoint,
    onMetaPropertyGrouping,
    onMetaProperty,
    onCSSClassTemplate,
    onCSSClass,
  }) {
    onBreakpoint           = this._convertCBToCanonical("onBreakpoint"           , onBreakpoint)
    onMetaPropertyGrouping = this._convertCBToCanonical("onMetaPropertyGrouping" , onMetaPropertyGrouping)
    onMetaProperty         = this._convertCBToCanonical("onMetaProperty"         , onMetaProperty)
    onCSSClassTemplate     = this._convertCBToCanonical("onCSSClassTemplate"     , onCSSClassTemplate)
    onCSSClass             = this._convertCBToCanonical("onCSSClass"             , onCSSClass)

    this.breakpoints.forEach( (breakpoint) => {
      onBreakpoint.start(breakpoint)
      this.metaPropertyGroupings.forEach( (metaPropertyGrouping) => {
        onMetaPropertyGrouping.start(metaPropertyGrouping)
        metaPropertyGrouping.metaProperties.forEach( (metaProperty) => {
          onMetaProperty.start(metaProperty)
          metaProperty.cssClassTemplates.forEach( (cssClassTemplate) => {
            onCSSClassTemplate.start(cssClassTemplate)
            metaProperty.enumeratedValues().forEach( (enumeratedValues) => {
              metaProperty.pseudoSelectors.forEach( (pseudoSelector) => {
                enumeratedValues.eachStep( (enumeratedValue) => {
                  const cssClass = cssClassTemplate.toCSSClass(enumeratedValue).forSelector(pseudoSelector).atBreakpoint(breakpoint)
                  onCSSClass.start(cssClass, cssClassTemplate)
                  onCSSClass.end(cssClass, cssClassTemplate)
                })
              })
            })
            onCSSClassTemplate.end(cssClassTemplate)
          })
          onMetaProperty.end(metaProperty)
        })
        onMetaPropertyGrouping.end(metaPropertyGrouping)
      })
      onBreakpoint.end(breakpoint)
    })
  }
}

