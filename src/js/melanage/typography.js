import { MetaProperty, MetaPropertyGrouping } from "../lib/MetaProperty.js"
import { CSSClassTemplate }                   from "../lib/CSSClass.js"
import { ExampleTemplate }                    from "../lib/ExampleTemplate.js"
import { LiteralScale }                       from "../lib/Scale.js"

import { fontScale } from "./scales.js"

const exampleTemplate = new ExampleTemplate({
  contentForDemonstration: "Greetings, programs!  Remember: fight for the users!",
  stylesToAddToMarkup: {
    "max-width": "75%",
  }
})

const fontSizes = new MetaProperty({
  name: "Font Scale",
  enumeratedValues: [
    fontScale,
  ],
  cssClassTemplates: [
    new CSSClassTemplate("f", "font-size", {
      docs: [
        "Font size is the basic underpinning of any design system. These sizes should provide an adequate array of sizes for any occasion.  Append a number to <code>f</code> to generate the size you need",
      ],
      exampleTemplate: exampleTemplate,
    }),
  ]
})
const summarization = []
summarization.push(`<div style=\"display: flex; align-items: baseline; margin-bottom: 1rem;\"><h3 style="width: 8rem;"><a style=\"color: black; text-decoration: underline;\" href=\"#${fontSizes.name}\">${fontSizes.name}</a></h3>`)
fontSizes.cssClassTemplates.forEach( (cssClassTemplate) => {
  fontSizes.enumeratedValues().forEach( (enumeratedValues) => {
    enumeratedValues.eachValue( (enumeratedValue) => {
      const cssClass = cssClassTemplate.toCSSClass(enumeratedValue)
      if (cssClass.propertiesAndValues['font-size']) {
        summarization.push(`<div>
  <div style=\"margin-right: 1rem; padding: 1rem;">
    <span style=\"font-size: ${cssClass.propertiesAndValues['font-size']}\">Aa</span>
  </div>
</div>`)
      }
    })
  })
})
summarization.push("</div>")

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
        contentForDemonstration: `
The studio was filled with the rich odour of roses, and when the light 
summer wind stirred amidst the trees of the garden, there came through the 
open door the heavy scent of the lilac, or the more delicate perfume of the 
pink-flowering thorn.
`
      }),
    }),
  ]
})
const textAlign = new MetaProperty({
  name: "Text Align",
  enumeratedValues: [
    new LiteralScale({
      "-right": "right",
      "-center": "center",
      "-justify": "justify",
      "-left": "left",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("text", "text-align", {
      exampleTemplate: new ExampleTemplate({
        classesRequiredForSelector: "w6",
        contentForDemonstration: "The spice must flow!",
      }),
    }),
  ]
})
const leading = new MetaProperty({
  name: "Leading/Line Height",
  enumeratedValues: [
    new LiteralScale({
      "-solid": "1",
      "-title": "1.25",
      "-copy": "1.5",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("lh", "line-height", {
      exampleTemplate: new ExampleTemplate({
        classesRequiredForSelector: "measure",
        contentForDemonstration: `
The studio was filled with the rich odour of roses, and when the light 
summer wind stirred amidst the trees of the garden, there came through the 
open door the heavy scent of the lilac, or the more delicate perfume of the 
pink-flowering thorn.
`
      }),
    }),
  ]
})

const typography = new MetaPropertyGrouping({
  name: "Typography",
  metaProperties: [ measure, fontSizes, textAlign, leading ],
  summarization: summarization.join("\n")
})



export {
  typography,
}
