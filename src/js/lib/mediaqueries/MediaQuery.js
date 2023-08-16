import Anchor from "../Anchor.js"

export default class MediaQuery {
  name()                  { throw "Subclass must implement" }
  toMediaQuery()          { throw "Subclass must implement" }
  variableNameQualifier() { throw "Subclass must implement" }
  description()           { throw "Subclass must implement" }
  isDefault()             { return false }
  isBreakpoint()          { return false }

  id() {
    return new Anchor(this.name()).toString()
  }

  compare(otherMediaQuery) {
    return this.id().localeCompare(otherMediaQuery.id())
  }
}
