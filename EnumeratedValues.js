class EnumeratedValues {
  constructor(enumeratedValues) {
    this.enumeratedValues = enumeratedValues
  }
  eachValue(f) {
    this.enumeratedValues.forEach(f)
  }
}
class EnumeratedValue {
  constructor({ qualifier }) {
    this.qualifier = qualifier
  }

  selector(classNameBase) {
    return `${classNameBase}${this.qualifier}`
  }

  cssValue() {
    throw "Subclass must implement"
  }
}

class LiteralEnumeratedValue extends EnumeratedValue {
  constructor({ qualifier, value }) {
    super({qualifier})
    this.value = value
  }
  cssValue() {
    return this.value
  }

  static literalValues(literalValues) {
    return new EnumeratedValues(Array.from(Object.entries(literalValues)).map( ([ key, value ]) => {
      return new LiteralEnumeratedValue({qualifier: key, value: value })
    }))
  }
}

export {
  EnumeratedValue,
  LiteralEnumeratedValue,
  EnumeratedValues
}
