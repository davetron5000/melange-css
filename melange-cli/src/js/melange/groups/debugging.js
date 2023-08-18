import MetaProperty         from "../../lib/MetaProperty.js"
import MetaPropertyGrouping from "../../lib/MetaPropertyGrouping.js"
import CSSClassTemplate     from "../../lib/CSSClassTemplate.js"
import Scale                from "../../lib/scales/Scale.js"
import mediaQueries         from "../MediaQueries.js"

const debugExampleTemplate = (fullSelector) => {
  return `<article class="${fullSelector}">
  <h1>Some Title</h2>
  <ul>
    <li class="ma-3"><p class="measure">
      The spice must flow.
    </p></li>
    <li class="b-a br-2 bc-purple><p class="measure">
      History is written on the sands of Arrakis.
    </p></li>
    <li class="pa-3"><p class="measure">
      It is by <strong>will alone</strong>, I set my mind in motion.
    </p></li>
  </ul>
</article>`
}

const debugClassTemplate = new CSSClassTemplate("debug", "outline", {
  exampleTemplate: debugExampleTemplate,
})
debugClassTemplate._hackCSSClass = (cssClass) => {
  cssClass.postSelectorSelector = "*"
  return cssClass
}
const debug = new MetaProperty({
  name: "Debug",
  cssClassTemplates: [
    debugClassTemplate,
  ],
  scales: [
    Scale.forLiteralValues({
      "": "1px solid gold",
      "red": "1px solid red",
      "green": "1px solid green",
      "blue": "1px solid blue",
    })
  ]
})
const debugGrid = new MetaProperty({
  name: "Debug with Grid",
  cssClassTemplates: [
    new CSSClassTemplate("debug-grid", "background", {
      exampleTemplate: debugExampleTemplate,
    })
  ],
  scales: [
    Scale.forLiteralValues({
      "": "transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAFElEQVR4AWPAC97/9x0eCsAEPgwAVLshdpENIxcAAAAASUVORK5CYII=) repeat top left",
      "16": "transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVR4AWOgCLz/b0epAa6UGuBOqQHOQHLUgFEDnAbcBZ4UGwDOkiCnkIhdgNgNxAYAiYlD+8sEuo8AAAAASUVORK5CYII=) repeat top left",
    })
  ]
})

const debugging = new MetaPropertyGrouping({name: "Debuging",
  docs: [
    "Often, it's easier to have boxes drawn around elements to see their size instead of going into the dev tools.  The debug classes using the outline property to show you where child elements are, but without changing any of the layout",
  ],
  metaProperties: [
    debug,
    debugGrid,
  ],
  mediaQueries: [ mediaQueries.default ],
})
export default debugging
