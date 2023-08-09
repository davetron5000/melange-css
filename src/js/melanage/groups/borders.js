import MetaProperty                  from "../../lib/MetaProperty.js"
import MetaPropertyGrouping          from "../../lib/MetaPropertyGrouping.js"
import CSSClassTemplate              from "../../lib/CSSClassTemplate.js"
import ScaleAgnosticCSSClassTemplate from "../../lib/ScaleAgnosticCSSClassTemplate.js"
import Example                       from "../../lib/Example.js"
import Scale                         from "../../lib/scales/Scale.js"
import Step                          from "../../lib/scales/Step.js"

import { borderWidthScale } from "../scales.js"

const borderExampleTemplate = (selector) => {
  return new Example({
    markupForRendering: `<div class="${selector}" style="white-space: nowrap; padding: 2rem; display: flex; align-items: center; justify-content: center; text-align: center; background-color: #f0f0f0;">.${selector}</div>`
  })
}

const borderWidthExampleTemplate = (selector) => {
  return new Example({
    markupForRendering: `<div class="${selector}" style="border-style: solid; white-space: nowrap; padding: 2rem; display: flex; align-items: center; justify-content: center; text-align: center; background-color: #f0f0f0;">.${selector}</div>`
  })
}

const bordersMetaProperty = new MetaProperty({
  name: "Borders",
  scales: [ Scale.forLiteralValues({ "": "" }) ],
  cssClassTemplates: [
    new ScaleAgnosticCSSClassTemplate(
      "ba",
      {
        "border-style": "solid",
        "border-width": "1px", 
      },
      { exampleTemplate: borderExampleTemplate }
    ),
    new ScaleAgnosticCSSClassTemplate(
      "bl",
      {
        "border-left-style": "solid",
        "border-left-width": "1px", 
      },
      { exampleTemplate: borderExampleTemplate }
    ),
    new ScaleAgnosticCSSClassTemplate(
      "br",
      {
        "border-right-style": "solid",
        "border-right-width": "1px", 
      },
      { exampleTemplate: borderExampleTemplate }
    ),
    new ScaleAgnosticCSSClassTemplate(
      "bt",
      {
        "border-top-style": "solid",
        "border-top-width": "1px", 
      },
      { exampleTemplate: borderExampleTemplate }
    ),
    new ScaleAgnosticCSSClassTemplate(
      "bb",
      {
        "border-bottom-style": "solid",
        "border-bottom-width": "1px", 
      },
      { exampleTemplate: borderExampleTemplate }
    ),
    new ScaleAgnosticCSSClassTemplate(
      "bn",
      {
        "border-style": "none",
        "border-width": "0", 
      },
      { exampleTemplate: borderExampleTemplate }
    ),
  ]
})

const borderStyleMetaProperty = new MetaProperty({
  name: "Border Styles",
  scales: [
    Scale.forLiteralValues({
      "dotted": "dotted",
      "dashed": "dashed",
      "solid": "solid",
      "none": "none",
    }),
  ],
  cssClassTemplates: [
    new CSSClassTemplate("b-", "border-style", { exampleTemplate: borderExampleTemplate }),
    new CSSClassTemplate("bl-", "border-left-style", { exampleTemplate: borderExampleTemplate }),
    new CSSClassTemplate("br-", "border-right-style", { exampleTemplate: borderExampleTemplate }),
    new CSSClassTemplate("bt-", "border-top-style", { exampleTemplate: borderExampleTemplate }),
    new CSSClassTemplate("bb-", "border-bottom-style", { exampleTemplate: borderExampleTemplate }),
  ]
})

const borderWidthMetaProperty = new MetaProperty({
  name: "Border Widths",
  scales: [ borderWidthScale ],
  cssClassTemplates: [
    new CSSClassTemplate("bw", "border-width", { exampleTemplate: borderWidthExampleTemplate }),
    new CSSClassTemplate("blw", "border-left-width", { exampleTemplate: borderWidthExampleTemplate }),
    new CSSClassTemplate("brw", "border-right-width", { exampleTemplate: borderWidthExampleTemplate }),
    new CSSClassTemplate("btw", "border-top-width", { exampleTemplate: borderWidthExampleTemplate }),
    new CSSClassTemplate("bbw", "border-bottom-width", { exampleTemplate: borderWidthExampleTemplate }),
  ]
})

const borderRadiusAdditions = new Scale({
  "100": "100%",
  "pill": "999px",
})
const borderRadiusMetaProperty = new MetaProperty({
  name: "Border Radius",
  scales: [ borderWidthScale, borderRadiusAdditions ],
  cssClassTemplates: [
    new CSSClassTemplate("br", "border-radius", { exampleTemplate: borderWidthExampleTemplate }),
    new CSSClassTemplate("br-bottom", "border-bottom-left-radius", "border-bottom-right-radius", { exampleTemplate: borderWidthExampleTemplate }),
    new CSSClassTemplate("br-top", "border-top-left-radius", "border-top-right-radius", { exampleTemplate: borderWidthExampleTemplate }),
    new CSSClassTemplate("br-left", "border-bottom-left-radius", "border-top-left-radius", { exampleTemplate: borderWidthExampleTemplate }),
    new CSSClassTemplate("br-right", "border-bottom-right-radius", "border-top-right-radius", { exampleTemplate: borderWidthExampleTemplate }),
  ]
})


const borders = new MetaPropertyGrouping({
  name: "Borders",
  metaProperties: [  
    bordersMetaProperty,
    borderRadiusMetaProperty,
    borderStyleMetaProperty,
    borderWidthMetaProperty,
  ],
})

export default borders
