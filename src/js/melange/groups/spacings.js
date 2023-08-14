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
    markupForRendering: `<div class="dib ba bg-gray-light gray-darkest ${selector}"><div class="bg-white ws-nowrap">.${selector}</div></div>`
  })
}
const marginExampleTemplate = (selector) => {
  return new Example({
    markupForRendering: `<div class="dib ba b--dashed"><div class="dib ba bg-gray-light gray-darkest ws-nowrap ${selector}">.${selector}</div></div>`
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

const floatExampleTemplate = (selector) => {
  const html = `<div>
  <div class="${selector}">.${selector}</div>
  <div>The spice must flow! Without it, space travel is impossible.</div>
</div>`
  const innerMarkup =  `<div style="border: dashed thin black; "><div style="padding-left: 1rem; padding-right: 1rem; border: solid thin black" class="${selector}">.${selector}</div><div style="padding-left: 1rem; padding-right: 1rem; background-color: #ddd;" >The spice must flow! Without it, space travel is impossible.</div></div>`
  return new Example({
    htmlForDocs: html,
    markupForRendering: innerMarkup,
    blah: `<div style=\"width: 8rem; display: inline-block; border: dashed thin black\">
  <div style=\"border: solid thin black; display: inline; padding-left: 1rem; padding-right: 1rem; background-color: #ddd; color: #222;\" class=\"${selector}\">.${selector}</div>
    </div>`
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
  ],
  mediaQueries: mediaQueries.onlyBreakpoints(),
  docs: [
    "Spacings provides a stepped scale for margins and padding, which form the basis of any grid-based design and power the underlyingn design system.  Instead of allowing for inifinite, pixel-perfect spacings, the scale provided by this module gives you the ability to adjust elements along a few useful values that should cover 95% of your needs.",
  ],
})

export default spacings
