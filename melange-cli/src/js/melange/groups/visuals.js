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
    markupForRendering: `<div class="${selector} br-2 bg-blue-900 pa-4 ma-4 ws-nowrap tc">${selector}</div>`,
  })
}


const boxShadow = new MetaProperty({
  name: "Box Shadows",
  docs: [
    "There are infinite possibilities for box shadows.  These should provide a few basic options for common needs, however you will likely need to create your own for anything sophisticated. You can design your own scale <a class='blue-500' href='https://ghola.dev/shadow.html'>using Ghola</a>",
  ],
  scales: [
    new Scale({
      "none": "none",
      "1": "rgb(135, 135, 135) 1px 1px 4px 0px",
      "2": "rgb(135, 135, 135) 1px 1px 10.64px 0px",
      "3": "rgb(135, 135, 135) 1px 1px 15.022px 0px",
      "4": "rgb(135, 135, 135) 1px 1px 22.297px 0px",
      "5": "rgb(135, 135, 135) 1px 1px 34.373px 0px",
      "6": "rgb(135, 135, 135) 1px 1px 54.419px 0px",
    }),
  ],
  cssClassTemplates: [
    new CSSClassTemplate("shadow", "box-shadow", { exampleTemplate: boxShadowExampleTemplate, summary: "All" })
  ],
})
const innerBoxShadow = new MetaProperty({
  name: "Inset Box Shadows",
  docs: [
    "There are infinite possibilities for inset box shadows.  These should provide a few basic options for common needs, however you will likely need to create your own for anything sophisticated. You can design your own scale <a class='blue-500' href='https://ghola.dev/shadow.html'>using Ghola</a>",
  ],
  scales: [
    new Scale({
      "none": "none",
      "1": "rgb(106, 106, 106) 1px 1px 4px -1px inset",
      "2": "rgb(106, 106, 106) 1px 1px 5.52px -1.043px inset",
      "3": "rgb(106, 106, 106) 1px 1px 8.195px -1.193px inset",
      "4": "rgb(106, 106, 106) 1px 1px 12.903px -1.485px inset",
      "5": "rgb(106, 106, 106) 1px 1px 21.190px -1.986px inset",
      "6": "rgb(106, 106, 106) 1px 1px 35.774px -2.802px inset",

    }),
  ],
  cssClassTemplates: [
    new CSSClassTemplate("inset-shadow", "box-shadow", { exampleTemplate: boxShadowExampleTemplate, summary: "All" })
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
    innerBoxShadow,
    opacity,
    cursors,
    zIndex,
  ],
  mediaQueries: [
    ...mediaQueries.onlyBreakpoints(),
    mediaQueries.moreContrast,
  ],
  docs: [
    "A grab bag of classes that adjust more decorative aspects of a page, such as box shadows, opacity, z-index, and cursors."
  ],
})

export default visuals
