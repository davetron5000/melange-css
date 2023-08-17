import Qualifier from "./Qualifier.js"

export default class Step {
  constructor({ qualifier, value }) {
    this.qualifier = Qualifier.fromString(qualifier)
    this.value = value
  }

  selector(classNameBase) {
    return `${classNameBase}${this.qualifier.toString()}`
  }

  cssValue() {
    return this.value
  }
}
