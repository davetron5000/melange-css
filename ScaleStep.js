/* One step of a scale. */
class ScaleStep {

  /**
   * suffix - a mnemonic or other css-class-compliant suffix to attach to another 
   *          value to make a class name for a given property at this step of the scale.
   */
  constructor({ suffix }) {
    this.suffix = suffix
  }

  nameFromBase(classNameBase) {
    return `${classNameBase}${this.suffix}`
  }

  cssValue() {
    throw "Subclass must implement"
  }
}

class LiteralScaleStep extends ScaleStep {
  constructor({ suffix, value }) {
    super({suffix})
    this.value = value
  }
  cssValue() {
    return this.value
  }
}

class VariableBasedScaleStep extends ScaleStep {
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

export { LiteralScaleStep, VariableBasedScaleStep }
