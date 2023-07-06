import { MetaProperty }               from "../lib/MetaProperty.js"
import { CSSClassTemplate }           from "../lib/CSSClass.js"

import { spacingFixedScale } from "./scales.js"

const paddingExampleTemplate = {
  html: (selector, pseudoSelector) => {
    return `<div class=\"${selector}\">.${selector}</div>`
  },
  markup: (selector, pseudoSelector, html) => {
    return html.replace("<div ","<div style=\"display: inline-block; border: solid thin; background-color: #ddd; color: #222;\" ")
  }
}
const marginExampleTemplate = {
  html: (selector, pseudoSelector) => { return `<div class="${selector}">.${selector}</div>` },
  markup: (selector, pseudoSelector, html) => {
    const innerHTML = html.replace("<div ","<div style=\"border: solid thin black; background-color: #ddd; color: #222;\" ")
    return `<div style=\"display: inline-block; border: dashed thin black\">${innerHTML}</div>`
  }
}


const spacings = new MetaProperty({
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

export {
  spacings,
}
