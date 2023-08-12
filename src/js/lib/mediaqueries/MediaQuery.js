export default class MediaQuery {
  toMediaQuery() {
    throw "Subclass must implement"
  }
  variableNameQualifier() {
    throw "Subclass must implement"
  }
  description() {
    return "Subclass must implement"
  }
  isDefault() { return false }
}
