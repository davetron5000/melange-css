class Example {
  constructor({ htmlForDocs, markupForRendering }) {
    this.htmlForDocs = htmlForDocs
    this.markupForRendering = markupForRendering
  }

  html() { return this.htmlForDocs }
  escapedHtml() { return this.html().replace(/</g,"&lt;").replace(/>/g,"&gt;") }
  markup() { return this.markupForRendering }

  hasMarkup() { return !!this.markupForRendering }
}

class ExampleTemplate {
  constructor({
    classesRequiredForSelector,
    contentForDemonstration,
    stylesToAddToMarkup,
  } = {}) {
    this.classesRequiredForSelector = Array(classesRequiredForSelector || []).flat()
    this.contentForDemonstration    = contentForDemonstration
    this.stylesToAddToMarkup        = stylesToAddToMarkup || {}
  }

  example(selector) {
    const fullSelector = this.classesRequiredForSelector.concat([selector]).join(" ")
    const content = this.contentForDemonstration ? this.contentForDemonstration : `.${selector}`
    const htmlForDocs = this._htmlForDocs(fullSelector, content)
    const markupForRendering = this._markupForRendering(htmlForDocs)

    return new Example({
      htmlForDocs: htmlForDocs,
      markupForRendering: markupForRendering,
    })
  }

  _htmlForDocs(selector, content) {
    return `<div class=\"${selector}\">${content}</div>`
  }

  _markupForRendering(htmlForDocs) {
    const styleTag = Object.keys(this.stylesToAddToMarkup).map( (key) => {
      return `${key}: ${this.stylesToAddToMarkup[key]}`
    }).join("; ")
    return htmlForDocs.replace("<div ",`<div style=\"${styleTag}\" `)
  }
}
export {
  Example,
  ExampleTemplate,
}
