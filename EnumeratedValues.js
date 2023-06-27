class EnumeratedValues {
  eachValue(f) {
    throw "Subclass must implement"
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
export {
  EnumeratedValue,
  EnumeratedValues
}
