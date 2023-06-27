import { LiteralScaleStep, VariableBasedScaleStep } from "./ScaleStep.js"

class Scale {
  /*
   * calls f for each value of the scale.  f is called with a ScaleStep.
   */
  eachStep(f) {
    throw "Subclass must implement"
  }
}

class VariableBasedScale extends Scale{
  constructor(melangeVariables) {
    super()
    this.melangeVariables = melangeVariables
  }

  eachStep(f) {
    this.melangeVariables.forEach( (melangeVariable) => {
      f(new VariableBasedScaleStep(melangeVariable))
    })
  }
}

class VariableBasedScaleWithZero extends VariableBasedScale {
  eachStep(f) {
    f(new LiteralScaleStep({ suffix: "0", value: "0" }))
    super.eachStep(f)
  }
}

/*
 * A scale of literal values that would not be customizable by the theme.
 * For example, percentages.
 */
class LiteralScale extends Scale {
  /*
   * suffixToValue - an object that maps the suffix added to the CSS class to the value to use
   */
  constructor(suffixToValue) {
    super()
    this.suffixToValue = suffixToValue;
  }
  eachStep(f) {
    Object.entries(this.suffixToValue).forEach( ([suffix, value]) => {
      f(new LiteralScaleStep({ suffix: suffix, value: value }))
    })
  }
}

export {
  VariableBasedScale,
  VariableBasedScaleWithZero,
  LiteralScale,
}
