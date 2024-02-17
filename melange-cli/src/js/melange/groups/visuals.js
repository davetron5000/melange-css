import MetaProperty         from "../../lib/MetaProperty.js"
import MetaPropertyGrouping from "../../lib/MetaPropertyGrouping.js"
import CSSClassTemplate     from "../../lib/CSSClassTemplate.js"
import Example              from "../../lib/Example.js"
import ExampleTemplate      from "../../lib/ExampleTemplate.js"
import Scale                from "../../lib/scales/Scale.js"
import Step                 from "../../lib/scales/Step.js"

import { percentageScale } from "../scales.js"
import mediaQueries        from "../MediaQueries.js"

const opacityExampleTemplate = (selector) => {
  return new Example({
    htmlForDocs: `<div class="bg-black white ${selector}">\n.${selector}\n</div>`,
    markupForRendering: `<div class="ba bs-gray debug-grid"><div class="bg-black white pa-3 tc ${selector}">.${selector}</div></div>`,
  })
}
const opacity = new MetaProperty({
  name: "Opacity",
  scales: percentageScale,
  cssClassTemplates: [
    new CSSClassTemplate("o", "opacity", { exampleTemplate: opacityExampleTemplate })
  ]
})

const basicTemplate = ExampleTemplate.divWithSelector("The spice must flow!")

const cursors = new MetaProperty({
  name: "Cursors",
  docs: [
    "There are many possibly cursor values, but for brevity, esoteric ones have been omitted.",
  ],
  literalClasses: {
    "cursor-default":  { properties: { cursor: "default" }, exampleTemplate: basicTemplate, summary: "Default" },
    "pointer":         { properties: { cursor: "pointer" }, exampleTemplate: basicTemplate, summary: "Pointer" },
    "cursor-pointer":  { properties: { cursor: "pointer" }, exampleTemplate: basicTemplate, summary: "Pointer" },
    "cursor-progress": { properties: { cursor: "progress" }, exampleTemplate: basicTemplate, summary: "Progress" },
    "cursor-move":     { properties: { cursor: "move" }, exampleTemplate: basicTemplate, summary: "Move" },
    "cursor-grab":     { properties: { cursor: "grab" }, exampleTemplate: basicTemplate, summary: "Grab" }
  }
})

const boxShadowExampleTemplate = (selector) => {
  return new Example({
    htmlForDocs: `<div class="${selector}">\n.${selector}\n</div>`,
    markupForRendering: `<div class="${selector} bg-blue-900 pa-4">${selector}</div>`,
  })
}
const boxShadow = new MetaProperty({
  name: "Box Shadows",
  docs: [
    "There are infinite possibilities for box shadows.  These should provide a few basic options for common needs, however you will likely need to create your own for anything sophisticated",
  ],
  scales: [
    new Scale({
      "none": "none",
      "1": "1px 1px 2px 1px rgba( 0, 0, 0, 0.2 )",
      "2": "1px 1px 4px 2px rgba( 0, 0, 0, 0.2 )",
      "3": "2px 2px 8px 4px rgba( 0, 0, 0, 0.2 )",
      "4": "2px 2px 16px 8px rgba( 0, 0, 0, 0.2 )",
      "5": "2px 2px 32px 16px rgba( 0, 0, 0, 0.2 )",
    }),
  ],
  cssClassTemplates: [
    new CSSClassTemplate("shadow", "box-shadow", { exampleTemplate: boxShadowExampleTemplate, summary: "All" })
  ],
})

const zIndex = new MetaProperty({
  name: "Z Index",
  scales: [
    new Scale(
      [ 0, 1, 2, 3, 4, 5, 9999, "auto" ].map( (step) => {
        return new Step({qualifier: step, value: step})
      })
    ),
  ],
  cssClassTemplates: [
    new CSSClassTemplate("z", "z-index"),
  ]
})


const visuals = new MetaPropertyGrouping({
  name: "Visuals",
  metaProperties: [  
    boxShadow,
    opacity,
    cursors,
    zIndex,
  ],
  mediaQueries: mediaQueries.onlyBreakpoints(),
  docs: [
    "A grab bag of classes that adjust more decorative aspects of a page, such as box shadows, opacity, z-index, and cursors."
  ],
})

export default visuals
