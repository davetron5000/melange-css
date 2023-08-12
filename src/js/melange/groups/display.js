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

const displays = new MetaProperty({
  name: "Display",
  literalClasses: {
    db: { properties: { "display": "block" }, exampleTemplate: displayExampleTemplate, summary: "Block" },
    di: { properties: { "display": "inline" }, exampleTemplate: displayExampleTemplate, summary: "Inline" },
    dib: { properties: { "display": "inline-block" }, exampleTemplate: displayExampleTemplate, summary: "Inline Block" },
    dn: { properties: { "display": "none" }, exampleTemplate: displayExampleTemplate, summary: "None" },
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
  },
})

const display = new MetaPropertyGrouping({name: "Display",
  metaProperties: [
    displays,
    tableDisplay,
  ],
  mediaQueries: mediaQueries.onlyBreakpoints(),
})
export default display
