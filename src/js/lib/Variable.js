export default class Variable {
  constructor({baseName, stepName, defaultValue}) {
    this.baseName     = baseName
    this.stepName     = stepName
    this.defaultValue = defaultValue
  }

  toCSSProperty() {
    return `${this._variableName()}: ${this.defaultValue};`
  }

  toCSSValue() {
    return `var(${this._variableName()})`
  }

  _variableName() {
    return `--melange-${this.baseName}${this.stepName}`
  }
}
