import DefaultPseudoSelector                    from "./DefaultPseudoSelector.js"
import CSSClassTemplate                         from "./CSSClassTemplate.js"
import Scale from "./scales/Scale.js"
import Step from "./scales/Step.js"
import DocStrings from "./DocStrings.js"

/*
 * A Meta Property is the combination of one or more related CSS classes, a list
 * of enumerated values per class and pseudo selectors.  It is the combination
 * of these three axes on which a series of CSS classes is produced.
 */
export default class MetaProperty {
  /*
   * name - a human-readable name for this meta property.  Not used to create CSS, but just for documentation
   * scales - a list of Scale instances (themselves a list of Step instances) that
   *          represent all the combinations of values for the classes described in cssClassTemplates.
   * pseudoSelectors - a list of PseudoSelector instances representing the selectors that should have classes 
   *                   created, for example, you may want background colors, but also background colors only on hover.
   * cssClassTemplates - a list of CSSClassTemplate instances that describe a CSS class to be created for each
   *                     Step and PseudoSelector, along with what CSS properties should be given the values from 
   *                     the Step
   */
  constructor({name, docs, scales, pseudoSelectors, cssClassTemplates}) {
    this.name              = name
    this._scales = scales
    this.pseudoSelectors   = pseudoSelectors || [ new DefaultPseudoSelector() ]
    this.cssClassTemplates = cssClassTemplates
    this.docs              = new DocStrings(docs)
  }
  scales() {
    return this._scales
  }

  /*
   * Used to create a simple MetaProperty that has no scales, but where you still want
   * to have deireved classes for breakpoints and pseudo selectors.
   *
   *
   * className - the classname you want to use for the default breakpoint with no pseudo selectors.
   * property - the CSS property to set
   * value - the value to set in the CSS
   * pseudoSelectors - the PseudoSelector instances to use to derive more classes
   * exampleTemplate - An ExampleTemplate or function as described in CSSClassTemplate 
   */
  static literal( { className, property, value, pseudoSelectors, exampleTemplate }) {
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
      scales: [ Scale.forLiteralValues({ "": value }) ],
    })
  }
}
