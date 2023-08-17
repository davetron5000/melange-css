import Step from "./Step.js"

export default class VariableBaseStep extends Step {
  constructor(variable) {
    super({qualifier: variable.stepName})
    this.variable = variable
  }

  cssValue() {
    return this.variable.toCSSValue()
  }
}
