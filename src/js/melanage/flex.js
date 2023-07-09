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
    return "<div style=\"width: 30%;\">" + 
      htmlForDocs.
      replace("<div ","<div style=\"gap: 0.25rem;\" ").
      replaceAll("<div>","<div style=\"padding: 0.25rem; border: solid thin black;\">") + "</div>"
  }
}

const flexExampleTemplate = new FlexExampleTemplate()
const flexExampleTemplateWithFlex = new FlexExampleTemplate({ classesRequiredForSelector: "flex"})

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
      exampleTemplate: flexExampleTemplateWithFlex,
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

const flex = new MetaPropertyGrouping({name: "Flexbox",
  metaProperties: [
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
