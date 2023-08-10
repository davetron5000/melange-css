import Step from "./Step.js"
import Qualifier from "./Qualifier.js"

export default class Scale {
  constructor(qualifiersToValuesOrSteps, options={}) {
    this.options = options || {}
    if ( (this.options.dashPrefix !== false) &&
         (this.options.dashPrefix !== true) ) {
      this.options.dashPrefix = true
    }

    if (qualifiersToValuesOrSteps) {
      if (Array.isArray(qualifiersToValuesOrSteps)) {
        this.steps = qualifiersToValuesOrSteps
      }
      else {
        this.steps = Array.from(Object.entries(qualifiersToValuesOrSteps)).map( ([ key, value ]) => {
          const qualifier = new Qualifier(key, this.options.dashPrefix)
          return new Step({qualifier: qualifier, value: value })
        })
      }
    }
    else {
      this.steps = []
    }
  }
  eachStep(f) {
    this.steps.forEach( (step) => f(step) )
  }

  numSteps() { return this.steps.length }

  static forLiteralValues(literalValues, options={}) {
    return new Scale(Array.from(Object.entries(literalValues)).map( ([ key, value ]) => {
      const qualifier = new Qualifier(key, options.dashPrefix)
      return new Step({qualifier: qualifier, value: value })
    }))
  }
}
