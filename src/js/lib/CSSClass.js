import DefaultPseudoSelector from "./DefaultPseudoSelector.js"
import DefaultMediaQuery     from "./mediaqueries/DefaultMediaQuery.js"

/*
 * Represents a specific CSS class that will be produced.
 */
export default class CSSClass {
  /*
   * Create the CSSClass:
   *
   * selector - the base selector used for the default media query and without any pseudo selectors.
   *            For example, "db" for setting display to block.
   * pseudoSelector - a PseudoSelector instance that indicates which pseudo selector is used, if any.
   *                  For example, this may be the hover pseudo selector, thus indicating that
   *                  we use display block only when hovering.
   * mediaQuery - the media query that this selector is for.
   * exampleTemplate - an ExampleTemplate instance used to document this class.
   * propertiesAndValues - An object of CSS properties and their values that will be used to 
   *                       define this class.
   * postSelectorSelector - If this selector should have an additional selector for it to apply to,
   *                        this is the literaly value.  Not used often. See debug for an example.
   */
  constructor({ selector, pseudoSelector, mediaQuery, propertiesAndValues, postSelectorSelector, exampleTemplate }) {
    this.selector = selector
    this.pseudoSelector = pseudoSelector || new DefaultPseudoSelector()
    this.mediaQuery = mediaQuery || new DefaultMediaQuery()
    this.propertiesAndValues = propertiesAndValues
    this.postSelectorSelector = postSelectorSelector
    this.exampleTemplate = exampleTemplate
  }

  /*
   * Given the constructor args, this produces the raw CSS to define the class.  See className()
   * for how the class' name is derived.
   */
  toCSS() {
    const properties = Array.from(Object.entries(this.propertiesAndValues)).map( ([property,value]) => {
      if (value.toString() == "[object Object]") {
        throw `WTAF? Got ${JSON.stringify(value)}`
      }
      return `  ${property}: ${value};` 
    }).join("\n")
    return `.${this.fullSelector()} {\n${properties}\n}`
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
   * This builds a new CSSClass exactly like this one, but for the given MediaQuery instance.
   */
  atMediaQuery(mediaQuery) {
    return new CSSClass({...this, ...{ mediaQuery: mediaQuery }})
  }

  /*
   * Returns the class name to be used for this CSS class. This is where the naming
   * conventions are embedded.  The convention is:
   *
   *     [pseudoSelector-]selector[-mediaQuery]
   *
   * For example, display block would be `db`.  display block on hover for not small
   * screens would be `hover-db-ns`.
   */
  className() {
    return [
      this.pseudoSelector.variableNameQualifier,
      this.selector,
      this.mediaQuery.variableNameQualifier(),
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

