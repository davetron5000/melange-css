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
    this.qualifier = Qualifier.fromString(qualifier)
  }

  selector(classNameBase) {
    return `${classNameBase}${this.qualifier.toString()}`
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

class Qualifier {
  constructor(value, dashPrefix=true) {
    this.value = value
    this.dashPrefix = dashPrefix
    if (!this.value || this.value == "") {
      this.value = ""
      this.dashPrefix = false
    }
  }

  toString() {
    if (this.dashPrefix) {
      return `-${this.value}`
    }
    else {
      return this.value
    }
  }

  static fromString(string) {
    if (string.constructor && string.constructor.name == "Qualifier") {
      return string
    }
    else {
      return new Qualifier(string, true)
    }
  }
}

export {
  EnumeratedValue,
  LiteralEnumeratedValue,
  EnumeratedValues,
  Qualifier
}
