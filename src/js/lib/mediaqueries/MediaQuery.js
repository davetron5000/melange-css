export default class MediaQuery {
  name()                  { throw "Subclass must implement" }
  toMediaQuery()          { throw "Subclass must implement" }
  variableNameQualifier() { throw "Subclass must implement" }
  description()           { throw "Subclass must implement" }
  isDefault()             { return false }
}
