import Variable from './Variable.js'

/*
 * A CSS variable that is derived from another.  This allows you to
 * avoid duplicating variables when you have something that should always be
 * based on an existing variable.
 */
export default class DerivedVariable extends Variable {
  /*
   * Create the DerivedVariable
   *
   * baseName - the baseName that is like that of Variable. Should be unique.
   * variable - the Variable instance this is going to derive
   * stepNameTransform - a function that, given the Variable's stepName, will return
   *                     a different one that is suitable.
   * propertyTransform - a function that, given the Variable, returns the full
   *                     CSS value to be used.
   *
   *                     See positions for an example of this.
   */
  constructor({ baseName, variable, stepNameTransform, propertyTransform }) {
    super({
      baseName: baseName,
      stepName: stepNameTransform(variable.stepName),
      defaultValue: variable.defaultValue
    })
    this.variable = variable
    this.cssValue = propertyTransform(variable)
  }

  toCSSProperty() { return null }
  toCSSValue() { return this.cssValue }
}
