class DefaultBreakpoint {
  constructor() {
    this.variableNameQualifier = ""
  }
  toMediaQuery() { return "" }
  isDefault() { return true }
}
class Breakpoint {
  constructor({variableNameQualifier, minWidth, maxWidth}) {
    this.variableNameQualifier = variableNameQualifier
    this.minWidth = minWidth
    this.maxWidth = maxWidth
    if ( !this.minWidth && !this.maxWidth ) {
      throw `Breakpoint ${variableNameQualifier} must have a min or max width (or both)`
    }
  }

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


export {
  DefaultBreakpoint,
  Breakpoint,
}
