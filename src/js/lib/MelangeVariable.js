class MelangeVariableRegistry {
  constructor() {
    this.variables = {}
  }

  register(baseName, stepNamesAndDefaultValues, documentation) {
    this._ensureVariablesNotRegistered(baseName)

    let variables

    if (Array.isArray(stepNamesAndDefaultValues)) {
      variables = stepNamesAndDefaultValues.map( (value, index) => {
        return new MelangeVariable({ baseName: baseName, stepName: (index + 1), defaultValue: value })
      })
    }
    else {
      variables = Array.from(Object.entries(stepNamesAndDefaultValues)).map( ([stepName, defaultValue ]) => {
        return new MelangeVariable({ baseName: baseName, stepName: stepName, defaultValue: defaultValue })
      })
    }
    this.registerVariables(baseName, variables, documentation)
    return variables
  }

  registerVariables(baseName, melangeVariables, documentation) {
    this.variables[baseName] = {
      documentation: documentation,
      variables: Object.fromEntries(melangeVariables.map( (variable) => [ variable.stepName, variable ] )),
    }
  }
  fetchAll(baseName) {
    if (this.variables[baseName]) {
      return Object.values(this.variables[baseName].variables)
    }
    else {
      throw `There are no variables regsitered under '${baseName}'`
    }
  }
  fetch(baseName, stepName) {
    if (this.variables[baseName]) {
      if (this.variables[baseName].variables[stepName]) {
        return this.variables[baseName].variables[stepName]
      }
      else {
        throw `${baseName} does not have a variable with step name '${stepName}'`
      }
    }
    else {
      throw `There are no variables regsitered under '${baseName}'`
    }
  }

  eachSetOfVariables(f) {
    Object.entries(this.variables).forEach( ([key,value]) => f(key,value) ) 
  }

  _ensureVariablesNotRegistered(baseName) {
    if (this.variables[baseName]) {
      throw `'${baseName}' variables have already by registered`
    }
  }
}

const melangeVariableRegistry = new MelangeVariableRegistry()

class MelangeVariable {
  constructor({baseName, stepName, defaultValue}) {
    this.baseName     = baseName
    this.stepName     = stepName
    this.defaultValue = defaultValue
  }
  toCSSProperty() {
    return `${this._variableName()}: ${this.defaultValue};`
  }

  toCSSValue() {
    return `var(${this._variableName()})`
  }

  _variableName() {
    return `--melange-${this.baseName}${this.stepName}`
  }

  static register(baseName, stepNamesAndDefaultValues, documentation) {
    return melangeVariableRegistry.register(baseName, stepNamesAndDefaultValues, documentation)
  }

  static registerVariables(baseName, melangeVariables, documentation) {
    return melangeVariableRegistry.registerVariables(baseName, melangeVariables, documentation)
  }

  static fetchAll(baseName) {
    return melangeVariableRegistry.fetchAll(baseName)
  }
  static fetch(baseName, stepName) {
    return melangeVariableRegistry.fetch(baseName, stepName)
  }
  static eachSetOfVariables(f) {
    return melangeVariableRegistry.eachSetOfVariables(f)
  }
}

class DerivedMelangeVariable extends MelangeVariable {
  constructor({ baseName, melangeVariable, stepNameTransform, propertyTransform }) {
    super({
      baseName: baseName,
      stepName: stepNameTransform(melangeVariable.stepName),
      defaultValue: melangeVariable.defaultValue
    })
    this.melangeVariable = melangeVariable
    this.cssValue = propertyTransform(melangeVariable)
  }

  toCSSProperty() { return null }
  toCSSValue() { return this.cssValue }
}


export { MelangeVariable, DerivedMelangeVariable }
