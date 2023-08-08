import Qualifier from "./Qualifier.js"

export default class EnumeratedValue {
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
