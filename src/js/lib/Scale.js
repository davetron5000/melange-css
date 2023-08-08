import { EnumeratedValue, EnumeratedValues, LiteralEnumeratedValue, Qualifier } from "./EnumeratedValues.js"

class VariableBasedScaleStep extends EnumeratedValue {
  constructor(melangeVariable) {
    super({qualifier: melangeVariable.stepName})
    this.melangeVariable = melangeVariable
  }

  cssValue() {
    if ( (this.melangeVariable.constructor.name !== "MelangeVariable") && 
         (this.melangeVariable.constructor.name !== "DerivedMelangeVariable") ) {
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
    f(new LiteralEnumeratedValue({ qualifier: "0", value: "0" }))
    super.eachValue(f)
  }
}

/*
 * A scale of literal values that would not be customizable by the theme.
 * For example, percentages.
 */
class LiteralScale extends EnumeratedValues  {
  /*
   * qualifierToValue - an object that maps the suffix added to the CSS class to the value to use
   */
  constructor(qualifierToValue, options={}) {
    super()
    this.qualifierToValue = qualifierToValue;
    this.options = options || {}
    if ( (this.options.dashPrefix !== false) &&
         (this.options.dashPrefix !== true) ) {
      this.options.dashPrefix = true
    }
  }
  eachValue(f) {
    Object.entries(this.qualifierToValue).forEach( ([qualifierString, value]) => {
      const qualifier = new Qualifier(qualifierString, this.options.dashPrefix)
      f(new LiteralEnumeratedValue({ qualifier: qualifier, value: value }))
    })
  }
}

export {
  VariableBasedScale,
  VariableBasedScaleWithZero,
  LiteralScale,
}
