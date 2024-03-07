/*
 * This is not the design system that Melange provides for you.  This is a thing that produces
 * design systems.  It turns a list of MetaPropertyGrouping instances and a list of MediaQuery instances into
 * the design system.
 */
export default class MetaTheme {
  constructor({metaPropertyGroupings, mediaQueries}) {
    this.metaPropertyGroupings = metaPropertyGroupings
    this.mediaQueries           = mediaQueries
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
   * Allows for fine-level iteration over each class that is produced, with callbacks for each mediaQuery, grouping,
   * property, class template, and class.
   *
   * Each of the following callbacks can either be a single function or an object with the keys start and end.
   *
   * start is called for each part of the model before iteration of sub models.  end is called after.  If
   * the callback is a function, it will be called for start only.
   *
   * onMediaQuery - called around the given mediaQuery. Passed a MediaQuery instance
   * onMetaPropertyGrouping - around the given MetaPropertyGrouping. Passed a MetaPropertyGrouping instance
   * onMetaProperty - around the given MetaProperty. Passed a MetaProperty instance
   * onCSSClassTemplate - around the given CSSClassTemplate. Passed a CSSClassTemplate instance
   * onPsuedoSelector - around the given PsuedoSelector. Passed a PsuedoSelector instance
   * onCSSClass - around the given CSSClass. Passed a CSSClass instance
   */
  eachCSSClass({
    onMediaQuery,
    onMetaPropertyGrouping,
    onMetaProperty,
    onCSSClassTemplate,
    onPsuedoSelector,
    onCSSClass,
  }) {
    onMediaQuery           = this._convertCBToCanonical("onMediaQuery"           , onMediaQuery)
    onMetaPropertyGrouping = this._convertCBToCanonical("onMetaPropertyGrouping" , onMetaPropertyGrouping)
    onMetaProperty         = this._convertCBToCanonical("onMetaProperty"         , onMetaProperty)
    onCSSClassTemplate     = this._convertCBToCanonical("onCSSClassTemplate"     , onCSSClassTemplate)
    onPsuedoSelector       = this._convertCBToCanonical("onPsuedoSelector"       , onPsuedoSelector)
    onCSSClass             = this._convertCBToCanonical("onCSSClass"             , onCSSClass)

    this.mediaQueries.forEach( (mediaQuery) => {
      onMediaQuery.start(mediaQuery)
      this.metaPropertyGroupings.forEach( (metaPropertyGrouping) => {
        if (!metaPropertyGrouping.supportsMediaQuery(mediaQuery)) {
          return
        }
        onMetaPropertyGrouping.start(metaPropertyGrouping, mediaQuery, this.mediaQueries)
        metaPropertyGrouping.metaProperties.forEach( (metaProperty) => {
          onMetaProperty.start(metaProperty, metaPropertyGrouping, mediaQuery, this.mediaQueries)
          metaProperty.cssClassTemplates.forEach( (cssClassTemplate) => {
            onCSSClassTemplate.start(cssClassTemplate, metaProperty, metaPropertyGrouping, mediaQuery, this.mediaQueries)
            metaProperty.scales().forEach( (scale) => {
              metaProperty.pseudoSelectors.forEach( (pseudoSelector) => {
                onPsuedoSelector.start(pseudoSelector, cssClassTemplate, metaProperty, metaPropertyGrouping, mediaQuery, this.mediaQueries)
                scale.eachStep( (step) => {
                  const cssClass = cssClassTemplate.toCSSClass(step).forSelector(pseudoSelector).atMediaQuery(mediaQuery)
                  onCSSClass.start(cssClass, pseudoSelector, cssClassTemplate, metaProperty, metaPropertyGrouping, mediaQuery, this.mediaQueries)
                  onCSSClass.end(cssClass, cssClassTemplate, metaProperty, metaPropertyGrouping, mediaQuery, this.mediaQueries)
                })
                onPsuedoSelector.end(pseudoSelector, metaProperty, metaPropertyGrouping, mediaQuery, this.mediaQueries)
              })
            })
            onCSSClassTemplate.end(cssClassTemplate, metaProperty, metaPropertyGrouping, mediaQuery, this.mediaQueries)
          })
          onMetaProperty.end(metaProperty, metaPropertyGrouping, mediaQuery, this.mediaQueries)
        })
        onMetaPropertyGrouping.end(metaPropertyGrouping, mediaQuery, this.mediaQueries)
      })
      onMediaQuery.end(mediaQuery)
    })
  }
}

