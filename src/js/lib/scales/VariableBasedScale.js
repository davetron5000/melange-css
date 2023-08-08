import Scale from "./Scale.js"
import VariableBasedStep from "./VariableBasedStep.js"

export default class VariableBasedScale extends Scale {
  constructor(variables) {
    super()
    this.variables = variables
  }

  eachStep(f) {
    this.variables.forEach( (variable) => {
      f(new VariableBasedStep(variable))
    })
  }
}
