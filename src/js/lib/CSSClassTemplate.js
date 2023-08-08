import DefaultPseudoSelector from "./DefaultPseudoSelector.js"
import DefaultBreakpoint from "./breakpoints/DefaultBreakpoint.js"

class CSSClass {
  constructor({ selector, pseudoSelector, breakpoint, propertiesAndValues, postSelectorSelector }) {
    this.selector = selector
    this.pseudoSelector = pseudoSelector || new DefaultPseudoSelector()
    this.breakpoint = breakpoint || new DefaultBreakpoint()
    this.propertiesAndValues = propertiesAndValues
    this.postSelectorSelector = postSelectorSelector
  }

  toCSS() {
    const props = Array.from(Object.entries(this.propertiesAndValues)).map( ([property,value]) => {
      if (value.toString() == "[object Object]") {
        throw `WTAF? Got ${JSON.stringify(value)}`
      }
      return `  ${property}: ${value};` 
    }).join("\n")
    return `.${this.fullSelector()} {\n${props}\n}`
  }

  forSelector(pseudoSelector) {
    return new CSSClass({...this, ...{ pseudoSelector: pseudoSelector }})
  }
  atBreakpoint(breakpoint) {
    return new CSSClass({...this, ...{ breakpoint: breakpoint }})
  }

  className() {
    return [
      this.pseudoSelector.variableNameQualifier,
      this.selector,
      this.breakpoint.variableNameQualifier,
    ].filter( (part) => (part || "").trim() != "" ).join("-")
  }

  fullSelector() {
    const selector = this.pseudoSelector.forSelector(this.className())
    if (this.postSelectorSelector) {
      return `${selector} ${this.postSelectorSelector}`
    }
    else {
      return selector
    }
  }
}

export default class CSSClassTemplate {
  constructor(classNameBase, ...cssProperties) {
    this.classNameBase = classNameBase
    const lastProperty  = cssProperties[cssProperties.length - 1]
    if (typeof lastProperty === "object") {
      this.cssProperties = cssProperties.slice(0,cssProperties.length - 1)
      const options = lastProperty
      this.exampleTemplate = options.exampleTemplate
      this.docs = Array(options.docs || []).flat()
    }
    else {
      this.cssProperties = cssProperties
      this.options = {}
    }
  }

  hasExample() {
    return !!this.exampleTemplate
  }

  example(cssClass) {
    return this.exampleTemplate.example(cssClass.className())
  }

  toCSSClass(enumeratedValue) {
    const cssClass = new CSSClass({
      selector: enumeratedValue.selector(this.classNameBase),
      propertiesAndValues: Object.fromEntries(this.cssProperties.map( (property) => {
        return [ property, enumeratedValue.cssValue() ]
      }))
    })
    return this._tweakCSSClass(cssClass)
  }

  _tweakCSSClass(cssClass) {
    return cssClass
  }
}

