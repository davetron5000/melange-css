import Variable from './Variable.js'
export default class DerivedVariable extends Variable {
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
