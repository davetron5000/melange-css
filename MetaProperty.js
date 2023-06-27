import { DefaultPseudoSelector } from "./PseudoSelector.js"

class MetaProperty {
  constructor({name, enumeratedValues, pseudoSelectors, cssClassTemplates}) {
    this.name              = name
    this._enumeratedValues = enumeratedValues
    this.pseudoSelectors   = pseudoSelectors || [ new DefaultPseudoSelector() ]
    this.cssClassTemplates = cssClassTemplates
  }
  enumeratedValues() {
    return this._enumeratedValues
  }
}
export {
  MetaProperty
}
