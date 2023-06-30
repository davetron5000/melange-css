class EnumeratedValues {
  constructor(enumeratedValues) {
    this.enumeratedValues = enumeratedValues
  }
  eachValue(f) {
    this.enumeratedValues.forEach(f)
  }
}
class EnumeratedValue {
  constructor({ suffix }) {
    this.suffix = suffix
  }

  selector(classNameBase) {
    return `${classNameBase}${this.suffix}`
  }

  cssValue() {
    throw "Subclass must implement"
  }
}

class LiteralEnumeratedValue extends EnumeratedValue {
  constructor({ suffix, value }) {
    super({suffix})
    this.value = value
  }
  cssValue() {
    return this.value
  }

  static literalValues(literalValues) {
    return new EnumeratedValues(Array.from(Object.entries(literalValues)).map( ([ key, value ]) => {
      return new LiteralEnumeratedValue({suffix: key, value: value })
    }))
  }
}

export {
  EnumeratedValue,
  LiteralEnumeratedValue,
  EnumeratedValues
}
