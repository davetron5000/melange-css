/*
 * This is not the design system that Melange provides for you.  This is a thing that produces
 * design systems.  It turns a list of MetaPropertyGrouping instances and a list of Breakpoint instances insto
 * the design system.
 */
export default class MetaTheme {
  constructor({metaPropertyGroupings, breakpoints}) {
    this.metaPropertyGroupings = metaPropertyGroupings
    this.breakpoints           = breakpoints
  }

  /*
   * Ensures that there are no duplicate class names
   */
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

  /*
   * Allows for fine-level iteration over each class that is produced, with callbacks for each breakpoint, grouping,
   * property, class template, and class.
   *
   * Each of the following callbacks can either be a single function or an object with the keys start and end.
   *
   * start is called for each part of the model before iteration of sub models.  end is called after.  If
   * the callback is a function, it will be called for start only.
   *
   * onBreakpoint - called around the given breakpoint. Passed a Breakpoint instance
   * onMetaPropertyGrouping - around the given MetaPropertyGrouping. Passed a MetaPropertyGrouping instance
   * onMetaProperty - around the given MetaProperty. Passed a MetaProperty instance
   * onCSSClassTemplate - around the given CSSClassTemplate. Passed a CSSClassTemplate instance
   * onPsuedoSelector - around the given PsuedoSelector. Passed a PsuedoSelector instance
   * onCSSClass - around the given CSSClass. Passed a CSSClass instance
   */
  eachCSSClass({
    onBreakpoint,
    onMetaPropertyGrouping,
    onMetaProperty,
    onCSSClassTemplate,
    onPsuedoSelector,
    onCSSClass,
  }) {
    onBreakpoint           = this._convertCBToCanonical("onBreakpoint"           , onBreakpoint)
    onMetaPropertyGrouping = this._convertCBToCanonical("onMetaPropertyGrouping" , onMetaPropertyGrouping)
    onMetaProperty         = this._convertCBToCanonical("onMetaProperty"         , onMetaProperty)
    onCSSClassTemplate     = this._convertCBToCanonical("onCSSClassTemplate"     , onCSSClassTemplate)
    onPsuedoSelector       = this._convertCBToCanonical("onPsuedoSelector"       , onPsuedoSelector)
    onCSSClass             = this._convertCBToCanonical("onCSSClass"             , onCSSClass)

    this.breakpoints.forEach( (breakpoint) => {
      onBreakpoint.start(breakpoint)
      this.metaPropertyGroupings.forEach( (metaPropertyGrouping) => {
        onMetaPropertyGrouping.start(metaPropertyGrouping, breakpoint, this.breakpoints)
        metaPropertyGrouping.metaProperties.forEach( (metaProperty) => {
          onMetaProperty.start(metaProperty, metaPropertyGrouping, breakpoint, this.breakpoints)
          metaProperty.cssClassTemplates.forEach( (cssClassTemplate) => {
            onCSSClassTemplate.start(cssClassTemplate, metaProperty, metaPropertyGrouping, breakpoint, this.breakpoints)
            metaProperty.scales().forEach( (scale) => {
              metaProperty.pseudoSelectors.forEach( (pseudoSelector) => {
                onPsuedoSelector.start(pseudoSelector, cssClassTemplate, metaProperty, metaPropertyGrouping, breakpoint, this.breakpoints)
                scale.eachStep( (step) => {
                  const cssClass = cssClassTemplate.toCSSClass(step).forSelector(pseudoSelector).atBreakpoint(breakpoint)
                  onCSSClass.start(cssClass, pseudoSelector, cssClassTemplate, metaProperty, metaPropertyGrouping, breakpoint, this.breakpoints)
                  onCSSClass.end(cssClass, cssClassTemplate, metaProperty, metaPropertyGrouping, breakpoint, this.breakpoints)
                })
                onPsuedoSelector.end(pseudoSelector, metaProperty, metaPropertyGrouping, breakpoint, this.breakpoints)
              })
            })
            onCSSClassTemplate.end(cssClassTemplate, metaProperty, metaPropertyGrouping, breakpoint, this.breakpoints)
          })
          onMetaProperty.end(metaProperty, metaPropertyGrouping, breakpoint, this.breakpoints)
        })
        onMetaPropertyGrouping.end(metaPropertyGrouping, breakpoint, this.breakpoints)
      })
      onBreakpoint.end(breakpoint)
    })
  }
}

