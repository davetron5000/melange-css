import EnumeratedValues from "./EnumeratedValues.js"
import VariableBasedEnumeratedValue from "./VariableBasedEnumeratedValue.js"

export default class VariableBasedEnumeratedValues extends EnumeratedValues {
  constructor(melangeVariables) {
    super()
    this.melangeVariables = melangeVariables
  }

  eachValue(f) {
    this.melangeVariables.forEach( (melangeVariable) => {
      f(new VariableBasedEnumeratedValue(melangeVariable))
    })
  }
}
