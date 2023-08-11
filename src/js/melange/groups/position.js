import MetaProperty                  from "../../lib/MetaProperty.js"
import MetaPropertyGrouping          from "../../lib/MetaPropertyGrouping.js"
import CSSClassTemplate              from "../../lib/CSSClassTemplate.js"
import Scale                         from "../../lib/scales/Scale.js"

import {
  spacingScale,
  negativeSpacingScale
} from "../scales.js"

const positions = new MetaProperty({
  name: "Position",
  literalClasses: {
    static:   { properties: { "position": "static" }},
    relative: { properties: { "position": "relative" }},
    absolute: { properties: { "position": "absolute" }},
    fixed:    { properties: { "position": "fixed" }},
  },
})

const locations = new MetaProperty({
  name: "Location",
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
