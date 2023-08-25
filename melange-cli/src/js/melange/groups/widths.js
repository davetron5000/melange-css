import MetaProperty         from "../../lib/MetaProperty.js"
import MetaPropertyGrouping from "../../lib/MetaPropertyGrouping.js"
import CSSClassTemplate     from "../../lib/CSSClassTemplate.js"
import Example              from "../../lib/Example.js"
import Scale                from "../../lib/scales/Scale.js"

import {
  spacingScale,
  percentageScale,
  viewportHeightScale,
  viewportWidthScale,
} from "../scales.js"
import mediaQueries from "../MediaQueries.js"

const widthsMetaProperty = new MetaProperty({
  name: "width",
  scales: [
    spacingScale,
    percentageScale,
    viewportHeightScale,
    Scale.forLiteralValues({ "auto": "auto" }),
  ],
  cssClassTemplates: [
    new CSSClassTemplate("w", "width", {
      exampleTemplate: (selector) => {
        return new Example({
          markupForRendering: `<div class="${selector} ws-nowrap ba bs-solid bg-gray-lightest gray-darkest pa-1">
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
    Scale.forLiteralValues({ "auto": "auto" }),
  ],
  cssClassTemplates: [
    new CSSClassTemplate("h", "height", {
      exampleTemplate: (selector) => {
        return new Example({
          markupForRendering: `<div class="${selector} ws-nowrap ba bs-solid bg-gray-lightest gray-darkest pa-1">
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

const boxSizing = new MetaProperty({
  name: "Box Sizing",
  docs: [
    "Box sizing controls how the width and height are calculated. <span class=\"fv-sc tracked\">MelangeCSS</span> sets the default to <code>border-box</code> (which is not the browser default) as this avoids some issues with predicting and controlling sizing",
  ],
  literalClasses: {
    "content-box": { properties: { "box-sizing": "content-box" } },
    "border-box": { properties: { "box-sizing": "border-box" } },
  }
})


const widths = new MetaPropertyGrouping({
  name: "Widths and Heights",
  metaProperties: [
    widthsMetaProperty,
    heightsMetaProperty,
    boxSizing,
  ],
  mediaQueries: mediaQueries.onlyBreakpoints(),
  docs: [
    "Along with the spacings group, widths and heights allow control over sizes using the built-in spacing scale.  The widths and heights here are identical to the value used in the spacings group, so your design should have visual harmony and consistency.",
  ]
})
export default widths
