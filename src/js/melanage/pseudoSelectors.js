import PseudoSelector        from "../lib/PseudoSelector.js"
import DefaultPseudoSelector from "../lib/DefaultPseudoSelector.js"

const pseudoSelectors = {
  default: new DefaultPseudoSelector(),
  hover: new PseudoSelector({ name: "Hover", variableNameQualifier: "hover",selector: "hover"}),
}

export default pseudoSelectors
