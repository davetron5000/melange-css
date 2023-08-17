/*
 * A CSS variable to be used and possibly written to the CSS.
 *
 * This is mostly useful for values that might need to be modified by
 * the user of melange.css
 */
export default class Variable {
  /*
   * baseName - the base name of the variable, used to create different actual variables along a given step.
   * stepName - the name of the step
   * defaultValue - a value for this variable.  The assumption is that some file containing this could be
   *                modified by a user.
   *
   * For example, the variable `new Variable("fontSize", "big", "10rem")` would produce:
   *
   * ```css
   * --melange-fontSize-big: 10rem;
   * ```
   */
  constructor({baseName, stepName, defaultValue}) {
    this.baseName     = baseName
    this.stepName     = stepName
    this.defaultValue = defaultValue
  }

  /*
   * Returns the CSS property and default value to use in a .css file.
   *
   * If this returns undefined or null, the variable will not be declared in the .css file.
   * This is likely not what you want unless using a DerivedVariable.
   */
  toCSSProperty() {
    return `${this._variableName()}: ${this.defaultValue};`
  }

  /*
   * Returns the CSS needed to reference this variable as the value of a CSS property.
   * This should not return undefined/null.
   */
  toCSSValue() {
    return `var(${this._variableName()})`
  }

  _variableName() {
    return `--mg-${this.baseName}${this.stepName}`
  }
}
