import { MetaProperty, MetaPropertyGrouping } from "../lib/MetaProperty.js"
import CSSClassTemplate                   from "../lib/CSSClassTemplate.js"
import { ExampleTemplate }                    from "../lib/ExampleTemplate.js"
import LiteralEnumeratedValue from "../lib/scales/LiteralEnumeratedValue.js"
import { spacingFixedScale }                  from "./scales.js"

const paddingExampleTemplate = new ExampleTemplate({
  stylesToAddToMarkup: {
    "display": "inline-block",
    "border": "solid thin",
    "background-color": "#ddd",
    "color": "#222",
  }
})
const marginExampleTemplate = new ExampleTemplate()
marginExampleTemplate._markupForRendering = (htmlForDocs) => {
  const innerHTML = htmlForDocs.replace("<div ","<div style=\"border: solid thin black; background-color: #ddd; color: #222;\" ")
  return `<div style=\"display: inline-block; border: dashed thin black\">${innerHTML}</div>`
}

const paddingMetaProperty = new MetaProperty({
  name: "Padding",
  docs: [
    "Padding is space internal to the box and can be controlled in all four directions, horizontally, vertically, or each individually",
  ],
  enumeratedValues: [
    spacingFixedScale
  ],
  cssClassTemplates: [
    new CSSClassTemplate("pa", "padding", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("pl", "padding-left", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("pr", "padding-right", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("pt", "padding-top", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("pb", "padding-bottom", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("ph", "padding-left", "padding-right", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("pv", "padding-top", "padding-bottom", { exampleTemplate: paddingExampleTemplate }),
  ]
})
const marginMetaProperty = new MetaProperty({
  name: "Margin",
  docs: [
    "Margin is space outside the box and can be controlled in all four directions, horizontally, vertically, or each individually",
  ],
  enumeratedValues: [
    spacingFixedScale
  ],
  cssClassTemplates: [
    new CSSClassTemplate("ma", "margin", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("ml", "margin-left", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("mr", "margin-right", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("mt", "margin-top", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("mb", "margin-bottom", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("mh", "margin-left", "margin-right", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("mv", "margin-top", "margin-bottom", { exampleTemplate: marginExampleTemplate }),
  ]
})

const floatExampleTemplate = new ExampleTemplate()
floatExampleTemplate._markupForRendering = (htmlForDocs) => {
  const innerHTML = htmlForDocs.replace("<div ","<div style=\"border: solid thin black; display: inline; padding-left: 1rem; padding-right: 1rem; background-color: #ddd; color: #222;\" ")
  return `<div style=\"width: 8rem; display: inline-block; border: dashed thin black\">${innerHTML}</div>`
}
const floats = new MetaProperty({
  name: "Floats",
  enumeratedValues: [
    LiteralEnumeratedValue.literalValues({
      "l": "left",
      "r": "right",
      "n": "none",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("f", "float", { exampleTemplate: floatExampleTemplate })
  ]
})

const spacings = new MetaPropertyGrouping({
  name: "Spacings",
  metaProperties: [  
    floats,
    paddingMetaProperty,
    marginMetaProperty,
  ],
})

export {
  spacings,
}
