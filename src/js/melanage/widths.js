import { MetaProperty }    from "../lib/MetaProperty.js"
import { LiteralScale } from "../lib/Scale.js"
import { CSSClassTemplate }                      from "../lib/CSSClass.js"
import { spacingFixedScale } from "./scales.js"
import {
  percentageScale,
  autoScale,
  thirdsScale } from "./scales.js"

const measureScale = new LiteralScale({
  "": "30rem",
  "-wide": "40rem",
  "-narrow": "25rem",
})

const measure = new MetaProperty({
  name: "Measure",
  docs: "Measure allows styling maximum widths when text is involved, to ensure the text wraps properly for good reading",
  enumeratedValues: [ measureScale ],
  cssClassTemplates: [
    new CSSClassTemplate("measure", "max-width", {
      exampleTemplate: {
        html: (selector, pseudoSelector) => { return `<p class=\"${selector}\">The studio was filled with the rich odour of roses, and when the light summer wind stirred amidst the trees of the garden, there came through the open door the heavy scent of the lilac, or the more delicate perfume of the pink-flowering thorn.</p>` },
        markup: (selector, pseudoSelector, html) => { return html }
      }
    }),
  ]
})

const widths = new MetaProperty({
  name: "width",
  enumeratedValues: [
    spacingFixedScale,
    percentageScale,
    autoScale,
    thirdsScale,
  ],
  cssClassTemplates: [
    new CSSClassTemplate("w", "width", {
      exampleTemplate: {
        html: (selector, pseudoSelector) => { return `<div class=\"${selector}\">.${selector}</div>` },
        markup: (selector, pseudoSelector, html) => {
          return html.replace("<div ","<div style=\"padding: 1rem; border: solid thin black; background-color: #ddd; color: #222;\" ")
        }
      }
    }),
    new CSSClassTemplate("mw", "max-width", {
      exampleTemplate: {
        html: (selector, pseudoSelector) => { 
          let text = "In the centre of the room, clamped to an upright easel, stood the full-length portrait of a young man of extraordinary personal beauty,"
          if (["mw-50","mw-60","mw-70","mw-80","mw-90","mw-100","mw-auto","mw-third","mw-two-thirds"].indexOf(selector) != -1) {
            text = text + " and in front of it, some little distance away, was sitting the artist himself, Basil Hallward, whose sudden disappearance some years ago caused, at the time, such public excitement and gave rise to so many strange conjectures."
          }
          return `<p class=\"${selector}\">${text}</p>` },
        markup: (selector, pseudoSelector, html) => {
          return html.replace("<p ","<p style=\"font-size: 0.75rem;\" ")
        }
      }
    }),
  ]
})

export {
  widths,
  measure,
}
