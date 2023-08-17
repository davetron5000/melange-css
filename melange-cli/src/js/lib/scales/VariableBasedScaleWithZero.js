import VariableBasedScale from "./VariableBasedScale.js"
import Step from "./Step.js"

export default class VariableBasedScaleWithZero extends VariableBasedScale {
  numSteps() { return super.numSteps() + 1 }
  eachStep(f) {
    f(new Step({ qualifier: "0", value: "0" }))
    super.eachStep(f)
  }
}

