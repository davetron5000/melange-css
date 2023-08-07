import { MetaProperty, MetaPropertyGrouping } from "../lib/MetaProperty.js"
import { CSSClassTemplate }                   from "../lib/CSSClass.js"
import { LiteralEnumeratedValue }             from "../lib/EnumeratedValues.js"
import { ExampleTemplate }                    from "../lib/ExampleTemplate.js"

class FlexExampleTemplate extends ExampleTemplate {

  _htmlForDocs(selector, content) {
      return `<div class="${selector}">
  <div>Dune</div>
  <div>Dune: Messiah</div>
  <div>Children of Dune</div>
  <div>God Emperor of Dune</div>
  <div>Heretics of Dune</div>
  <div>Chapterhouse: Dune</div>
</div>`
  }

  _markupForRendering(htmlForDocs) {
    return "<div>" + 
      htmlForDocs.
      replace("<div ","<div style=\"gap: 0.25rem;\" ").
      replaceAll("<div>","<div style=\"padding: 0.25rem; border: solid thin black;\">") + "</div>"
  }
}
class FlexWrapExampleTemplate extends FlexExampleTemplate {

  _markupForRendering(htmlForDocs) {
    return "<div style=\"width: 40%\">" + 
      htmlForDocs.
      replace("<div ","<div style=\"gap: 0.25rem;\" ").
      replaceAll("<div>","<div style=\"padding: 0.25rem; border: solid thin black;\">") + "</div>"
  }
}

const flexExampleTemplate = new FlexExampleTemplate()
const flexExampleTemplateWithFlex = new FlexExampleTemplate({ classesRequiredForSelector: "flex"})
const flexExampleTemplateWrap = new FlexWrapExampleTemplate({ classesRequiredForSelector: "flex"})

const flexMetaProperty = MetaProperty.literal({
  className: "flex",
  property: "display",
  value: "flex",
  exampleTemplate: flexExampleTemplate,
})

const inlineFlex = MetaProperty.literal({
  className: "inline-flex",
  property: "display", 
  value: "inline-flex",
  exampleTemplate: flexExampleTemplate,
})

const flexNone = MetaProperty.literal({
  className: "flex-none",
  property: "flex",
  value: "none",
})

const flexDirection = new MetaProperty({
  name: "Flex Direction",
  enumeratedValues: [
    LiteralEnumeratedValue.literalValues({
      "-column": "column",
      "-row": "row",
      "-column-reverse": "column-reverse",
      "-row-reverse": "row-reverse",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("flex", "flex-direction", {
      exampleTemplate: flexExampleTemplateWithFlex
    }),
  ],
})
const flexWrap = new MetaProperty({
  name: "Flex Wrap",
  cssClassTemplates: [
    new CSSClassTemplate("flex", "flex-wrap", {
      exampleTemplate: flexExampleTemplateWrap,
    })
  ],
  enumeratedValues: [
    LiteralEnumeratedValue.literalValues({
      "-wrap": "wrap",
      "-nowrap": "nowrap",
      "-wrap-reverse": "wrap-reverse",
    })
  ]
})

const displayExampleTemplate = new ExampleTemplate({
  classesRequiredForSelector: "w5 h5 m1 p1",
  stylesToAddToMarkup: {
    border: "solid thin black",
  }
})
displayExampleTemplate._htmlForDocs = (selector, content) => {
  return `<div class="${selector}">${content}</div>
<div class="${selector}">${content}</div>
<div class="${selector}">${content}</div>`
}


const display = new MetaProperty({
  name: "Display",
  cssClassTemplates: [
    new CSSClassTemplate("d", "display", {
      exampleTemplate: displayExampleTemplate
    })
  ],
  enumeratedValues: [
    LiteralEnumeratedValue.literalValues({
      "b": "block",
      "i": "inline",
      "ib": "inline-block",
      "n": "none",
    })
  ]
})

const tableDisplay = new MetaProperty({
  name: "Table Display",
  docs: [
    "Table-related display values can also be set",
  ],
  cssClassTemplates: [
    new CSSClassTemplate("dt", "display", { })
  ],
  enumeratedValues: [
    LiteralEnumeratedValue.literalValues({
      "": "table",
      "c": "table-cell",
      "-row": "table-row",
      "-row-group": "table-row-group",
      "-column": "table-column",
      "-column-group": "table-column-group",
    })
  ]
})

const flex = new MetaPropertyGrouping({name: "Display and Flexbox",
  metaProperties: [
    display,
    tableDisplay,
    flexMetaProperty,
    inlineFlex,
    flexNone,
    flexDirection,
    flexWrap,
  ]
})
export {
  flex,
}
