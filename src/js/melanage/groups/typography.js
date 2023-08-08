import CSSClassTemplate     from "../../lib/CSSClassTemplate.js"
import Example              from "../../lib/Example.js"
import ExampleTemplate      from "../../lib/ExampleTemplate.js"
import MetaProperty         from "../../lib/MetaProperty.js"
import MetaPropertyGrouping from "../../lib/MetaPropertyGrouping.js"
import Scale                from "../../lib/scales/Scale.js"

import {
  fontScale,
  fontFamilies
} from "../scales.js"

const exampleTemplate = (selector) => {
  const html = `<div class=\"${selector}\">\nThe spice must flow!\n</div>`
  return new Example({
    htmlForDocs: html,
    markupForRendering: html.replace("<div ","<div style=\"max-widtyh: 75%\" "),
  })
}

const fontSizes = new MetaProperty({
  name: "Font Scale",
  enumeratedValues: [
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
const summarization = []
summarization.push(`<div style=\"display: flex; align-items: baseline; margin-bottom: 1rem;\"><h3 style="width: 8rem;"><a style=\"color: black; text-decoration: underline;\" href=\"#${fontSizes.name}\">${fontSizes.name}</a></h3>`)
fontSizes.cssClassTemplates.forEach( (cssClassTemplate) => {
  fontSizes.enumeratedValues().forEach( (enumeratedValues) => {
    enumeratedValues.eachStep( (enumeratedValue) => {
      const cssClass = cssClassTemplate.toCSSClass(enumeratedValue)
      if (cssClass.propertiesAndValues['font-size']) {
        summarization.push(`<div>
  <div style=\"margin-right: 1rem; padding: 1rem;">
    <span style=\"font-size: ${cssClass.propertiesAndValues['font-size']}\">Aa</span>
  </div>
</div>`)
      }
    })
  })
})
summarization.push("</div>")

const measureScale = new Scale({
  "": "30rem",
  "wide": "40rem",
  "narrow": "25rem",
})


const measure = new MetaProperty({
  name: "Measure",
  docs: "Measure allows styling maximum widths when text is involved, to ensure the text wraps properly for good reading",
  enumeratedValues: [ measureScale ],
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
  enumeratedValues: [
    new Scale({
      "right": "right",
      "center": "center",
      "justify": "justify",
      "left": "left",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("text", "text-align", {
      exampleTemplate: (selector) => {
        return `<div class="w-6 ${selector}">\nThe spice must flow!\n</div>`
      }
    }),
  ]
})
const leading = new MetaProperty({
  name: "Leading/Line Height",
  enumeratedValues: [
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
  enumeratedValues: [
    new Scale({
      "": "0.1em",
      "tight": "-0.05em",
      "mega": "0.25em",
      "none": "normal",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("tracked", "letter-spacing", {
      exampleTemplate: ExampleTemplate.divWithSelector("The spice must flow!"),
    }),
  ]
})

const fontStyle = new MetaProperty({
  name: "Font Style",
  enumeratedValues: [
    new Scale({
      "normal": "normal",
      "i": "italic",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("fs", "font-style", {
      exampleTemplate: ExampleTemplate.divWithSelector("The spice must flow!"),
    }),
  ]
})

const textTransform = new MetaProperty({
  name: "Text Tranform",
  enumeratedValues: [
    new Scale({
      "n": "none",
      "u": "uppercase",
      "l": "lowercase",
      "c": "capitalize",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("tt", "text-transform", {
      exampleTemplate: ExampleTemplate.divWithSelector("The spice must flow!"),
    }),
  ]
})

const textDecoration = new MetaProperty({
  name: "Text Decoration",
  docs: [
    "Text decoration adds lines to the text. You can combine the single letter values together by putting the letters in alphabetical order, for example <code>su</code> combines <code>s</code> and <code>u</code>",
  ],
  enumeratedValues: [
    new Scale({
      "n": "none",
      "u": "underline",
      "s": "line-through",
      "o": "overline",
      "su": "underline line-through",
      "ou": "underline overline",
      "os": "overline line-through",
      "ou": "underline overline",
      "osu": "line-through underline overline",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("td", "text-decoration", {
      exampleTemplate: ExampleTemplate.divWithSelector("The spice must flow!"),
    }),
  ]
})

const whiteSpace = new MetaProperty({
  name: "White Space",
  enumeratedValues: [
    new Scale({
      "normal": "normal",
      "nowrap": "nowrap",
      "pre": "pre",
      "prewrap": "pre-wrap",
      "preline": "pre-line",
      "breakspaces": "break-spaces",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("ws", "white-space", {
      exampleTemplate: (selector) => {
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
    }),
  ]
})

const fontWeight = new MetaProperty({
  name: "Font Weights",
  enumeratedValues: [
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
  enumeratedValues: [
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
  metaProperties: [ fontFamily, fontSizes, fontWeight, fontStyle, textAlign, textTransform, textDecoration, whiteSpace, leading, tracking, measure ],
  summarization: summarization.join("\n")
})

export default typography
