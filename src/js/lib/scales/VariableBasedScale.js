import Scale from "./Scale.js"
import VariableBasedStep from "./VariableBasedStep.js"

export default class VariableBasedScale extends Scale {
  constructor(variables, options={}) {
    super(undefined, options)
    this.variables = variables
  }

  numSteps() { return this.variables.length }

  eachStep(f) {
    this.variables.forEach( (variable) => {
      f(new VariableBasedStep(variable))
    })
  }
}
