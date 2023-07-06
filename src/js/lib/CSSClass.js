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
class CSSExampleTemplate {

  static IDENTITY = (_selector,html) => { return html }

  constructor({html, markup}) {
    if (!html) {
      throw `CSSExampleTemplate was provided without an 'html' key`
    }
    this.html = html
    this.markup = markup || IDENTITY
  }
}

class CSSClassTemplate {
  constructor(classNameBase, ...cssProperties) {
    this.classNameBase = classNameBase
    const lastProperty  = cssProperties[cssProperties.length - 1]
    if (typeof lastProperty === "object") {
      this.cssProperties = cssProperties.slice(0,cssProperties.length - 1)
      const options = lastProperty
      if (!options.exampleTemplate) {
        throw `Options were provided to ${classNameBase}, but the key 'exampleTemplate' is missing`
      }
      this.exampleTemplate = new CSSExampleTemplate(options.exampleTemplate)
      this.docs = options.docs
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
    const html = this.exampleTemplate.html(cssClass.className(), cssClass.pseudoSelector)
    return {
      html: html,
      escaped: html.replace(/</g,"&lt;").replace(/>/g,"&gt;"),
      markup: this.exampleTemplate.markup(cssClass.className(), cssClass.pseudoSelector, html)
    }
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
