class MelangeVariable {
  constructor({baseName, stepName, defaultValue}) {
    this.baseName     = baseName
    this.stepName     = stepName
    this.defaultValue = defaultValue
  }
  toCSSProperty() {
    return `--melange-${this.baseName}${this.stepName}: ${this.defaultValue};`
  }

  toCSSValue() {
    return `var(--melange-${this.baseName}${this.stepName})`
  }

  static registeredVariables = {}

  static register(baseName, stepNamesAndDefaultValues) {
    if (MelangeVariable.registeredVariables[baseName]) {
      throw `'${baseName}' variables have already by registered`
    }

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
    MelangeVariable.registeredVariables[baseName] = Object.fromEntries(variables.map( (variable) => [ variable.stepName, variable ] ))
    return variables
  }

  static fetchAll(baseName) {
    if (MelangeVariable.registeredVariables[baseName]) {
      return Object.values(MelangeVariable.registeredVariables[baseName])
    }
    else {
      throw `There are no variables regsitered under '${baseName}'`
    }
  }
  static fetch(baseName, stepName) {
    if (MelangeVariable.registeredVariables[baseName]) {
      if (MelangeVariable.registeredVariables[baseName][stepName]) {
        return MelangeVariable.registeredVariables[baseName][stepName]
      }
      else {
        throw `${baseName} does not have a variable with step name '${stepName}'`
      }
    }
    else {
      throw `There are no variables regsitered under '${baseName}'`
    }
  }
}
export { MelangeVariable }
