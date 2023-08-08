export default class PseudoSelector {
  constructor({variableNameQualifier, selector}) {
    this.variableNameQualifier = variableNameQualifier
    this.selector = selector
  }

  forSelector(selector) {
    return `${selector}:${this.selector}`
  }
  isDefault() { return false }
}
