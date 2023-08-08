import EnumeratedValue from "./EnumeratedValue.js"

export default class VariableBasedEnumeratedValue extends EnumeratedValue {
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
