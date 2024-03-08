import PseudoSelector   from "../lib/PseudoSelector.js"
import DefaultPseudoSelector from "../lib/DefaultPseudoSelector.js"

export class PseudoSelectors {
  constructor() {
    this.default  = new DefaultPseudoSelector()
    this.hover    = new PseudoSelector({variableNameQualifier: "hover"   , selector: "hover"   , name: "Hover"})
    this.active   = new PseudoSelector({variableNameQualifier: "active"  , selector: "active"  , name: "Active"})
    this.focus    = new PseudoSelector({variableNameQualifier: "focus"   , selector: "focus"   , name: "Focus"})
    this.disabled = new PseudoSelector({variableNameQualifier: "disabled", selector: "disabled", name: "Disabled"})
    this.valid    = new PseudoSelector({variableNameQualifier: "valid"   , selector: "valid"   , name: "Valid"})
    this.invalid  = new PseudoSelector({variableNameQualifier: "invalid" , selector: "invalid" , name: "Invalid"})
  }

  toArray() {
    return [
      this.default,
      this.hover,
      this.active,
      this.focus,
      this.disabled,
      this.valid,
      this.invalid,
    ]
  }
}

const pseudoSelectors = new PseudoSelectors()

export default pseudoSelectors
