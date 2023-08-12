import DefaultPseudoSelector         from "./DefaultPseudoSelector.js"
import CSSClassTemplate              from "./CSSClassTemplate.js"
import ScaleAgnosticCSSClassTemplate from "./ScaleAgnosticCSSClassTemplate.js"
import Scale                         from "./scales/Scale.js"
import Step                          from "./scales/Step.js"
import DocStrings                    from "./DocStrings.js"

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
   *                     the Step. Required if literalClasses is omitted and may not be specified if it is not.
   * literalClasses - as a convienience to using ScaleAgnosticCSSClassTemplate directly, you can pass in
   *                  an object that create literal classes that can still be combined
   *                  with pseudo selectors and media queries.  The format is:
   *                  {
   *                    "classBase": {
   *                      "properites: " {
   *                        "css-property": "css-value",
   *                        "css-property": "css-value",
   *                        etc,
   *                      },
   *                      any: other,
   *                      options: arePassedToCSSClassTemplate,
   *                    },
   *                    etc.
   *                  }
   */
  constructor({name, docs, scales, pseudoSelectors, cssClassTemplates, literalClasses}) {
    this.name              = name
    this._scales           = scales || [ Scale.forLiteralValues({ "": "" }) ]
    this.pseudoSelectors   = pseudoSelectors || [ new DefaultPseudoSelector() ]
    this.docs              = new DocStrings(docs)
    if (cssClassTemplates) {
      if (literalClasses) {
        throw "You may not provide both cssClassTemplates and literalClasses"
      }
      this.cssClassTemplates = cssClassTemplates
    }
    else {
      if (!literalClasses) {
        throw "You must provide either cssClassTemplates or literalClasses"
      }
      this.cssClassTemplates = Object.entries(literalClasses).map( ([name,literalClass]) => {
        if ( (literalClass.properties) && Object.keys(literalClass.properties).length > 0) {
          const { properties: properties, ...options } = literalClass
          return new ScaleAgnosticCSSClassTemplate(name, properties, options)
        }
        else {
          throw `${name} has no properties while trying to create MetaProperty ${this.name}`
        }

      })
    }
  }

  scales() {
    return this._scales
  }

  totalSteps() {
    return this._scales.reduce( (accumulator, scale) => {
      return accumulator + scale.numSteps()
    }, 0)
  }

  /*
   * Used to create a simple MetaProperty that has no scales, but where you still want
   * to have derieved classes for media queries and pseudo selectors.
   *
   *
   * className - the classname you want to use for the default media query with no pseudo selectors.
   * property - the CSS property to set
   * value - the value to set in the CSS
   * pseudoSelectors - the PseudoSelector instances to use to derive more classes
   * exampleTemplate - An ExampleTemplate or function as described in CSSClassTemplate 
   */
  static literal( { name, className, property, value, pseudoSelectors, exampleTemplate }) {
    const cssClassTemplateOptions = {}
    if (exampleTemplate) {
      cssClassTemplateOptions.exampleTemplate = exampleTemplate
    }
    return new MetaProperty({
      name: name || className,
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
