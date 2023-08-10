import MetaProperty         from "../../lib/MetaProperty.js"
import MetaPropertyGrouping from "../../lib/MetaPropertyGrouping.js"
import CSSClassTemplate     from "../../lib/CSSClassTemplate.js"
import Example              from "../../lib/Example.js"
import Scale                from "../../lib/scales/Scale.js"

import {
  spacingScale,
  percentageScale,
  thirdsScale,
  viewportHeightScale,
  viewportWidthScale,
} from "../scales.js"

const widthsMetaProperty = new MetaProperty({
  name: "width",
  scales: [
    spacingScale,
    percentageScale,
    viewportHeightScale,
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
      summary: "Width",
    }),
    new CSSClassTemplate("mw", "max-width", {
      summary: "Max Width",
    }),
  ]
})
const heightsMetaProperty = new MetaProperty({
  name: "height",
  scales: [
    spacingScale,
    percentageScale,
    viewportHeightScale,
    thirdsScale,
    Scale.forLiteralValues({ "auto": "auto" }),
  ],
  cssClassTemplates: [
    new CSSClassTemplate("h", "height", {
      exampleTemplate: (selector) => {
        return new Example({
          markupForRendering: `<div class="${selector}"
     style="white-space: nowrap; border: solid thin black; background-color: #ddd; color: #222; padding: 0.5rem;">
  .${selector}
</div>`,
        })
      },
      summary: "Height",
    }),
    new CSSClassTemplate("max-height", "max-height", {
      summary: "Max Height",
    }),
  ]
})

const widths = new MetaPropertyGrouping({
  name: "Widths and Heights",
  metaProperties: [
    widthsMetaProperty,
    heightsMetaProperty,
  ]
})
export default widths
