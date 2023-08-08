import CSSClassTemplate from "./CSSClassTemplate.js"

/*
 * A CSS class template whose values do not depend on the scale, but instead
 * takes literaly values that are output.
 *
 * Should only be used with a single-step scale.
 */
export default class ScaleAgnosticCSSClassTemplate extends CSSClassTemplate {
  /*
   * classNameBase - the base class name as you'd pass to CSSClassTemplate
   * propertiesAndValues - an object of CSS properties and the CSS value to assign no matter what step
   *                       of a scale is considered.
   * options - options as you would pass to CSSClassTemplate
   */
  constructor(classNameBase, propertiesAndValues, options) {
    super(classNameBase,options)
    this.cssProperties = Object.keys(propertiesAndValues)
    this.propertiesAndValues = propertiesAndValues
  }
  _propertiesAndValues(step) {
    return this.propertiesAndValues
  }
}

