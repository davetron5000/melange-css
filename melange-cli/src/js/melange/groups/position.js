import MetaProperty                  from "../../lib/MetaProperty.js"
import MetaPropertyGrouping          from "../../lib/MetaPropertyGrouping.js"
import CSSClassTemplate              from "../../lib/CSSClassTemplate.js"
import Scale                         from "../../lib/scales/Scale.js"

import {
  spacingScale,
  negativeSpacingScale
} from "../scales.js"
import mediaQueries from "../MediaQueries.js"

const positions = new MetaProperty({
  name: "Position",
  literalClasses: {
    "pos-static":   { properties: { "position": "static" }},
    "pos-relative": { properties: { "position": "relative" }},
    "pos-absolute": { properties: { "position": "absolute" }},
    "pos-fixed":    { properties: { "position": "fixed" }},
  },
})

const locations = new MetaProperty({
  name: "Location",
  docs: [
    "The properties can be used with the position values to place things explicitly.  Note that in addition to the positive values like <code>left-4</code> or <code>top-2</code>, there are <strong>negative</strong> values as well, like <code>left--4</code> and <code>top--2</code>.",
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
  mediaQueries: mediaQueries.onlyBreakpoints(),
  docs: [
    "Position provides classes for fixed, absolute, or static positioning, along with some classes for basic position top, left, right, and bottom.",
  ]
})



export default position
