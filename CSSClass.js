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

  fullSelector() {
    const selectorWithoutPseudo = [
      this.breakpoint.variableNamePrefix,
      this.selector,
      this.pseudoSelector.variableNamePrefix,
    ].filter( (part) => (part || "").trim() != "" ).join("-")
    return this.pseudoSelector.forSelector(selectorWithoutPseudo)
  }
}

class CSSClassTemplate {
  constructor(classNameBase, ...cssProperties) {
    this.classNameBase = classNameBase
    this.cssProperties = cssProperties
  }

  toCSSClass(scaleStep) {
    return new CSSClass({
      selector: scaleStep.nameFromBase(this.classNameBase),
      propertiesAndValues: Object.fromEntries(this.cssProperties.map( (property) => {
        return [ property, scaleStep.cssValue() ]
      }))
    })
  }
}


export { CSSClass, CSSClassTemplate }
