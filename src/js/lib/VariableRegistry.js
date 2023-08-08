import Variable from "./Variable.js"

/*
 * Registers all variables in the MetaTheme to prevent duplicate variables
 * from being declared.
 *
 * The object export from this file is a singleton instance and not this class.
 */
class VariableRegistry {
  constructor() {
    this.variables = {}
  }

  /*
   * Register a series of variables with a common base name and one ore more steps from a scale.
   *
   * baseName - the basename of the variable, e.g. "fontSize"
   * stepNamesAndDefaultValues - the names of each step and their default values
   * documentation - A string that documents these varaibles. Required or the variables will
   *                 not be output.
   */
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

  /*
   * Register pre-created Variable instances.
   */
  registerVariables(baseName, variables, documentation) {
    this.variables[baseName] = {
      documentation: documentation,
      variables: Object.fromEntries(variables.map( (variable) => [ variable.stepName, variable ] )),
    }
  }

  /*
   * Call `f` for each baseName of variables.  
   *
   * f - a callback for each set of variables with a common baseName.  f is called with:
   *     [0] - the baseName used
   *     [1] - an Array of Variable instances
   */
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
