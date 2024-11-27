import CSSClassTemplate     from "../../lib/CSSClassTemplate.js"
import Example              from "../../lib/Example.js"
import ExampleTemplate      from "../../lib/ExampleTemplate.js"
import MetaProperty         from "../../lib/MetaProperty.js"
import MetaPropertyGrouping from "../../lib/MetaPropertyGrouping.js"
import Scale                from "../../lib/scales/Scale.js"
import ScaleAgnosticCSSClassTemplate from "../../lib/ScaleAgnosticCSSClassTemplate.js"

import {
  fontScale,
  fontFamilies,
  leadingScale,
  trackingScale,
  indentScale,
  measureScale,
} from "../scales.js"
import pseudoSelectors from "../pseudoSelectors.js"
import mediaQueries    from "../MediaQueries.js"

const basicExample = ExampleTemplate.divWithSelector("The spice must flow!")
const paragraphExample = ExampleTemplate.divWithSelector("“God Emperor of Dune” is often considered the best of the series, however the first book—“Dune”—is the safer bet if you intended to read only one.")

const fontSizes = new MetaProperty({
  name: "Font Scale",
  scales: [
    fontScale,
  ],
  cssClassTemplates: [
    new CSSClassTemplate("f", "font-size", {
      exampleTemplate: basicExample,
    }),
  ]
})

const measure = new MetaProperty({
  name: "Measure",
  docs: "Measure is a convienience for setting max widths appropriate for reading text, and works regardless of font size. It uses <code>ch</code> units to achieve this.",
  scales: [ measureScale ],
  cssClassTemplates: [
    new CSSClassTemplate("measure", "max-width", {
      exampleTemplate: ExampleTemplate.divWithSelector(`Although “Hunters of Dune” and “Sandworms of Dune” carry on the story 
  started by the original six books, you will get a perfectly fine reading 
  experience by reading only “Dune”, “Dune Messiah”, “Children of Dune”, “God 
  Emperor of Dune”, “Heretics of Dune”, and finishing with “Chapterhouse 
  Dune”. Trust me.`),
    }),
  ]
})
const textAlign = new MetaProperty({
  name: "Text Align",
  literalClasses: {
    "tr": { properties: { "text-align": "right" }, exampleTemplate: basicExample, summary: "Right" },
    "tc": { properties: { "text-align": "center" }, exampleTemplate: basicExample, summary: "Center" },
    "tl": { properties: { "text-align": "left" }, exampleTemplate: basicExample, summary: "Left" },
  }
})
const verticalAlign = new MetaProperty({
  name: "Vertical Align",
  docs: [
    "While vertical alignemnt can be specified in artbirary lengbths and percentages, baseline, top, middle, and bottom are sufficient for most use-cases."
  ],
  literalClasses: {
    "va-baseline": { properties: { "vertical-align": "baseline" }, exampleTemplate: basicExample, summary: "Baseline" },
    "va-middle":   { properties: { "vertical-align": "middle" }, exampleTemplate: basicExample, summary: "Middle" },
    "va-top":      { properties: { "vertical-align": "top" }, exampleTemplate: basicExample, summary: "Top" },
    "va-bottom":   { properties: { "vertical-align": "bottom" }, exampleTemplate: basicExample, summary: "Bottom" },
  }
})
const leading = new MetaProperty({
  name: "Leading/Line Height",
  scales: leadingScale,
  cssClassTemplates: [
    new CSSClassTemplate("lh", "line-height", {
      exampleTemplate: ExampleTemplate.divWithSelector(`Although “Hunters of Dune” and “Sandworms of Dune” carry on the story 
  started by the original six books, you will get a perfectly fine reading 
  experience by reading only “Dune”, “Dune Messiah”, “Children of Dune”, “God 
  Emperor of Dune”, “Heretics of Dune”, and finishing with “Chapterhouse 
  Dune”. Trust me.`),
    }),
  ]
})

const tracking = new MetaProperty({
  name: "Tracking / Letter Spacing",
  scales: trackingScale,
  cssClassTemplates: [
    new CSSClassTemplate("tracked", "letter-spacing", {
      exampleTemplate: basicExample,
    }),
  ]
})

const fontStyle = new MetaProperty({
  name: "Font Style",
  literalClasses: {
    "fs-normal": { properties: { "font-style": "normal" }, exampleTemplate: basicExample },
    "fs-italic": { properties: { "font-style": "italic" }, exampleTemplate: basicExample, summary: "Italic" },
  }
})

const aliases = new MetaProperty({
  name: "Aliases",
  literalClasses: {
    "b": { properties: { "font-weight": "bold" }, exampleTemplate: basicExample, summary: "Bold" },
    "i": { properties: { "font-style": "italic" }, exampleTemplate: basicExample, summary: "Italic" },
    "sc":{ properties: { "font-variant": "small-caps" }, exampleTemplate: basicExample, summary: "Small Caps" },
    "u": { properties: { "text-decoration": "underline"}, exampleTemplate: basicExample, summary: "Underline" },
    "p": { properties: { "max-width": "var(--tw)", "line-height": "var(--lh-copy)" }, exampleTemplate: paragraphExample, summary: "Content paragraph with measure and lh-copy" },
  },
  docs: [
    "These violate the naming conventions, but are convienient as aliases for more commonly-used needs.",
  ]
})

const fontVariant = new MetaProperty({
  name: "Font Variant",
  literalClasses: {
    "fv-sc":     { properties: { "font-variant": "small-caps" }, exampleTemplate: basicExample, summary: "Small Caps" },
    "fv-normal": { properties: { "font-variant": "normal" }, exampleTemplate: basicExample, summary: "Normal" },
  }
})

const textTransform = new MetaProperty({
  name: "Text Tranform",
  literalClasses: {
    "ttn": { properties: { "text-transform": "none" }, exampleTemplate: basicExample, summary: "None" },
    "ttu": { properties: { "text-transform": "uppercase" }, exampleTemplate: basicExample, summary: "Uppercase" },
    "ttl": { properties: { "text-transform": "lowercase" }, exampleTemplate: basicExample, summary: "Lowercase" },
    "ttc": { properties: { "text-transform": "capitalize" }, exampleTemplate: basicExample, summary: "Capitalize" },
  }
})

const textDecoration = new MetaProperty({
  name: "Text Decoration",
  literalClasses: {
    "tdn":   { properties: { "text-decoration": "none" },
             exampleTemplate: basicExample, summary: "None" },
    "tdu":   { properties: { "text-decoration": "underline"},
             exampleTemplate: basicExample, summary: "Underline" },
    "tds":   { properties: { "text-decoration": "line-through"},
             exampleTemplate: basicExample, summary: "Strike" },
    "tdo":   { properties: { "text-decoration": "overline"},
             exampleTemplate: basicExample, summary: "Overline" },
  },
  pseudoSelectors: [
    pseudoSelectors.default,
    pseudoSelectors.hover,
  ]
})

const indentExample = (selector) => {
  const copy = `Although “Hunters of Dune” and “Sandworms of Dune” carry on the story 
started by the original six books, you will get a perfectly fine reading 
experience from the originals.`
  return new Example({
    htmlForDocs: `<div class="measure lh-copy ${selector}">
  ${copy}
</div>`,
    markupForRendering: `<div class="ph-4 pv-2 ba bc-gray bg-gray-800"><div class="bg-white measure lh-copy ba bs-dashed ${selector}">
  ${copy}
</div></div>`,
  })
}

const textIndent = new MetaProperty({
  name: "Indent",
  scales: indentScale,
  cssClassTemplates: [
    new CSSClassTemplate("indent", "text-indent", {
      exampleTemplate: indentExample,
    }),
  ]
})

const whiteSpaceExample = (selector) => {
  return `<div class="measure-narrow ${selector}">
  Although “Hunters of Dune” and 
           “Sandworms of Dune” carry on the story 
     started by the original six books, you will

     get a perfectly fine reading experience by reading only 

     “Dune”, “Dune Messiah”, “Children of Dune”,
     “God Emperor of Dune”, “Heretics of Dune”, 
     and finishing with “Chapterhouse Dune”.

Trust me.
</div>`}

const whiteSpace = new MetaProperty({
  name: "White Space",
  literalClasses: {
    "ws-normal":      { properties: { "white-space": "normal" }, exampleTemplate: whiteSpaceExample, summary: "Normal" },
    "ws-nowrap":      { properties: { "white-space": "nowrap" }, exampleTemplate: whiteSpaceExample, summary: "No Wrap" },
    "ws-pre":         { properties: { "white-space": "pre" }, exampleTemplate: whiteSpaceExample, summary: "Pre" },
  }
})

const fontWeight = new MetaProperty({
  name: "Font Weights",
  scales: [
    new Scale({
      "normal": "normal",
      "bold": "bold"
    }),
    new Scale({
      "1": "100",
      "2": "200",
      "3": "300",
      "4": "400",
      "5": "500",
      "6": "600",
      "7": "700",
      "8": "800",
      "9": "900",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("fw", "font-weight", {
      exampleTemplate: ExampleTemplate.divWithSelector("The spice must flow!"),
    }),
  ]
})

const fontFamily = new MetaProperty({
  name: "Font Families",
  scales: [
    fontFamilies,
  ],
  cssClassTemplates: [
    new CSSClassTemplate("ff", "font-family", {
      exampleTemplate: (selector) => {
        return `<div class="f-5 ${selector}">
  The spice must flow
</div>`
      }
    }),
  ]
})


const typography = new MetaPropertyGrouping({
  name: "Typography",
  metaProperties: [
    fontFamily,
    fontSizes,
    fontWeight,
    fontStyle,
    fontVariant,
    textAlign,
    verticalAlign,
    textTransform,
    textDecoration,
    textIndent,
    whiteSpace,
    leading,
    tracking,
    measure,
    aliases,
  ],
  mediaQueries: [
    ...mediaQueries.onlyBreakpoints(),
    mediaQueries.moreContrast,
  ],
  docs: [
    "Text rendering can be tricky, however the use of a fixed font scale and a limited number of other tranformations for letter spacing and leading can provide myriad combinations to meet most needs without having to endlessly tweak precise values.  The result of the fixed set up typographic features is general consistency and harmony regardless of the styles chosen.",
  ]
})

export default typography
