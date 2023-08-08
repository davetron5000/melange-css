import DefaultPseudoSelector from "./DefaultPseudoSelector.js"
import DefaultBreakpoint     from "./breakpoints/DefaultBreakpoint.js"

/*
 * Represents a specific CSS class that will be produced.
 */
export default class CSSClass {
  /*
   * Create the CSSClass:
   *
   * selector - the base selector used for the default breakpoint and without any pseudo selectors.
   *            For example, "db" for setting display to block.
   * pseudoSelector - a PseudoSelector instance that indicates which pseudo selector is used, if any.
   *                  For example, this may be the hover pseudo selector, thus indicating that
   *                  we use display block only when hovering.
   * breakpoint - the breakpoint that this selector is for.
   * exampleTemplate - an ExampleTemplate instance used to document this class.
   * propertiesAndValues - An object of CSS properties and their values that will be used to 
   *                       define this class.
   * postSelectorSelector - If this selector should have an additional selector for it to apply to,
   *                        this is the literaly value.  Not used often. See debug for an example.
   */
  constructor({ selector, pseudoSelector, breakpoint, propertiesAndValues, postSelectorSelector, exampleTemplate }) {
    this.selector = selector
    this.pseudoSelector = pseudoSelector || new DefaultPseudoSelector()
    this.breakpoint = breakpoint || new DefaultBreakpoint()
    this.propertiesAndValues = propertiesAndValues
    this.postSelectorSelector = postSelectorSelector
    this.exampleTemplate = exampleTemplate
  }

  /*
   * Given the constructor args, this produces the raw CSS to define the class.  See className()
   * for how the class' name is derived.
   */
  toCSS() {
    const props = Array.from(Object.entries(this.propertiesAndValues)).map( ([property,value]) => {
      if (value.toString() == "[object Object]") {
        throw `WTAF? Got ${JSON.stringify(value)}`
      }
      return `  ${property}: ${value};` 
    }).join("\n")
    return `.${this.fullSelector()} {\n${props}\n}`
  }

  example() {
    if (this.exampleTemplate) {
      return this.exampleTemplate.example(this.className())
    }
  }

  /*
   * This builds a new CSSClass exactly like this one, but for the given PseudoSelector instance.
   */
  forSelector(pseudoSelector) {
    return new CSSClass({...this, ...{ pseudoSelector: pseudoSelector }})
  }
  /*
   * This builds a new CSSClass exactly like this one, but for the given Breakpoint instance.
   */
  atBreakpoint(breakpoint) {
    return new CSSClass({...this, ...{ breakpoint: breakpoint }})
  }

  /*
   * Returns the class name to be used for this CSS class. This is where the naming
   * conventions are embedded.  The convention is:
   *
   *     [pseudoSelector-]selector[-breakpoint]
   *
   * For example, display block would be `db`.  display block on hover for not small
   * screens would be `hover-db-ns`.
   */
  className() {
    return [
      this.pseudoSelector.variableNameQualifier,
      this.selector,
      this.breakpoint.variableNameQualifier,
    ].filter( (part) => (part || "").trim() != "" ).join("-")
  }

  /*
   * Outputs the full selector to use in the .css file, accounting for any
   * additional post selectors that may be required to make the class work as
   * desired.
   */
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

