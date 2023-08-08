import Scale from "./Scale.js"
import VariableBasedStep from "./VariableBasedStep.js"

export default class VariableBasedScale extends Scale {
  constructor(melangeVariables) {
    super()
    this.melangeVariables = melangeVariables
  }

  eachStep(f) {
    this.melangeVariables.forEach( (melangeVariable) => {
      f(new VariableBasedStep(melangeVariable))
    })
  }
}
