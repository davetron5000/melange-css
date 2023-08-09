export default class DefaultBreakpoint {
  constructor() {
    this.variableNameQualifier = ""
    this.name = "Default"
  }
  toMediaQuery() { return "" }
  isDefault() { return true }
}
