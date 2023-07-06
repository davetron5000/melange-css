import { MetaProperty }    from "../lib/MetaProperty.js"
import { CSSClassTemplate }                      from "../lib/CSSClass.js"
import { LiteralEnumeratedValue } from "../lib/EnumeratedValues.js"

const flexExample = (additionalCssClass) => {
  return {
    html: (selector, pseudoSelector) => {
      const completeSelector = additionalCssClass ? `${additionalCssClass} ${selector}` : selector
      return `
<div class="${completeSelector}">
  <div>${selector} One</div>
  <div>${selector} Two</div>
  <div>${selector} Three</div>
  <div>${selector} Four</div>
  <div>${selector} Five</div>
</div>
      `
    },
    markup: (selector, pseudoSelector, html) => {
      return "<div style=\"width: 30%;\">" + html.
        replace("<div ","<div style=\"gap: 0.25rem;\" ").
        replaceAll("<div>","<div style=\"padding: 0.25rem; border: solid thin black;\">") + "</div>"
    },
  }
}
const flex = MetaProperty.literal("flex", "display", "flex", undefined, { exampleTemplate: flexExample() })
const inlineFlex = MetaProperty.literal("inline-flex", "display", "inline-flex", undefined, { exampleTemplate: flexExample()})
const flexNone = MetaProperty.literal("flex-none", "flex", "none")
const flexDirection = new MetaProperty({
  name: "Flex Direction",
  enumeratedValues: [
    LiteralEnumeratedValue.literalValues({
      "-column": "column",
      "-row": "row",
      "-column-reverse": "column-reverse",
      "-row-reverse": "row-reverse",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("flex", "flex-direction", {
      exampleTemplate: flexExample("flex"),
    }),
  ],
})
const flexWrap = new MetaProperty({
  name: "Flex Wrap",
  cssClassTemplates: [
    new CSSClassTemplate("flex", "flex-wrap", { exampleTemplate: flexExample("flex") }),
  ],
  enumeratedValues: [
    LiteralEnumeratedValue.literalValues({
      "-wrap": "wrap",
      "-nowrap": "nowrap",
      "-wrap-reverse": "wrap-reverse",
    })
  ]
})
export {
  flex,
  inlineFlex,
  flexNone,
  flexDirection,
  flexWrap,
}
