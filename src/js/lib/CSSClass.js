import { DefaultPseudoSelector } from "./PseudoSelector.js"
import { DefaultBreakpoint } from "./Breakpoint.js"

class CSSClass {
  constructor({ selector, pseudoSelector, breakpoint, propertiesAndValues }) {
    this.selector = selector
    this.pseudoSelector = pseudoSelector || new DefaultPseudoSelector()
    this.breakpoint = breakpoint || new DefaultBreakpoint()
    this.propertiesAndValues = propertiesAndValues
  }

  toCSS() {
    const props = Array.from(Object.entries(this.propertiesAndValues)).map( ([property,value]) => `  ${property}: ${value};` ).join("\n")
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
    return this.pseudoSelector.forSelector(this.className())
  }
}

class CSSClassTemplate {
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
    return new CSSClass({
      selector: enumeratedValue.selector(this.classNameBase),
      propertiesAndValues: Object.fromEntries(this.cssProperties.map( (property) => {
        return [ property, enumeratedValue.cssValue() ]
      }))
    })
  }
}


export { CSSClass, CSSClassTemplate }
