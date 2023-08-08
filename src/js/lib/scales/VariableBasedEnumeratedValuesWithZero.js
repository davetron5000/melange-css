import VariableBasedEnumeratedValues from "./VariableBasedEnumeratedValues.js"
import LiteralEnumeratedValue from "./LiteralEnumeratedValue.js"

export default class VariableBasedEnumeratedValuesWithZero extends VariableBasedEnumeratedValues {
  eachValue(f) {
    f(new LiteralEnumeratedValue({ qualifier: "0", value: "0" }))
    super.eachValue(f)
  }
}

