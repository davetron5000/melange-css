import MetaProperty                  from "../../lib/MetaProperty.js"
import MetaPropertyGrouping          from "../../lib/MetaPropertyGrouping.js"
import CSSClassTemplate              from "../../lib/CSSClassTemplate.js"
import Example                       from "../../lib/Example.js"
import ExampleTemplate               from "../../lib/ExampleTemplate.js"
import Scale                         from "../../lib/scales/Scale.js"
import Step                          from "../../lib/scales/Step.js"

import { percentageScale } from "../scales.js"
import mediaQueries        from "../MediaQueries.js"

const backgroundPositionExampleTemplate = (selector) => {
  return new Example({
    htmlForDocs: `<div class="${selector}></div>`,
    markupForRendering: `<div class="${selector} w-6 h-6 ba with-background-image"
     style="background-repeat: no-repeat;">
  </div>`
  })
}

const backgroundPosition = new MetaProperty({
  name: "Background Position",
  docs: [
    "Background position can also be finely tuned with percentages, but these values should suffice for common needs.",
  ],
  literalClasses: {

    "bgp-t":  { properties: { "background-position": "top" }, exampleTemplate: backgroundPositionExampleTemplate, summary: "Top" },
    "bgp-b":  { properties: { "background-position": "bottom" }, exampleTemplate: backgroundPositionExampleTemplate, summary: "Bottom" },
    "bgp-l":  { properties: { "background-position": "left" }, exampleTemplate: backgroundPositionExampleTemplate, summary: "Left" },
    "bgp-r":  { properties: { "background-position": "right" }, exampleTemplate: backgroundPositionExampleTemplate, summary: "Right" },
    "bgp-c":  { properties: { "background-position": "center" }, exampleTemplate: backgroundPositionExampleTemplate, summary: "Center" },
    "bgp-tr": { properties: { "background-position": "top right" }, exampleTemplate: backgroundPositionExampleTemplate, summary: "Top Right" },
    "bgp-tl": { properties: { "background-position": "top left" }, exampleTemplate: backgroundPositionExampleTemplate, summary: "Top Left" },
    "bgp-br": { properties: { "background-position": "bottom right" }, exampleTemplate: backgroundPositionExampleTemplate, summary: "Bottom Right" },
    "bgp-bl": { properties: { "background-position": "bottom left" }, exampleTemplate: backgroundPositionExampleTemplate, summary: "Bottom Left" },
    "bgp-cr": { properties: { "background-position": "center right" }, exampleTemplate: backgroundPositionExampleTemplate, summary: "Top Right" },
    "bgp-cl": { properties: { "background-position": "center left" }, exampleTemplate: backgroundPositionExampleTemplate, summary: "Top Left" },
    "bgp-ct": { properties: { "background-position": "center top" }, exampleTemplate: backgroundPositionExampleTemplate, summary: "Bottom Right" },
    "bgp-cb": { properties: { "background-position": "center bottom" }, exampleTemplate: backgroundPositionExampleTemplate, summary: "Bottom Left" },
  }
})

const backgroundRepeatExampleTemplate = (selector) => {
  return new Example({
    htmlForDocs: `<div class="${selector}></div>`,
    markupForRendering: `<div class="${selector} ba with-background-image"
     style="width: 10rem; height: 10rem;">
  </div>`
  })
}
const backgroundRepeat = new MetaProperty({
  name: "Background Repeat",
  literalClasses: {

    "bgr":  { properties: { "background-repeat": "repeat" }, exampleTemplate: backgroundRepeatExampleTemplate, summary: "X and Y" },
    "bgr-x":  { properties: { "background-repeat": "repeat-x" }, exampleTemplate: backgroundRepeatExampleTemplate, summary: "X" },
    "bgr-y":  { properties: { "background-repeat": "repeat-y" }, exampleTemplate: backgroundRepeatExampleTemplate, summary: "Y" },
    "bgr-s":  { properties: { "background-repeat": "space" }, exampleTemplate: backgroundRepeatExampleTemplate, summary: "Space" },
    "bgr-r":  { properties: { "background-repeat": "round" }, exampleTemplate: backgroundRepeatExampleTemplate, summary: "Round" },
    "bg-none":  { properties: { "background-repeat": "no-repeat" }, exampleTemplate: backgroundRepeatExampleTemplate, summary: "None" },
  }
})


const background = new MetaPropertyGrouping({
  name: "Background",
  metaProperties: [  
    backgroundPosition,
    backgroundRepeat,
  ],
  mediaQueries: mediaQueries.onlyBreakpoints(),
  docs: [
    "Background positions and repeats are provided.  Background colors are part of the Colors group.  Other background properties are highly use-case specific or esoteric, so are not provided by default",
  ]
})

export default background
