import Step from "./Step.js"

export default class VariableBaseStep extends Step {
  constructor(melangeVariable) {
    super({qualifier: melangeVariable.stepName})
    this.melangeVariable = melangeVariable
    if ( (this.melangeVariable.constructor.name !== "MelangeVariable") && 
         (this.melangeVariable.constructor.name !== "DerivedMelangeVariable") ) {
      throw `WTF is this: ${this.melangeVariable.constructor.name} '${this.melangeVariable}'`
    }
  }

  cssValue() {
    return this.melangeVariable.toCSSValue()
  }
}
