import Example from "./Example.js"

export default class ExampleTemplate {
  /*
   * Creates an example template, which is basically a wrapper for a function that generates an Example.
   *
   * exampleGenerator - a function that will be given the selector for the class where an example
   *                    is being created. It must return either a string or an Example instance.
   *                    If it returns a String, that string will be used as both the html and the markup.
   *
   *                    If the Example returned has no htmlForDocs value, then this class
   *                    will use basic HTML as returned by divWithSelector
   */
  constructor(exampleGenerator) {
    this.exampleGenerator = exampleGenerator
  }

  /*
   * Convinience function for creating a basic example template that is used
   * by this class when one is not provided.
   */
  static divWithSelector(content) {
    return (selector) => `<div class="${selector}">\n  ${content}\n</div>`
  }

  example(selector) {
    const example = this.exampleGenerator(selector)
    if (example) {
      if (example instanceof Example) {
        if (!example.htmlForDocs) {
          example.htmlForDocs = ExampleTemplate.divWithSelector(`.${selector}`)(selector)
        }
        return example
      }
      else {
        return new Example({
          htmlForDocs: example,
          markupForRendering: example,
        })
      }
    }
    else {
      throw `ExampleTemplate.htmlFunction returned nothing for ${selector}`
    }
  }
}
