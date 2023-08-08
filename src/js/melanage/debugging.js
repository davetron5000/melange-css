import { MetaProperty, MetaPropertyGrouping } from "../lib/MetaProperty.js"
import { CSSClassTemplate }                   from "../lib/CSSClass.js"
import { LiteralEnumeratedValue }             from "../lib/EnumeratedValues.js"
import { ExampleTemplate }                    from "../lib/ExampleTemplate.js"

const debugExampleTemplate = new ExampleTemplate({})
debugExampleTemplate._htmlForDocs = (fullSelector, content) => {
  return `<article class="${fullSelector}">
  <h1>Some Title</h2>
  <ul>
    <li class="ma3"><p class="measure">
      The spice must flow.
    </p></li>
    <li class="ba br2 b--purple><p class="measure">
      History is written on the sands of Arrakis.
    </p></li>
    <li class="pa3"><p class="measure">
      It is by <strong>will alone</strong>, I set my mind in motion.
    </p></li>
  </ul>
</article>`
}

const debugClassTemplate = new CSSClassTemplate("debug", "outline", {
  exampleTemplate: debugExampleTemplate,
})
debugClassTemplate._tweakCSSClass = (cssClass) => {
  cssClass.postSelectorSelector = "*"
  return cssClass
}
const debug = new MetaProperty({
  name: "Debug",
  cssClassTemplates: [
    debugClassTemplate,
  ],
  enumeratedValues: [
    LiteralEnumeratedValue.literalValues({
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
  enumeratedValues: [
    LiteralEnumeratedValue.literalValues({
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
  ]
})
export {
  debugging,
}
