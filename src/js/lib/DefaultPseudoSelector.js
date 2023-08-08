/*
 * A PseudoSelector that is the default, i.e. no pseudo selector
 */
export default class DefaultPseudoSelector {
  forSelector(selector) {
    return selector
  }
  isDefault() { return true }
}
