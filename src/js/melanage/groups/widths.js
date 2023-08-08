import MetaProperty         from "../../lib/MetaProperty.js"
import MetaPropertyGrouping from "../../lib/MetaPropertyGrouping.js"
import CSSClassTemplate     from "../../lib/CSSClassTemplate.js"
import Example              from "../../lib/Example.js"
import Scale                from "../../lib/scales/Scale.js"

import {
  spacingScale,
  percentageScale,
  thirdsScale
} from "../scales.js"

const widthsMetaProperty = new MetaProperty({
  name: "width",
  scales: [
    spacingScale,
    percentageScale,
    thirdsScale,
    Scale.forLiteralValues({ "auto": "auto" }),
  ],
  cssClassTemplates: [
    new CSSClassTemplate("w", "width", {
      exampleTemplate: (selector) => {
        return new Example({
          markupForRendering: `<div class="${selector}"
     style="white-space: nowrap; border: solid thin black; background-color: #ddd; color: #222; padding: 0.5rem;">
  .${selector}
</div>`,
        })
      },
    }),
    new CSSClassTemplate("mw", "max-width", {
      docs: "Sets the max width of the element to either a step in the scale or a given percentage",
    }),
  ]
})

const widths = new MetaPropertyGrouping({
  name: "Widths",
  metaProperties: [
    widthsMetaProperty,
  ]
})
export default widths
