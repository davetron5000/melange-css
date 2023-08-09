import MetaProperty                  from "../../lib/MetaProperty.js"
import MetaPropertyGrouping          from "../../lib/MetaPropertyGrouping.js"
import CSSClassTemplate              from "../../lib/CSSClassTemplate.js"
import ScaleAgnosticCSSClassTemplate from "../../lib/ScaleAgnosticCSSClassTemplate.js"
import Scale                         from "../../lib/scales/Scale.js"

import {
  spacingScale,
  negativeSpacingScale
} from "../scales.js"

const positions = new MetaProperty({
  name: "Position",
  scales: [ Scale.forLiteralValues({ "": "" }) ],
  cssClassTemplates: [
    new ScaleAgnosticCSSClassTemplate("static", { "position": "static" }),
    new ScaleAgnosticCSSClassTemplate("relative", { "position": "relative" }),
    new ScaleAgnosticCSSClassTemplate("absolute", { "position": "absolute" }),
    new ScaleAgnosticCSSClassTemplate("fixed", { "position": "fixed" }),
  ],
})

const locations = new MetaProperty({
  name: "Locations (top/left/right/bottom)",
  docs: [
    "The properties can be used with the position values to place things explicitly.  Note that in addition to the positive values like <code>left4</code> or <code>top2</code>, there are <strong>negative</strong> values as well, like <code>left-4</code> and <code>top-2</code>.",
  ],
  scales: [
    spacingScale,
    negativeSpacingScale,
  ],
  cssClassTemplates: [
    new CSSClassTemplate("top", "top"),
    new CSSClassTemplate("left", "left"),
    new CSSClassTemplate("right", "right"),
    new CSSClassTemplate("bottom", "bottom"),
  ]
})


const position = new MetaPropertyGrouping({
  name: "Position",
  metaProperties: [ 
    positions,
    locations,
  ],
})



export default position
