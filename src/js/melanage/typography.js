import { MetaProperty, MetaPropertyGrouping }       from "../lib/MetaProperty.js"
import { CSSClassTemplate }   from "../lib/CSSClass.js"

import { fontScale } from "./scales.js"

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
      exampleTemplate: {
        html: (selector, pseudoSelector) => { return `<p class=\"${selector}\">Greetings, programs!  Please remember to fight for the users!</p>` },
        markup: (selector, pseudoSelector, html) => {
          return html.replace("<p ","<p style=\"max-width: 75%;\" ")
        }
      }
    }),
  ]
})

const typography = MetaPropertyGrouping.singleton(fontSizes)
export {
  typography,
}
