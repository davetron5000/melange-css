import MetaProperty         from "../../lib/MetaProperty.js"
import MetaPropertyGrouping from "../../lib/MetaPropertyGrouping.js"
import CSSClassTemplate     from "../../lib/CSSClassTemplate.js"
import Example              from "../../lib/Example.js"
import Scale                from "../../lib/scales/Scale.js"
import Step                 from "../../lib/scales/Step.js"
import mediaQueries         from "../MediaQueries.js"

const listExampleTemplate = (selector) => {
  const html = `<p class="lh-copy">
  Current Dunes:
</p>
<ul class="${selector}">
  <li>Lynch Dune</li>
  <li>Sci-Fi Dune</li>
  <li>DUNC</li>
</ul>
`
  return new Example({
    htmlForDocs: html,
    markupForRendering: `<div class="ba bs-dashed bc-gray pa-3">${html}</div>`
  })
}
const listStyleType = new MetaProperty({
  name: "List Style Type",
  docs: [
    "There are a large number of possible list style types, so these values are arguably English-centric."
  ],
  literalClasses: {
    "lst-none":        { properties: { "list-style-type": "none" }, exampleTemplate: listExampleTemplate, summary: "None" },
    "lst-disc":        { properties: { "list-style-type": "disc" }, exampleTemplate: listExampleTemplate, summary: "Disc" },
    "lst-circle":      { properties: { "list-style-type": "circle" }, exampleTemplate: listExampleTemplate, summary: "Circle" },
    "lst-square":      { properties: { "list-style-type": "square" }, exampleTemplate: listExampleTemplate, summary: "Square" },
    "lst-decimal":     { properties: { "list-style-type": "decimal" }, exampleTemplate: listExampleTemplate, summary: "Decimal" },
    "lst-lower-roman": { properties: { "list-style-type": "lower-roman" }, exampleTemplate: listExampleTemplate, summary: "Lower Roman" },
    "lst-upper-roman": { properties: { "list-style-type": "upper-roman" }, exampleTemplate: listExampleTemplate, summary: "Upper Roman" },
  }
})

const listStylePosition = new MetaProperty({
  name: "List Style Position",
  literalClasses: {
    "lsp-inside":  { properties: { "list-style-position": "inside" }, exampleTemplate: listExampleTemplate, summary: "Inside" },
    "lsp-outside": { properties: { "list-style-position": "outside" }, exampleTemplate: listExampleTemplate, summary: "Outside" },
  }
})


const lists = new MetaPropertyGrouping({
  name: "Lists",
  metaProperties: [  
    listStyleType,
    listStylePosition,
  ],
  docs: [
    "Lists are a commonly-used semantic element that are thankfully short on special properties and configuration.",
  ],
  mediaQueries: mediaQueries.onlyBreakpoints(),
})

export default lists
