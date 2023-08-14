import MetaProperty                  from "../../lib/MetaProperty.js"
import MetaPropertyGrouping          from "../../lib/MetaPropertyGrouping.js"
import CSSClassTemplate              from "../../lib/CSSClassTemplate.js"
import Example                       from "../../lib/Example.js"
import Scale                         from "../../lib/scales/Scale.js"
import Step                          from "../../lib/scales/Step.js"

import { borderWidthScale } from "../scales.js"
import mediaQueries         from "../MediaQueries.js"

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
  literalClasses: {
    "ba": {
      properties: {
        "border-style": "solid",
        "border-width": "1px", 
      },
      exampleTemplate: borderExampleTemplate, summary: "all",
    },
    "bl": {
      properties: {
        "border-left-style": "solid",
        "border-left-width": "1px", 
      },
      exampleTemplate: borderExampleTemplate, summary: "left",
    },
    "br": {
      properties: {
        "border-right-style": "solid",
        "border-right-width": "1px", 
      },
      exampleTemplate: borderExampleTemplate, summary: "right",
    },
    "bt": {
      properties: {
        "border-top-style": "solid",
        "border-top-width": "1px", 
      },
      exampleTemplate: borderExampleTemplate, summary: "top",
    },
    "bb": {
      properties: {
        "border-bottom-style": "solid",
        "border-bottom-width": "1px", 
      },
      exampleTemplate: borderExampleTemplate, summary: "bottom",
    },
    "bn": {
      properties: {
        "border-style": "none",
        "border-width": "0", 
      },
      exampleTemplate: borderExampleTemplate, summary: "none",
    },
  }
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
    new CSSClassTemplate("b-", "border-style", { exampleTemplate: borderExampleTemplate, summary: "all" }),
    new CSSClassTemplate("bl-", "border-left-style", { exampleTemplate: borderExampleTemplate, summary: "left" }),
    new CSSClassTemplate("br-", "border-right-style", { exampleTemplate: borderExampleTemplate, summary: "right" }),
    new CSSClassTemplate("bt-", "border-top-style", { exampleTemplate: borderExampleTemplate, summary: "top" }),
    new CSSClassTemplate("bb-", "border-bottom-style", { exampleTemplate: borderExampleTemplate, summary: "bottom" }),
  ]
})

const borderWidthMetaProperty = new MetaProperty({
  name: "Border Widths",
  scales: [ borderWidthScale ],
  cssClassTemplates: [
    new CSSClassTemplate("bw", "border-width", { exampleTemplate: borderWidthExampleTemplate, summary: "all" }),
    new CSSClassTemplate("blw", "border-left-width", { exampleTemplate: borderWidthExampleTemplate, summary: "left" }),
    new CSSClassTemplate("brw", "border-right-width", { exampleTemplate: borderWidthExampleTemplate, summary: "right" }),
    new CSSClassTemplate("btw", "border-top-width", { exampleTemplate: borderWidthExampleTemplate, summary: "top" }),
    new CSSClassTemplate("bbw", "border-bottom-width", { exampleTemplate: borderWidthExampleTemplate, summary: "bottom" }),
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
    new CSSClassTemplate("br", "border-radius", { exampleTemplate: borderWidthExampleTemplate, summary: "all" }),
    new CSSClassTemplate("br-bottom", "border-bottom-left-radius", "border-bottom-right-radius", { exampleTemplate: borderWidthExampleTemplate, summary: "bottom" }),
    new CSSClassTemplate("br-top", "border-top-left-radius", "border-top-right-radius", { exampleTemplate: borderWidthExampleTemplate, summary: "top" }),
    new CSSClassTemplate("br-left", "border-bottom-left-radius", "border-top-left-radius", { exampleTemplate: borderWidthExampleTemplate, summary: "left" }),
    new CSSClassTemplate("br-right", "border-bottom-right-radius", "border-top-right-radius", { exampleTemplate: borderWidthExampleTemplate, summary: "right" }),
    new CSSClassTemplate("br-tr", "border-top-right-radius", { exampleTemplate: borderWidthExampleTemplate, summary: "top right" }),
    new CSSClassTemplate("br-br", "border-bottom-right-radius", { exampleTemplate: borderWidthExampleTemplate, summary: "bottom right" }),
    new CSSClassTemplate("br-tl", "border-top-left-radius", { exampleTemplate: borderWidthExampleTemplate, summary: "top left" }),
    new CSSClassTemplate("br-bl", "border-bottom-left-radius", { exampleTemplate: borderWidthExampleTemplate, summary: "bottom left" }),
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
  mediaQueries: mediaQueries.onlyBreakpoints(),
  docs: [
    "Like the spacing group, borders can benefit from a stepped scale of sizes.  These sizes don't relate to the spacings, but are internally consistent. Border widths and radiuses should produce harmonic designs for most of your needs.",
  ],
})

export default borders
