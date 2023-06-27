class DefaultPseudoSelector {
  forSelector(selector) {
    return selector
  }
  isDefault() { return true }
}
class PseudoSelector {
  constructor({variableNamePrefix, selector}) {
    this.variableNamePrefix = variableNamePrefix
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
