class DefaultPseudoSelector {
  forSelector(selector) {
    return selector
  }
  isDefault() { return true }
}
class PseudoSelector {
  constructor({variableNameQualifier, selector}) {
    this.variableNameQualifier = variableNameQualifier
    this.selector = selector
  }

  forSelector(selector) {
    return `${selector}:${this.selector}`
  }
  isDefault() { return false }
}

export {
  DefaultPseudoSelector,
  PseudoSelector,
}
