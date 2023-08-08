import VariableBasedScale from "./VariableBasedScale.js"
import Step from "./Step.js"

export default class VariableBasedScaleWithZero extends VariableBasedScale {
  eachStep(f) {
    f(new Step({ qualifier: "0", value: "0" }))
    super.eachStep(f)
  }
}

