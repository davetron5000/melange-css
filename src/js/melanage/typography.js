import { MetaProperty, MetaPropertyGrouping } from "../lib/MetaProperty.js"
import { CSSClassTemplate }                   from "../lib/CSSClass.js"
import { ExampleTemplate }                    from "../lib/ExampleTemplate.js"
import { LiteralScale }                       from "../lib/Scale.js"

import { fontScale, fontFamilies } from "./scales.js"

const exampleTemplate = new ExampleTemplate({
  contentForDemonstration: "Greetings, programs!  Remember: fight for the users!",
  stylesToAddToMarkup: {
    "max-width": "75%",
  }
})

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
    enumeratedValues.eachValue( (enumeratedValue) => {
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

const measureScale = new LiteralScale({
  "": "30rem",
  "-wide": "40rem",
  "-narrow": "25rem",
})


const measure = new MetaProperty({
  name: "Measure",
  docs: "Measure allows styling maximum widths when text is involved, to ensure the text wraps properly for good reading",
  enumeratedValues: [ measureScale ],
  cssClassTemplates: [
    new CSSClassTemplate("measure", "max-width", {
      exampleTemplate: new ExampleTemplate({
        contentForDemonstration: `
The studio was filled with the rich odour of roses, and when the light 
summer wind stirred amidst the trees of the garden, there came through the 
open door the heavy scent of the lilac, or the more delicate perfume of the 
pink-flowering thorn.
`
      }),
    }),
  ]
})
const textAlign = new MetaProperty({
  name: "Text Align",
  enumeratedValues: [
    new LiteralScale({
      "-right": "right",
      "-center": "center",
      "-justify": "justify",
      "-left": "left",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("text", "text-align", {
      exampleTemplate: new ExampleTemplate({
        classesRequiredForSelector: "w6",
        contentForDemonstration: "The spice must flow!",
      }),
    }),
  ]
})
const leading = new MetaProperty({
  name: "Leading/Line Height",
  enumeratedValues: [
    new LiteralScale({
      "-solid": "1",
      "-title": "1.25",
      "-copy": "1.5",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("lh", "line-height", {
      exampleTemplate: new ExampleTemplate({
        classesRequiredForSelector: "measure",
        contentForDemonstration: `
The studio was filled with the rich odour of roses, and when the light 
summer wind stirred amidst the trees of the garden, there came through the 
open door the heavy scent of the lilac, or the more delicate perfume of the 
pink-flowering thorn.
`
      }),
    }),
  ]
})

const tracking = new MetaProperty({
  name: "Tracking",
  enumeratedValues: [
    new LiteralScale({
      "": "0.1em",
      "-tight": "-0.05em",
      "-mega": "0.25em",
      "-none": "normal",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("tracked", "letter-spacing", {
      exampleTemplate: new ExampleTemplate({
        contentForDemonstration: "\nGreetings, programs!  Remember: fight for the users!\n",
      }),
    }),
  ]
})

const fontStyle = new MetaProperty({
  name: "Font Style",
  enumeratedValues: [
    new LiteralScale({
      "-normal": "normal",
      "-i": "italic",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("fs", "font-style", {
      exampleTemplate: new ExampleTemplate({
        contentForDemonstration: "\nGreetings, programs!\n",
      }),
    }),
  ]
})

const textTransform = new MetaProperty({
  name: "Text Tranform",
  enumeratedValues: [
    new LiteralScale({
      "n": "none",
      "u": "uppercase",
      "l": "lowercase",
      "c": "capitalize",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("tt", "text-transform", {
      exampleTemplate: new ExampleTemplate({
        contentForDemonstration: "\nGreetings, programs!\n",
      }),
    }),
  ]
})

const textDecoration = new MetaProperty({
  name: "Text Decoration",
  docs: [
    "Text decoration adds lines to the text. You can combine the single letter values together by putting the letters in alphabetical order, for example <code>su</code> combines <code>s</code> and <code>u</code>",
  ],
  enumeratedValues: [
    new LiteralScale({
      "-n": "none",
      "-u": "underline",
      "-s": "line-through",
      "-o": "overline",
      "-su": "underline line-through",
      "-ou": "underline overline",
      "-os": "overline line-through",
      "-ou": "underline overline",
      "-osu": "line-through underline overline",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("td", "text-decoration", {
      exampleTemplate: new ExampleTemplate({
        contentForDemonstration: "\nGreetings, programs!\n",
      }),
    }),
  ]
})

const whiteSpace = new MetaProperty({
  name: "White Space",
  enumeratedValues: [
    new LiteralScale({
      "-normal": "normal",
      "-nowrap": "nowrap",
      "-pre": "pre",
      "-prewrap": "pre-wrap",
      "-preline": "pre-line",
      "-breakspaces": "break-spaces",
    })
  ],
  cssClassTemplates: [
    new CSSClassTemplate("ws", "white-space", {
      exampleTemplate: new ExampleTemplate({
        classesRequiredForSelector: "measure-narrow",
        contentForDemonstration: `
The studio was filled with the rich odour of roses,
    and when the light summer wind stirred
    amidst the trees of the garden,
        there came through the open door
        the heavy scent of the lilac,
    or the more delicate perfume of the pink-flowering thorn.
`
      }),
    }),
  ]
})

const fontWeight = new MetaProperty({
  name: "Font Weights",
  enumeratedValues: [
    new LiteralScale({
      "-normal": "normal",
      "-bold": "bold"
    }),
    new LiteralScale({
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
      exampleTemplate: new ExampleTemplate({
        contentForDemonstration: "\nGreetings, programs!\n",
      }),
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
      exampleTemplate: new ExampleTemplate({
        classesRequiredForSelector: "f4",
        contentForDemonstration: "\nGreetings, programs!\n",
      })
    }),
  ]
})

const typography = new MetaPropertyGrouping({
  name: "Typography",
  metaProperties: [ fontFamily, fontSizes, fontWeight, fontStyle, textAlign, textTransform, textDecoration, whiteSpace, leading, tracking, measure ],
  summarization: summarization.join("\n")
})



export {
  typography,
}
