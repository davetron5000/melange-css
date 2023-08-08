/*
 * A pseudo selector for CSS.
 */
export default class PseudoSelector {
  /*
   * Create the PseudoSelector.
   *
   * variableNameQualifier - string to use to qualify a CSS class to indicate it is
   *                         for this pseudo selector
   * selector - the CSS pseudo selector, without the colon
   *
   * For example, if you did `new PseudoSelector({ variableNameQualifier: "hov", selector: "hover" })`
   *
   * You would end up with a class like hov-bg-green that behaves like the class bg-green, but only on
   * hover.
   */
  constructor({variableNameQualifier, selector}) {
    this.variableNameQualifier = variableNameQualifier
    this.selector = selector
  }

  /*
   * Adds the CSS selector from the constructor to any passed selector.
   */
  forSelector(selector) {
    return `${selector}:${this.selector}`
  }
  isDefault() { return false }
}
