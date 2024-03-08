import pseudoSelectors       from "../../melange/pseudoSelectors.js"
import DefaultPseudoSelector from "../../lib/DefaultPseudoSelector.js"
import CLIArgError           from "./CLIArgError.js"
import ParsedArg             from "./ParsedArg.js"

export default class PseudoSelectors extends ParsedArg {
  static field       = "pseudoSelector"
  static description = "Pseudo selectors to target in output (see values below)"
  static shortField  = "p"
  static isArray() { return true }

  static parse(values) {
    const pseudoSelectorNames = values[this.field]
    if (pseudoSelectorNames) {
      const parsedPseudoSelectors = pseudoSelectorNames.map( (pseudoSelectorName) => {
        return pseudoSelectors.find(pseudoSelectorName) || `No such pseudo selector '${pseudoSelectorName}'`
      })

      const errors = parsedPseudoSelectors.filter( (x) => typeof(x) === "string" )
      if (errors.length > 0) {
        return new CLIArgError(this.field, errors.join(","))
      }
      return new PseudoSelectors(parsedPseudoSelectors)
    }
    else {
      return new PseudoSelectors([])
    }
  }
  constructor(pseudoSelectors) {
    super()
    this.pseudoSelectors = pseudoSelectors
    if (!this.pseudoSelectors.find( (ps) => ps.isDefault() )) {
      this.pseudoSelectors = [ new DefaultPseudoSelector(), ...this.pseudoSelectors ]
    }
  }
}
