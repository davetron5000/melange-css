import MediaQuery from "./MediaQuery.js"
export default class DefaultMediaQuery extends MediaQuery {
  toMediaQuery() { return "" }
  isDefault() { return true }
  variableNameQualifier() { return "" }
  description() { "Applies at all times absent another media query with overridden styles" }
}
