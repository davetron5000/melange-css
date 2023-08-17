import MetaProperty         from "../../lib/MetaProperty.js"
import MetaPropertyGrouping from "../../lib/MetaPropertyGrouping.js"
import CSSClassTemplate     from "../../lib/CSSClassTemplate.js"
import Scale                from "../../lib/scales/Scale.js"
import Example              from "../../lib/Example.js"
import mediaQueries         from "../MediaQueries.js"

const displayExampleTemplate = (selector) => {
  const oneDiv = `<div class="bg-gray-lightest ma-2 ws-nowrap pa-1 w-5 h-5 ${selector}">${selector}</div>`
  const markupForRendering = [
    oneDiv,
    oneDiv,
    oneDiv,
  ].join("\n")
  return new Example({
    htmlForDocs: `<div class="w-5 h-5 ${selector}">\n  .${selector}\n</div>`,
    markupForRendering: markupForRendering
  })
}

const clearfixExampleTemplate = (selector) => {
  return `<div>
  <div class="dfr ba b--dashed pa-1 mb-2">
  With <code>display: flow-root</code>, the black box is safe.
    <div class="dib w-5 h-5 bg-black fl">&nbsp;</div>
  </div>
  <div class="ba b--dashed pa-1">
  Without <code>display: flow-root</code>, the black box contains only pain.
    <div class="dib w-5 h-5 bg-black fl">&nbsp;</div>
  </div>
</div>`
}

const displays = new MetaProperty({
  name: "Display",
  literalClasses: {
    db: { properties: { "display": "block" }, exampleTemplate: displayExampleTemplate, summary: "Block" },
    di: { properties: { "display": "inline" }, exampleTemplate: displayExampleTemplate, summary: "Inline" },
    dib: { properties: { "display": "inline-block" }, exampleTemplate: displayExampleTemplate, summary: "Inline Block" },
    dn: { properties: { "display": "none" }, exampleTemplate: displayExampleTemplate, summary: "None" },
    dfr: { properties: { "display": "flow-root" }, exampleTemplate: clearfixExampleTemplate, summary: "Flow Root / Clearfix" },
  },
})

const tableDisplay = new MetaProperty({
  name: "Table Display",
  literalClasses: {
    "dt":             { properties: { "display": "table" }              , summary: "Table" },
    "dtc":            { properties: { "display": "table-cell" }         , summary: "Cell" },
    "dtrow":          { properties: { "display": "table-row" }          , summary: "Row" },
    "dtrow-group":    { properties: { "display": "table-row-group" }    , summary: "Row Group" },
    "dtcolumn":       { properties: { "display": "table-column" }       , summary: "Column" },
    "dtcolumn-group": { properties: { "display": "table-column-group" } , summary: "Column Group" },
    "collapse":       { properties: { "border-collapse": "collapse", "border-spacing": 0 }  , summary: "Border Collapse" },
  },
})

const display = new MetaPropertyGrouping({name: "Display",
  metaProperties: [
    displays,
    tableDisplay,
  ],
  mediaQueries: mediaQueries.onlyBreakpoints(),
  docs: [
    "Handles basic dispaly properties other than Flexbox.  Flexbox is part of the Flexbox grouping.",
  ],

})
export default display
