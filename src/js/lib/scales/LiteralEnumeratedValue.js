import EnumeratedValue from "./EnumeratedValue.js"
import EnumeratedValues from "./EnumeratedValues.js"

export default class LiteralEnumeratedValue extends EnumeratedValue {
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
