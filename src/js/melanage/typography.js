import { MetaProperty, MetaPropertyGrouping }       from "../lib/MetaProperty.js"
import { CSSClassTemplate } from "../lib/CSSClass.js"
import { ExampleTemplate }  from "../lib/ExampleTemplate.js"

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

const typography = MetaPropertyGrouping.singleton(fontSizes)
export {
  typography,
}
