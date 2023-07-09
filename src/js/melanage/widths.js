import { MetaProperty, MetaPropertyGrouping } from "../lib/MetaProperty.js"
import { LiteralScale }                       from "../lib/Scale.js"
import { CSSClassTemplate }                   from "../lib/CSSClass.js"
import { ExampleTemplate }                    from "../lib/ExampleTemplate.js"
import { spacingFixedScale }                  from "./scales.js"
import {
  percentageScale,
  autoScale,
  thirdsScale }                               from "./scales.js"

const measureScale = new LiteralScale({
  "": "30rem",
  "-wide": "40rem",
  "-narrow": "25rem",
})

const measure = new MetaProperty({
  name: "Measure",
  docs: "Measure allows styling maximum widths when text is involved, to ensure the text wraps properly for good reading",
  enumeratedValues: [ measureScale ],
  cssClassTemplates: [
    new CSSClassTemplate("measure", "max-width", {
      exampleTemplate: new ExampleTemplate({
        contentForDemonstration: "The studio was filled with the rich odour of roses, and when the light summer wind stirred amidst the trees of the garden, there came through the open door the heavy scent of the lilac, or the more delicate perfume of the pink-flowering thorn."
      }),
    }),
  ]
})

const maxWidthExampleTemplate = new ExampleTemplate({
})

maxWidthExampleTemplate._markupForRendering = (htmlForDocs) => {
  const styledHTML = htmlForDocs.replace("<div",`<div style=\"border: solid thin black; background-color: #ddd; color: #222;\"`)
  return "<div style=\"border: dashed thin black; width: 33%; margin: 0.5rem; \">" + styledHTML + "</div>"
}

const widthsMetaProperty = new MetaProperty({
  name: "width",
  enumeratedValues: [
    spacingFixedScale,
    percentageScale,
    autoScale,
    thirdsScale,
  ],
  cssClassTemplates: [
    new CSSClassTemplate("w", "width", {
      exampleTemplate: new ExampleTemplate({
        docs: "Sets the width of the element to either a step in the scale or a given percentage",
        stylesToAddToMarkup: {
          "padding": "0.5rem",
          "border": "solid thin black",
          "background-color": "#ddd",
          "color": "#222",
        }
      })
    }),
    new CSSClassTemplate("mw", "max-width", {
      docs: "Sets the max width of the element to either a step in the scale or a given percentage",
    }),
  ]
})

const widths = new MetaPropertyGrouping({
  name: "Widths",
  metaProperties: [
    measure,
    widthsMetaProperty,
  ]
})
export {
  widths,
}
