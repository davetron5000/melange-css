import EnumeratedValues from "./EnumeratedValues.js"
import Qualifier from "./Qualifier.js"
import LiteralEnumeratedValue from "./LiteralEnumeratedValue.js"

export default class LiteralEnumeratedValues extends EnumeratedValues  {
  constructor(qualifierToValue, options={}) {
    super()
    this.qualifierToValue = qualifierToValue;
    this.options = options || {}
    if ( (this.options.dashPrefix !== false) &&
         (this.options.dashPrefix !== true) ) {
      this.options.dashPrefix = true
    }
  }
  eachValue(f) {
    Object.entries(this.qualifierToValue).forEach( ([qualifierString, value]) => {
      const qualifier = new Qualifier(qualifierString, this.options.dashPrefix)
      f(new LiteralEnumeratedValue({ qualifier: qualifier, value: value }))
    })
  }
}
