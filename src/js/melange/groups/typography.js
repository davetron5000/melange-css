import CSSClassTemplate     from "../../lib/CSSClassTemplate.js"
import Example              from "../../lib/Example.js"
import ExampleTemplate      from "../../lib/ExampleTemplate.js"
import MetaProperty         from "../../lib/MetaProperty.js"
import MetaPropertyGrouping from "../../lib/MetaPropertyGrouping.js"
import Scale                from "../../lib/scales/Scale.js"

import pseudoSelectors from "../pseudoSelectors.js"

import {
  fontScale,
  fontFamilies
} from "../scales.js"

const basicExample = ExampleTemplate.divWithSelector("The spice must flow!")

const exampleTemplate = (selector) => {
  const html = `<div class=\"${selector}\">\nThe spice must flow!\n</div>`
  return new Example({
    htmlForDocs: html,
    markupForRendering: html.replace("<div ","<div style=\"max-widtyh: 75%\" "),
  })
}

const fontSizes = new MetaProperty({
  name: "Font Scale",
  scales: [
    fontScale,
  ],
  cssClassTemplates: [
    new CSSClassTemplate("f", "font-size", {
      docs: [
        "Font size is the basic underpinning of any design system. These sizes should provide an adequate array of sizes for any occasion.  Append a number to <code>f</code> to generate the size you need",
      ],
      exampleTemplate: exampleTemplate,
    }),
  ]
})

const measureScale = new Scale({
  "": "30rem",
  "wide": "40rem",
  "narrow": "25rem",
})


const measure = new MetaProperty({
  name: "Measure",
  docs: "Measure is a convienience for setting max widths appropriater for reading text",
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
    "tj": { properties: { "text-align": "justify" }, exampleTemplate: basicExample, summary: "Justify" },
  }
})
const leading = new MetaProperty({
  name: "Leading/Line Height",
  scales: [
    new Scale({
      "solid": "1",
      "title": "1.25",
      "copy": "1.5",
    })
  ],
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
  name: "Tracking",
  scales: [
    new Scale({
      "": "0.1em",
      "tight": "-0.05em",
      "mega": "0.25em",
      "none": "normal",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("tracked", "letter-spacing", {
      exampleTemplate: basicExample,
    }),
  ]
})

const fontStyle = new MetaProperty({
  name: "Font Style",
  literalClasses: {
    "normal": { properties: { "font-style": "normal" }, exampleTemplate: basicExample },
    "i": { properties: { "font-style": "italic" }, exampleTemplate: basicExample, summary: "Italic" },
  }
})

const fontVariant = new MetaProperty({
  name: "Font Variant",
  literalClasses: {
    "small-caps": { properties: { "font-variant": "small-caps" }, exampleTemplate: basicExample, summary: "Small Caps" },
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
  docs: [
    "Text decoration adds lines to the text. You can combine the single letter values together by putting the letters in alphabetical order, for example <code>su</code> combines <code>s</code> and <code>u</code>",
  ],
  literalClasses: {
    "tdn":   { properties: { "text-decoration": "none" },
             exampleTemplate: basicExample, summary: "None" },
    "tdu":   { properties: { "text-decoration": "underline"},
             exampleTemplate: basicExample, summary: "Underline" },
    "u":     { properties: { "text-decoration": "underline"},
             exampleTemplate: basicExample, summary: "Underline" },
    "tds":   { properties: { "text-decoration": "line-through"},
             exampleTemplate: basicExample, summary: "Strike" },
    "tdo":   { properties: { "text-decoration": "overline"},
             exampleTemplate: basicExample, summary: "Overline" },
    "tdsu":  { properties: { "text-decoration": "underline line-through"},
             exampleTemplate: basicExample, summary: "Underline and Strike" },
    "tdou":  { properties: { "text-decoration": "underline overline"},
             exampleTemplate: basicExample, summary: "Underline and Overline" },
    "tdos":  { properties: { "text-decoration": "overline line-through"},
             exampleTemplate: basicExample, summary: "Overline and Strike" },
    "tdou":  { properties: { "text-decoration": "underline overline"},
             exampleTemplate: basicExample, summary: "Underline and Overline" },
    "tdosu": { properties: { "text-decoration": "line-through underline overline"},
             exampleTemplate: basicExample, summary: "Underline, Overline, and Strike" },
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
    markupForRendering: `<div style="padding: 0.5em 2.5em;" class="ba b--dashed bg-gray-lightest"><div class="bg-white measure lh-copy ${selector}">
  ${copy}
</div></div>`,
  })
}

const textIndent = new MetaProperty({
  name: "Indent",
  scales: [
    new Scale({
      "0": "0",
      "1": "1em",
      "2": "1.5em",
      "3": "2em",
      "-1": "-1em",
      "-2": "-1.5em",
      "-3": "-2em",
    })
  ],
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
    "ws-prewrap":     { properties: { "white-space": "pre-wrap" }, exampleTemplate: whiteSpaceExample, summary: "Pre Wrap" },
    "ws-preline":     { properties: { "white-space": "pre-line" }, exampleTemplate: whiteSpaceExample, summary: "Pre Line" },
    "ws-breakspaces": { properties: { "white-space": "break-spaces" }, exampleTemplate: whiteSpaceExample, summary: "Break Spaces" },
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
    new CSSClassTemplate("font", "font-family", {
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
    textTransform,
    textDecoration,
    textIndent,
    whiteSpace,
    leading,
    tracking,
    measure
  ],
})

export default typography
