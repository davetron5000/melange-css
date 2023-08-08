import MetaProperty         from "../../lib/MetaProperty.js"
import MetaPropertyGrouping from "../../lib/MetaPropertyGrouping.js"
import CSSClassTemplate     from "../../lib/CSSClassTemplate.js"
import Scale                from "../../lib/scales/Scale.js"
import Example              from "../../lib/Example.js"

const flexExampleTemplate = (selector) => {
  let fullSelector = `flex ${selector}`
  if ( (selector == "flex") || (selector == "inline-flex") ) {
    fullSelector = selector
  }
  const htmlForDocs = `<div class="${fullSelector}">
  <div>Dune</div>
  <div>Dune: Messiah</div>
  <div>Children of Dune</div>
  <div>God Emperor of Dune</div>
  <div>Heretics of Dune</div>
  <div>Chapterhouse: Dune</div>
</div>`
  const markupForRendering = "<div style=\"width: 60%\">" + 
    htmlForDocs.
    replace("<div ","<div style=\"gap: 0.25rem;\" ").
    replaceAll("<div>","<div style=\"padding: 0.25rem; border: solid thin black;\">") + "</div>"
  return new Example({
    htmlForDocs: htmlForDocs,
    markupForRendering: markupForRendering,
  })
}

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
    Scale.forLiteralValues({
      "column": "column",
      "row": "row",
      "column-reverse": "column-reverse",
      "row-reverse": "row-reverse",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("flex", "flex-direction", {
      exampleTemplate: flexExampleTemplate,
    }),
  ],
})
const flexWrap = new MetaProperty({
  name: "Flex Wrap",
  cssClassTemplates: [
    new CSSClassTemplate("flex", "flex-wrap", {
      exampleTemplate: flexExampleTemplate,
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

const displayExampleTemplate = (selector) => {
  const oneDiv = `<div style="background-color: #ddd; width: 4rem; height: 4rem; margin: 1rem; padding: 1rem; white-space: nowrap" class="${selector}">${selector}</div>`
  const markupForRendering = [
    oneDiv,
    oneDiv,
    oneDiv,
  ].join("\n")
  return new Example({
    markupForRendering: markupForRendering
  })
}

const displays = new MetaProperty({
  name: "Display",
  cssClassTemplates: [
    new CSSClassTemplate("d", "display", {
      exampleTemplate: displayExampleTemplate
    })
  ],
  enumeratedValues: [
    Scale.forLiteralValues(
      {
        "b": "block",
        "i": "inline",
        "ib": "inline-block",
        "n": "none",
      },
      {
        dashPrefix: false
      }
    )
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
export default display
