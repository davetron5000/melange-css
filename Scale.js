import { EnumeratedValue, EnumeratedValues, LiteralEnumeratedValue } from "./EnumeratedValues.js"

class VariableBasedScaleStep extends EnumeratedValue {
  constructor(melangeVariable) {
    super({suffix: melangeVariable.stepName})
    this.melangeVariable = melangeVariable
  }

  cssValue() {
    if (this.melangeVariable.constructor.name !== "MelangeVariable") {
      throw `WTF is this: ${this.melangeVariable.constructor.name} '${this.melangeVariable}'`
    }
    return this.melangeVariable.toCSSValue()
  }
}


class VariableBasedScale extends EnumeratedValues {
  constructor(melangeVariables) {
    super()
    this.melangeVariables = melangeVariables
  }

  eachValue(f) {
    this.melangeVariables.forEach( (melangeVariable) => {
      f(new VariableBasedScaleStep(melangeVariable))
    })
  }
}

class VariableBasedScaleWithZero extends VariableBasedScale {
  eachValue(f) {
    f(new LiteralEnumeratedValue({ suffix: "0", value: "0" }))
    super.eachValue(f)
  }
}

/*
 * A scale of literal values that would not be customizable by the theme.
 * For example, percentages.
 */
class LiteralScale extends EnumeratedValues  {
  /*
   * suffixToValue - an object that maps the suffix added to the CSS class to the value to use
   */
  constructor(suffixToValue) {
    super()
    this.suffixToValue = suffixToValue;
  }
  eachValue(f) {
    Object.entries(this.suffixToValue).forEach( ([suffix, value]) => {
      f(new LiteralEnumeratedValue({ suffix: suffix, value: value }))
    })
  }
}

export {
  VariableBasedScale,
  VariableBasedScaleWithZero,
  LiteralScale,
}
