import Example from "./Example.js"
export default class ExampleTemplate {
  constructor(optionsOrFunction = {}) {
    if (typeof optionsOrFunction === "function") {
      this.htmlFunction = optionsOrFunction
    }
    else {
      this.htmlFunction               = undefined
      this.classesRequiredForSelector = Array(optionsOrFunction.classesRequiredForSelector || []).flat()
      this.contentForDemonstration    = optionsOrFunction.contentForDemonstration
      this.stylesToAddToMarkup        = optionsOrFunction.stylesToAddToMarkup || {}
    }
  }

  static divWithSelector(content) {
    return (selector) => `<div class="${selector}">\n  ${content}\n</div>`
  }

  example(selector) {
    if (this.htmlFunction) {
      const html = this.htmlFunction(selector)
      if (html) {
        if (html instanceof Example) {
          if (!html.htmlForDocs) {
            html.htmlForDocs = `<div class="${selector}">.${selector}</div>`
          }
          return html
        }
        else {
          return new Example({
            htmlForDocs: html,
            markupForRendering: html,
          })
        }
      }
      else {
        throw `ExampleTemplate.htmlFunction returned nothing for ${selector}`
      }
    }
    else {
      const fullSelector = this.classesRequiredForSelector.concat([selector]).join(" ")
      const content = this.contentForDemonstration ? this.contentForDemonstration : `.${selector}`
      const htmlForDocs = this._htmlForDocs(fullSelector, content)
      if (!htmlForDocs || htmlForDocs =="") {
        throw `WTAF: ${fullSelector}`
      }
      const markupForRendering = this._markupForRendering(htmlForDocs)

      return new Example({
        htmlForDocs: htmlForDocs,
        markupForRendering: markupForRendering,
      })
    }
  }

  _htmlForDocs(selector, content) {
    return `<div class=\"${selector}\">${content}</div>`
  }

  _markupForRendering(htmlForDocs) {
    const styleTag = Object.keys(this.stylesToAddToMarkup).map( (key) => {
      return `${key}: ${this.stylesToAddToMarkup[key]}`
    }).join("; ")
    return htmlForDocs.replaceAll("<div ",`<div style=\"${styleTag}\" `)
  }
}
