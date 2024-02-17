import MetaProperty         from "../../lib/MetaProperty.js"
import MetaPropertyGrouping from "../../lib/MetaPropertyGrouping.js"
import CSSClassTemplate     from "../../lib/CSSClassTemplate.js"
import Example              from "../../lib/Example.js"
import Scale                from "../../lib/scales/Scale.js"

import {
  spacingScale
} from "../scales.js"
import mediaQueries from "../MediaQueries.js"

const paddingExampleTemplate = (selector) => {
  return new Example({
    markupForRendering: `<div class="dib ba bg-gray-600 gray-100 ${selector}"><div class="bg-white ws-nowrap">.${selector}</div></div>`
  })
}
const marginExampleTemplate = (selector) => {
  return new Example({
    markupForRendering: `<div class="dib ba bs-dashed"><div class="dib ba bg-gray-600 gray-100 ws-nowrap ${selector}">.${selector}</div></div>`
  })
}

const gapExampleTemplate = (selector) => {
  return new Example({
    markupForRendering: `<div class="ba bc-black bs-dashed flex flex-column ${selector}">
      <div class="ba bc-black flex flex-row ${selector}">
        <div class="pa-2 f-1 bg-gray-700 gray-100 ba bc-red">Top Left</div>
        <div class="pa-2 f-1 bg-gray-700 gray-100 ba bc-green">Top Middle</div>
        <div class="pa-2 f-1 bg-gray-700 gray-100 ba bc-blue">Top Right</div>
      </div>
      <div class="ba bc-black flex flex-row ${selector}">
        <div class="pa-2 f-1 bg-gray-700 gray-100 ba bc-red">Middle Left</div>
        <div class="pa-2 f-1 bg-gray-700 gray-100 ba bc-green">Middle Middle</div>
        <div class="pa-2 f-1 bg-gray-700 gray-100 ba bc-blue">Middle Right</div>
      </div>
      <div class="ba bc-black flex flex-row ${selector}">
        <div class="pa-2 f-1 bg-gray-700 gray-100 ba bc-red">Bottom Left</div>
        <div class="pa-2 f-1 bg-gray-700 gray-100 ba bc-green">Bottom Middle</div>
        <div class="pa-2 f-1 bg-gray-700 gray-100 ba bc-blue">Bottom Right</div>
      </div>
    </div>`
  })
}

const paddingMetaProperty = new MetaProperty({
  name: "Padding",
  docs: [
    "Padding is space internal to the box and can be controlled in all four directions, horizontally, vertically, or each individually",
  ],
  scales: [
    spacingScale
  ],
  cssClassTemplates: [
    new CSSClassTemplate("pa", "padding", { exampleTemplate: paddingExampleTemplate, summary: "all" }),
    new CSSClassTemplate("pl", "padding-left", { exampleTemplate: paddingExampleTemplate, summary: "left" }),
    new CSSClassTemplate("pr", "padding-right", { exampleTemplate: paddingExampleTemplate, summary: "right" }),
    new CSSClassTemplate("pt", "padding-top", { exampleTemplate: paddingExampleTemplate, summary: "top" }),
    new CSSClassTemplate("pb", "padding-bottom", { exampleTemplate: paddingExampleTemplate, summary: "bottom" }),
    new CSSClassTemplate("ph", "padding-left", "padding-right", { exampleTemplate: paddingExampleTemplate, summary: "horizontal" }),
    new CSSClassTemplate("pv", "padding-top", "padding-bottom", { exampleTemplate: paddingExampleTemplate, summary: "vertical" }),
  ]
})
const marginMetaProperty = new MetaProperty({
  name: "Margin",
  docs: [
    "Margin is space outside the box and can be controlled in all four directions, horizontally, vertically, or each individually",
  ],
  scales: [
    spacingScale,
    Scale.forLiteralValues({ "auto": "auto" }),
  ],
  cssClassTemplates: [
    new CSSClassTemplate("ma", "margin", { exampleTemplate: marginExampleTemplate, summary: "all" }),
    new CSSClassTemplate("ml", "margin-left", { exampleTemplate: marginExampleTemplate, summary: "left" }),
    new CSSClassTemplate("mr", "margin-right", { exampleTemplate: marginExampleTemplate, summary: "right" }),
    new CSSClassTemplate("mt", "margin-top", { exampleTemplate: marginExampleTemplate, summary: "top" }),
    new CSSClassTemplate("mb", "margin-bottom", { exampleTemplate: marginExampleTemplate, summary: "bottom" }),
    new CSSClassTemplate("mh", "margin-left", "margin-right", { exampleTemplate: marginExampleTemplate, summary: "horizontal" }),
    new CSSClassTemplate("mv", "margin-top", "margin-bottom", { exampleTemplate: marginExampleTemplate, summary: "vertical" }),
  ]
})
const gapMetaProperty = new MetaProperty({
  name: "Gap",
  docs: [
    "Gap is space between grids, flexboxes, and columns."
  ],
  scales: [
    spacingScale,
  ],
  cssClassTemplates: [
    new CSSClassTemplate("gap", "gap", { exampleTemplate: gapExampleTemplate, summary: "both" }),
    new CSSClassTemplate("row-gap", "row-gap", { exampleTemplate: gapExampleTemplate, summary: "row" }),
    new CSSClassTemplate("col-gap", "column-gap", { exampleTemplate: gapExampleTemplate, summary: "column" }),
  ]
})

const floatExampleTemplate = (selector) => {
  const html = `<div>
  <div class="${selector}">.${selector}</div>
  <div>The spice must flow! Without it, space travel is impossible.</div>
</div>`
  const innerMarkup =  `<div class="ba bs-dashed"><div class="ph-2 ba bs-solid ${selector}">.${selector}</div><div class="ph-2 bg-gray-800" >The spice must flow! Without it, space travel is impossible.</div></div>`
  return new Example({
    htmlForDocs: html,
    markupForRendering: innerMarkup,
  })
}

const floats = new MetaProperty({
  name: "Floats",
  scales: [
    Scale.forLiteralValues({
      "l": "left",
      "r": "right",
      "n": "none",
    })
  ],
  docs: [
    "Note that modern browsers no longer require a cleafix hack. You can use <code class=\"ws-nowrap\">display: flow-root</code> to clear floats via the <code>dfr</code> class.",
  ],
  cssClassTemplates: [
    new CSSClassTemplate("f", "float", { exampleTemplate: floatExampleTemplate })
  ]
})

const spacings = new MetaPropertyGrouping({
  name: "Spacings",
  metaProperties: [  
    floats,
    paddingMetaProperty,
    marginMetaProperty,
    gapMetaProperty,
  ],
  mediaQueries: mediaQueries.onlyBreakpoints(),
  docs: [
    "Spacings provides a stepped scale for margins and padding, which form the basis of any grid-based design and power the underlyingn design system.  Instead of allowing for inifinite, pixel-perfect spacings, the scale provided by this module gives you the ability to adjust elements along a few useful values that should cover 95% of your needs.",
  ],
})

export default spacings
