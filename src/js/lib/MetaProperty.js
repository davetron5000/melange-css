import { DefaultPseudoSelector }                    from "./PseudoSelector.js"
import CSSClassTemplate                         from "./CSSClassTemplate.js"
import EnumeratedValues from "./scales/EnumeratedValues.js"
import LiteralEnumeratedValue from "./scales/LiteralEnumeratedValue.js"


class DocStrings {
  constructor(docs) {
    this.paragraphs = Array(docs || []).flat()
  }
  forEach(f) {
    this.paragraphs.forEach(f)
  }
}
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
  constructor({name, docs, enumeratedValues, pseudoSelectors, cssClassTemplates}) {
    this.name              = name
    this._enumeratedValues = enumeratedValues
    this.pseudoSelectors   = pseudoSelectors || [ new DefaultPseudoSelector() ]
    this.cssClassTemplates = cssClassTemplates
    this.docs              = new DocStrings(docs)
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
  static literal(
    { className, property, value, pseudoSelectors, exampleTemplate }
  ) {
    const cssClassTemplateOptions = {}
    if (exampleTemplate) {
      cssClassTemplateOptions.exampleTemplate = exampleTemplate
    }
    return new MetaProperty({
      name: className,
      cssClassTemplates: [
        new CSSClassTemplate(
          className,
          property,
          cssClassTemplateOptions
        )
      ],
      pseudoSelectors: pseudoSelectors,
      enumeratedValues: [ new EnumeratedValues([ new LiteralEnumeratedValue({ qualifier: "", value: value }) ]) ],
    })
  }
}


/*
 * A grouping of MetaProperties for the purposes of organization or documentation.
 */
class MetaPropertyGrouping {
  constructor({name, metaProperties, docs, summarization}) {
    this.name           = name
    this.slug           = name.replaceAll(/[\s\*\.\"\']/g,"-").toLowerCase()
    this.metaProperties = metaProperties
    this.docs           = new DocStrings(docs)
    this.summarization  = summarization
  }
  static singleton(metaProperty) {
    return new MetaPropertyGrouping({ name: metaProperty.name, metaProperties: [ metaProperty ]})
  }
}
export {
  MetaProperty,
  MetaPropertyGrouping
}
