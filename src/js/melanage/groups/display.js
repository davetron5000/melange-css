import MetaProperty                  from "../../lib/MetaProperty.js"
import MetaPropertyGrouping          from "../../lib/MetaPropertyGrouping.js"
import CSSClassTemplate              from "../../lib/CSSClassTemplate.js"
import ScaleAgnosticCSSClassTemplate from "../../lib/ScaleAgnosticCSSClassTemplate.js"
import Scale                         from "../../lib/scales/Scale.js"
import Example                       from "../../lib/Example.js"

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
  cssClassTemplates: [
    new ScaleAgnosticCSSClassTemplate(
      "db", { "display": "block", },
      { exampleTemplate: displayExampleTemplate, summary: "Block" }
    ),
    new ScaleAgnosticCSSClassTemplate(
      "di", { "display": "inline", },
      { exampleTemplate: displayExampleTemplate, summary: "Inline" }
    ),
    new ScaleAgnosticCSSClassTemplate(
      "dib", { "display": "inline-block", },
      { exampleTemplate: displayExampleTemplate, summary: "Inline Block" }
    ),
    new ScaleAgnosticCSSClassTemplate(
      "dn", { "display": "none", },
      { exampleTemplate: displayExampleTemplate, summary: "None" }
    ),
  ],
  scales: [ Scale.forLiteralValues({ "": "" }) ],
})

const tableDisplay = new MetaProperty({
  name: "Table Display",
  cssClassTemplates: [
    new ScaleAgnosticCSSClassTemplate( "dt",             { "display": "table", },      { summary: "Table" }),
    new ScaleAgnosticCSSClassTemplate( "dtc",            { "display": "table-cell", }, { summary: "Cell" }),
    new ScaleAgnosticCSSClassTemplate( "dtrow",          { "display": "table-row", },  { summary: "Row" }),
    new ScaleAgnosticCSSClassTemplate( "dtrow-group",    { "display": "table-row-group", },  { summary: "Row Group" }),
    new ScaleAgnosticCSSClassTemplate( "dtcolumn",       { "display": "table-column", },  { summary: "Column" }),
    new ScaleAgnosticCSSClassTemplate( "dtcolumn-group", { "display": "table-column-group", },  { summary: "Column Group" }),
  ],
  scales: [ Scale.forLiteralValues({ "": "" }) ],
})

const display = new MetaPropertyGrouping({name: "Display",
  metaProperties: [
    displays,
    tableDisplay,
  ]
})
export default display
