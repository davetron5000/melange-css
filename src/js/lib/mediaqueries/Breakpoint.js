import MediaQuery from "./MediaQuery.js"

export default class Breakpoint extends MediaQuery {
  constructor({variableNameQualifier, minWidth, maxWidth, name, description}) {
    super()
    this._name = name
    this._variableNameQualifier = variableNameQualifier
    this._description = description
    this.minWidth = minWidth
    this.maxWidth = maxWidth
    if ( !this.minWidth && !this.maxWidth ) {
      throw `Breakpoint ${variableNameQualifier} must have a min or max width (or both)`
    }
  }

  name()                  { return this._name }
  variableNameQualifier() { return this._variableNameQualifier }
  description()           { return this._description }
  isBreakpoint()          { return true }

  toMediaQuery() {
    if (this.minWidth) {
      if (this.maxWidth) {
        return `@media screen and (min-width: ${this.minWidth}) and (max-width: ${this.maxWidth})`
      }
      else {
        return `@media screen and (min-width: ${this.minWidth})`
      }
    }
    else {
      return `@media screen and (max-width: ${this.maxWidth})`
    }
  }
  isDefault() { return false }
}
