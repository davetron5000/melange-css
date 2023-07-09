import { MetaProperty, MetaPropertyGrouping } from "../lib/MetaProperty.js"
import { CSSClassTemplate }                   from "../lib/CSSClass.js"
import { ExampleTemplate }                    from "../lib/ExampleTemplate.js"
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

const spacingsMetaProperty = new MetaProperty({
  name: "Spacings",
  docs: [
    "Spacing manages both margins and padding along a grid of reasonable spacings usable for any occasion",
    "Each spacing can be applied to the entire box, horizontally, vertically, or to individual dimensions",
  ],
  enumeratedValues: [
    spacingFixedScale
  ],
  cssClassTemplates: [
    new CSSClassTemplate("p", "padding", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("pl", "padding-left", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("pr", "padding-right", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("pt", "padding-top", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("pb", "padding-bottom", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("ph", "padding-left", "padding-right", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("pv", "padding-top", "padding-bottom", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("m", "margin", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("ml", "margin-left", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("mr", "margin-right", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("mt", "margin-top", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("mb", "margin-bottom", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("mh", "margin-left", "margin-right", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("mv", "margin-top", "margin-bottom", { exampleTemplate: marginExampleTemplate }),
  ]
})

const spacings = MetaPropertyGrouping.singleton(spacingsMetaProperty)

export {
  spacings,
}
