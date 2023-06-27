import { DefaultPseudoSelector } from "./PseudoSelector.js"

class MetaProperty {
  constructor({name, scales, pseudoSelectors, cssClassTemplates}) {
    this.name              = name
    this.scales            = scales
    this.pseudoSelectors   = pseudoSelectors || [ new DefaultPseudoSelector() ]
    this.cssClassTemplates = cssClassTemplates
  }
}
export {
  MetaProperty
}
