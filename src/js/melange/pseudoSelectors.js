import HoverPseudoSelector   from "../lib/HoverPseudoSelector.js"
import DefaultPseudoSelector from "../lib/DefaultPseudoSelector.js"

const pseudoSelectors = {
  default: new DefaultPseudoSelector(),
  hover: new HoverPseudoSelector(),
}

export default pseudoSelectors
