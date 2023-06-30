import { DefaultPseudoSelector }                    from "./PseudoSelector.js"
import { EnumeratedValues, LiteralEnumeratedValue } from "./EnumeratedValues.js"
import { CSSClassTemplate }                         from "./CSSClass.js"

/*
 * A Meta Property is the combination of one or more related CSS classes, a list
 * of enumerated values per class and pseudo selectors.  It is the combination
 * of these three axes on which a series of CSS classes is produced.
 */
class MetaProperty {
  /*
   * name - a human-readable name for this meta property.  Not used to create CSS, but just for documentation
   * enumeratedValues - a list of EnumeratedValues instances (themselves a list of EnumeratedValue instances) that
   *                    represent all the combinations of values for the classes described in cssClassTemplates.
   * pseudoSelectors - a list of PseudoSelector instances representing the selectors that should have classes 
   *                   created, for example, you may want background colors, but also background colors only on hover.
   * cssClassTemplates - a list of CSSClassTemplate instances that describe a CSS class to be created for each
   *                     EnumeratedValue and PseudoSelector, along with what CSS properties should be given the values from 
   *                     the EnumeratedValue
   */
  constructor({name, enumeratedValues, pseudoSelectors, cssClassTemplates}) {
    this.name              = name
    this._enumeratedValues = enumeratedValues
    this.pseudoSelectors   = pseudoSelectors || [ new DefaultPseudoSelector() ]
    this.cssClassTemplates = cssClassTemplates
  }
  enumeratedValues() {
    return this._enumeratedValues
  }

  static forSingleProperty({ name, enumeratedValue, cssClassTemplate, pseudoSelectors }) {
    return new MetaProperty({
      name: name,
      cssClassTemplates: [ cssClassTemplate ],
      pseudoSelectors: pseudoSelectors,
      enumeratedValues: [ new EnumeratedValues([ enumeratedValue ]) ],
    })
  }
  static literal(cssClassName, cssProperty, value, pseudoSelectors) {
    return new MetaProperty({
      name: cssClassName,
      cssClassTemplates: [ new CSSClassTemplate(cssClassName, cssProperty) ],
      pseudoSelectors: pseudoSelectors,
      enumeratedValues: [ new EnumeratedValues([ new LiteralEnumeratedValue({ suffix: "", value: value }) ]) ],
    })
  }
}


/*
 * A grouping of MetaProperties for the purposes of organization or documentation.
 */
class MetaPropertyGrouping {
  constructor({name, metaProperties}) {
    this.name = name
    this.metaProperties = metaProperties
  }
  static singleton(metaProperty) {
    return new MetaPropertyGrouping({ name: metaProperty.name, metaProperties: [ metaProperty ]})
  }
}
export {
  MetaProperty,
  MetaPropertyGrouping
}
