import MetaProperty from "../lib/MetaProperty.js"
import MetaPropertyGrouping    from "../lib/MetaPropertyGrouping.js"
import CSSClassTemplate                   from "../lib/CSSClassTemplate.js"
import Scale from "../lib/scales/Scale.js"
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

    const blah = Scale.forLiteralValues({
      "column": "column",
      "row": "row",
      "column-reverse": "column-reverse",
      "row-reverse": "row-reverse",
    })
const flexDirection = new MetaProperty({
  name: "Flex Direction",
  enumeratedValues: [ blah ],
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
    Scale.forLiteralValues({
      "wrap": "wrap",
      "nowrap": "nowrap",
      "wrap-reverse": "wrap-reverse",
    })
  ]
})

const displayExampleTemplate = new ExampleTemplate({
  classesRequiredForSelector: "w-5 h-5 ma-1 pa-1",
  stylesToAddToMarkup: {
    border: "solid thin black",
  }
})
displayExampleTemplate._htmlForDocs = (selector, content) => {
  return `<div class="${selector}">${content}</div>
<div class="${selector}">${content}</div>
<div class="${selector}">${content}</div>`
}


const displays = new MetaProperty({
  name: "Display",
  cssClassTemplates: [
    new CSSClassTemplate("d", "display", {
      exampleTemplate: displayExampleTemplate
    })
  ],
  enumeratedValues: [
    Scale.forLiteralValues({
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
    Scale.forLiteralValues({
      "": "table",
      "c": "table-cell",
      "row": "table-row",
      "row-group": "table-row-group",
      "column": "table-column",
      "column-group": "table-column-group",
    })
  ]
})

const display = new MetaPropertyGrouping({name: "Display and Flexbox",
  metaProperties: [
    displays,
    tableDisplay,
    flexMetaProperty,
    inlineFlex,
    flexNone,
    flexDirection,
    flexWrap,
  ]
})
export {
  display,
}
