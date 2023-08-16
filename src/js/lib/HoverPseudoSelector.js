import PseudoSelector from "./PseudoSelector.js"
/*
 * A PseudoSelector for hover states.
 */
export default class HoverPseudoSelector extends PseudoSelector {
  constructor() {
    super({ variableNameQualifier: "hover", selector: "hover", name: "Hover" })
  }
}
