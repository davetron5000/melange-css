import Variable from "./Variable.js"

class VariableRegistry {
  constructor() {
    this.variables = {}
  }

  register(baseName, stepNamesAndDefaultValues, documentation) {
    this._ensureVariablesNotRegistered(baseName)

    let variables

    if (Array.isArray(stepNamesAndDefaultValues)) {
      variables = stepNamesAndDefaultValues.map( (value, index) => {
        return new Variable({ baseName: baseName, stepName: (index + 1), defaultValue: value })
      })
    }
    else {
      variables = Array.from(Object.entries(stepNamesAndDefaultValues)).map( ([stepName, defaultValue ]) => {
        return new Variable({ baseName: baseName, stepName: stepName, defaultValue: defaultValue })
      })
    }
    this.registerVariables(baseName, variables, documentation)
    return variables
  }

  registerVariables(baseName, variables, documentation) {
    this.variables[baseName] = {
      documentation: documentation,
      variables: Object.fromEntries(variables.map( (variable) => [ variable.stepName, variable ] )),
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

const REGISTRY = new VariableRegistry()

export default REGISTRY
