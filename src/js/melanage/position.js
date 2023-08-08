import { MetaProperty, MetaPropertyGrouping } from "../lib/MetaProperty.js"
import CSSClassTemplate                   from "../lib/CSSClassTemplate.js"
import { ExampleTemplate }                    from "../lib/ExampleTemplate.js"
import LiteralEnumeratedValues                       from "../lib/scales/LiteralEnumeratedValues.js"
import { spacingFixedScale, negativeSpacingFixedScale } from "./scales.js"

const positions = new MetaProperty({
  name: "Position",
  enumeratedValues: [
    new LiteralEnumeratedValues(
      {
        "static": "static",
        "relative": "relative",
        "absolute": "absolute",
        "fixed": "fixed",
      },
      {
        dashPrefix: false
      }
    )
  ],
  cssClassTemplates: [
    new CSSClassTemplate("", "position"),
  ]
})

const locations = new MetaProperty({
  name: "Locations (top/left/right/bottom)",
  docs: [
    "The properties can be used with the position values to place things explicitly.  Note that in addition to the positive values like <code>left4</code> or <code>top2</code>, there are <strong>negative</strong> values as well, like <code>left-4</code> and <code>top-2</code>.",
  ],
  enumeratedValues: [
    spacingFixedScale,
    negativeSpacingFixedScale,
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



export {
  position
}
