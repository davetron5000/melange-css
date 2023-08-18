import MetaProperty         from "../../lib/MetaProperty.js"
import MetaPropertyGrouping from "../../lib/MetaPropertyGrouping.js"
import CSSClassTemplate     from "../../lib/CSSClassTemplate.js"
import Example              from "../../lib/Example.js"
import Scale                from "../../lib/scales/Scale.js"
import mediaQueries         from "../MediaQueries.js"

const overflowExampleTemplate = (selector) => {
  return new Example({
    htmlForDocs: `<div class="${selector}">
    While the spice must flow, if it
    were to overflow, it would be
    lost to the sands of Arrakis.
    This cannot be allowed.
</div>`,
    markupForRendering: `<div class="pa4"><div class="${selector} w-6 h-5 ba bc-gray-dark bg-gray-lightest black">
    While the spice must flow, if it were to overflow, <span class="ws-nowrap">it would be
    lost to the sands of Arrakis. This</span> cannot be allowed.
</div></div>`,
  })
}
const overflowMetaProperty = new MetaProperty({
  name: "Overflow",
  scales: [
    Scale.forLiteralValues({
      "visible": "visible",
      "scroll": "scroll",
      "hidden": "hidden",
      "clip": "clip",
      "auto": "auto",
    }),
  ],
  cssClassTemplates: [
    new CSSClassTemplate("overflow", "overflow", { exampleTemplate: overflowExampleTemplate, summary: "Both Directions" }),
    new CSSClassTemplate("overflow-x", "overflow-x", { exampleTemplate: overflowExampleTemplate, summary: "Horizontally" }),
    new CSSClassTemplate("overflow-y", "overflow-y", { exampleTemplate: overflowExampleTemplate, summary: "Vertically" }),
  ]
})

const truncateExampleTemplate = (selector) => {
  return new Example({
    htmlForDocs: `<div class="${selector}">
    The spice must flow!
</div>`,
    markupForRendering: `<div class="pa4"><div class="${selector} overflow-hidden ws-nowrap w-6 ba bc-gray-dark bg-gray-lightest black">
    The spice must flow!
</div></div>`,
  })
}

const truncate = new MetaProperty({
  name: "Truncate",
  docs: [
    "Truncate sets the <code>text-overflow</code> property only.  Text will not truncate unless it is overlfowing its container, thus <code>truncate</code> and <code>clip</code> will not force truncation. They only allow you to control what happens when truncation occurs.",
  ],
  literalClasses: {
    "truncate": { properties: { "text-overflow": "ellipsis" }, exampleTemplate: truncateExampleTemplate, },
    "clip": { properties: { "text-overflow": "clip" }, exampleTemplate: truncateExampleTemplate },
  },
})


const overflow = new MetaPropertyGrouping({
  name: "Overflow",
  metaProperties: [  
    overflowMetaProperty,
    truncate,
  ],
  mediaQueries: mediaQueries.onlyBreakpoints(),
  docs: [
    "Setting overflow and trunaction behavior is a key technique in producing defensive designs, especially when small-screened devices require support",
  ]
})

export default overflow
