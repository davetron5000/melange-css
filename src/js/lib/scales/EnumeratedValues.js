export default class EnumeratedValues {
  constructor(enumeratedValues) {
    this.enumeratedValues = enumeratedValues
  }
  eachValue(f) {
    this.enumeratedValues.forEach(f)
  }
}
