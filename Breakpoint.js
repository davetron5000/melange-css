class DefaultBreakpoint {
  constructor() {
    this.variableNamePrefix = ""
  }
  toMediaQuery() { return "" }
  isDefault() { return true }
}
class Breakpoint {
  constructor({variableNamePrefix, minWidth, maxWidth}) {
    this.variableNamePrefix = variableNamePrefix
    this.minWidth = minWidth
    this.maxWidth = maxWidth
    if ( !this.minWidth && !this.maxWidth ) {
      throw `Breakpoint ${variableNamePrefix} must have a min or max width (or both)`
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
