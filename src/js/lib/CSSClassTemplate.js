import ExampleTemplate from "./ExampleTemplate.js"
import CSSClass        from "./CSSClass.js"

/*
 * Defines a template for producing CSS classes along a scale.
 *
 * For exampe, this may define left padding and so will declare that all
 * left padding classes should start wiht "pl".
 */
export default class CSSClassTemplate {
  /*
   * Create as CSSClassTemplate, which is how you end up with a single class at each
   * step of a scale.
   *
   * classNameBase - the base class name to be used. For example, the class fw-4 would have a base name
   *                 of "fw".  A class named "hover-bg-gray-lightest" would have a basename of "bg-gray"
   *                 (see CSSClass for naming conventions).
   * cssProperties - This is a list of CSS property names whose value will be based on the steps in the scale.
   *                 In almost all instances, there will be just one CSS property, such as "font-weight".
   *
   * options - if the last argument is an object, that object is not considered a CSS property, but
   *           is interpreted as an options object.  The following keys are recognized:
   *
   *           exampleTemplate: Either a function or an ExampleTemplate instance.  If a function
   *                            that function will be sent to the ExampleTemplate constructor.  This
   *                            is what you'd use if the example documentation for these classes
   *                            is straightforward.
   *           docs: An array of strings that provides more free-form documentation about
   *                 these classes.
   */
  constructor(classNameBase, ...cssProperties) {
    this.classNameBase = classNameBase
    const lastProperty  = cssProperties[cssProperties.length - 1]
    if (typeof lastProperty === "object") {
      this.cssProperties = cssProperties.slice(0,cssProperties.length - 1)
      const options = lastProperty
      const exampleTemplate = options.exampleTemplate
      if (exampleTemplate) {
        if (typeof exampleTemplate === "function") {
          this.exampleTemplate = new ExampleTemplate(exampleTemplate)
        }
        else {
          this.exampleTemplate = exampleTemplate
        }
      }
      this.docs = Array(options.docs || []).flat()
    }
    else {
      this.cssProperties = cssProperties
      this.options = {}
    }
  }

  /* True if this has an example template */
  hasExample() {
    return !!this.exampleTemplate
  }

  /*
   * Given the step, returns the specific CSS class to use without pseudo and at the default breakpoint
   */
  toCSSClass(step) {
    const cssClass = new CSSClass({
      selector: step.selector(this.classNameBase),
      exampleTemplate: this.exampleTemplate,
      propertiesAndValues: Object.fromEntries(this.cssProperties.map( (property) => {
        return [ property, step.cssValue() ]
      }))
    })
    return this._hackCSSClass(cssClass)
  }

  _hackCSSClass(cssClass) {
    return cssClass
  }
}

