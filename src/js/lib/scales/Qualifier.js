export default class Qualifier {
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
