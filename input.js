import fs from "node:fs"
import { MelangeVariable }                       from "./MelangeVariable.js"
import { EnumeratedValues, LiteralEnumeratedValue } from "./EnumeratedValues.js"
import {
  VariableBasedScale,
  VariableBasedScaleWithZero,
  LiteralScale
}                                                from "./Scale.js"
import { CSSClassTemplate }                      from "./CSSClass.js"
import { DefaultPseudoSelector, PseudoSelector } from "./PseudoSelector.js"
import { DefaultBreakpoint, Breakpoint }         from "./Breakpoint.js"
import { MetaProperty, MetaPropertyGrouping }    from "./MetaProperty.js"
import { MetaTheme }                             from "./MetaTheme.js"
import { ColorTints }                            from "./ColorTints.js"

const breakpoints = [
  new DefaultBreakpoint(),
  new Breakpoint({variableNameQualifier: "ns", minWidth: "30em"}),
  new Breakpoint({variableNameQualifier: "m",  minWidth: "30em", maxWidth: "60em"}),
  new Breakpoint({variableNameQualifier: "l",  minWidth: "60em"}),
]

MelangeVariable.register(
  "spacing",
  [
    "0.25rem",
    "0.5rem",
    "1rem",
    "2rem",
    "4rem",
    "8rem",
    "18rem",
  ],
  "Spacing scale for margins, paddings, widths, etc.",
)

MelangeVariable.register(
  "fontSize",
  [
    "0.875rem",
    "1rem",
    "1.25rem",
    "1.5rem",
    "2.25rem",
    "3rem",
    "5rem",
    "6rem",
  ],
  "Font scale, with size 2 being the body font size"
)

const percentageScale = new LiteralScale({
  "-10": "10%",
  "-20": "20%",
  "-30": "30%",
  "-40": "40%",
  "-50": "50%",
  "-60": "60%",
  "-70": "70%",
  "-80": "80%",
  "-90": "90%",
  "-100": "100%",
})

const autoScale = new LiteralScale({
  "-auto": "auto",
})

const thirdsScale = new LiteralScale({
  "-third": "calc(100% / 3)",
  "-two-thirds": "calc(100% / 1.5)",
})

const spacingFixedScale = new VariableBasedScaleWithZero(MelangeVariable.fetchAll("spacing"))
const fontScale = new VariableBasedScale(
  MelangeVariable.fetchAll("fontSize")
)

const paddingExampleTemplate = {
  html: (selector, pseudoSelector) => {
    return `<div class=\"${selector}\">.${selector}</div>`
  },
  markup: (selector, pseudoSelector, html) => {
    return html.replace("<div ","<div style=\"display: inline-block; border: solid thin; background-color: #ddd; color: #222;\" ")
  }
}
const marginExampleTemplate = {
  html: (selector, pseudoSelector) => { return `<div class="${selector}">.${selector}</div>` },
  markup: (selector, pseudoSelector, html) => {
    const innerHTML = html.replace("<div ","<div style=\"border: solid thin black; background-color: #ddd; color: #222;\" ")
    return `<div style=\"display: inline-block; border: dashed thin black\">${innerHTML}</div>`
  }
}
const spacings = new MetaProperty({
  name: "Spacings",
  docs: [
    "Spacing manages both margins and padding along a grid of reasonable spacings usable for any occasion",
    "Each spacing can be applied to the entire box, horizontally, vertically, or to individual dimensions",
  ],
  enumeratedValues: [
    spacingFixedScale
  ],
  cssClassTemplates: [
    new CSSClassTemplate("p", "padding", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("pl", "padding-left", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("pr", "padding-right", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("pt", "padding-top", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("pb", "padding-bottom", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("ph", "padding-left", "padding-right", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("pv", "padding-top", "padding-bottom", { exampleTemplate: paddingExampleTemplate }),
    new CSSClassTemplate("m", "margin", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("ml", "margin-left", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("mr", "margin-right", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("mt", "margin-top", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("mb", "margin-bottom", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("mh", "margin-left", "margin-right", { exampleTemplate: marginExampleTemplate }),
    new CSSClassTemplate("mv", "margin-top", "margin-bottom", { exampleTemplate: marginExampleTemplate }),
  ]
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
      exampleTemplate: {
        html: (selector, pseudoSelector) => { return `<p class=\"${selector}\">Greetings, programs!  Please remember to fight for the users!</p>` },
        markup: (selector, pseudoSelector, html) => {
          return html.replace("<p ","<p style=\"max-width: 75%;\" ")
        }
      }
    }),
  ]
})

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
      exampleTemplate: {
        html: (selector, pseudoSelector) => { return `<p class=\"${selector}\">The studio was filled with the rich odour of roses, and when the light summer wind stirred amidst the trees of the garden, there came through the open door the heavy scent of the lilac, or the more delicate perfume of the pink-flowering thorn.</p>` },
        markup: (selector, pseudoSelector, html) => { return html }
      }
    }),
  ]
})

const widths = new MetaProperty({
  name: "width",
  enumeratedValues: [
    spacingFixedScale,
    percentageScale,
    autoScale,
    thirdsScale,
  ],
  cssClassTemplates: [
    new CSSClassTemplate("w", "width", {
      exampleTemplate: {
        html: (selector, pseudoSelector) => { return `<div class=\"${selector}\">.${selector}</div>` },
        markup: (selector, pseudoSelector, html) => {
          return html.replace("<div ","<div style=\"padding: 1rem; border: solid thin black; background-color: #ddd; color: #222;\" ")
        }
      }
    }),
    new CSSClassTemplate("mw", "max-width", {
      exampleTemplate: {
        html: (selector, pseudoSelector) => { 
          let text = "In the centre of the room, clamped to an upright easel, stood the full-length portrait of a young man of extraordinary personal beauty,"
          if (["mw-50","mw-60","mw-70","mw-80","mw-90","mw-100","mw-auto","mw-third","mw-two-thirds"].indexOf(selector) != -1) {
            text = text + " and in front of it, some little distance away, was sitting the artist himself, Basil Hallward, whose sudden disappearance some years ago caused, at the time, such public excitement and gave rise to so many strange conjectures."
          }
          return `<p class=\"${selector}\">${text}</p>` },
        markup: (selector, pseudoSelector, html) => {
          return html.replace("<p ","<p style=\"font-size: 0.75rem;\" ")
        }
      }
    }),
  ]
})

const colorMetaProperties = []

const colorTints = new ColorTints()
colorTints.register("gray", [ "#F5F5F5", "#ADADAD", "#999999", "#5C5C5C", "#1F1F1F" ])
colorTints.register("red",  [ "#FFDFDF", "#FF8D86", "#FF4136", "#E7040F", "#80211b" ])

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
const metaTheme = new MetaTheme({
  metaPropertyGroupings: [
    MetaPropertyGrouping.singleton(spacings),
    new MetaPropertyGrouping({ name: "Widths",
      metaProperties: [
        measure,
        widths,
      ]
    }),
    MetaPropertyGrouping.singleton(fontSizes),
    new MetaPropertyGrouping({name: "Flexbox",
      metaProperties: [
        flex,
        inlineFlex,
        flexNone,
        flexDirection,
        flexWrap,
      ]
    }),
  ].concat(colorTints.asMetaPropertyGrouping()),
  breakpoints: breakpoints,
})

metaTheme.checkForDupes()

const css = fs.createWriteStream("melange.css")
css.write(":root {\n")
MelangeVariable.eachSetOfVariables( (baseName,variablesSet) => {
  css.write("/*\n")
  css.write(` * ${baseName}\n *\n`)
  if (variablesSet.documentation) {
    css.write(` * ${variablesSet.documentation}\n`)
  }
  css.write(" */\n")

  Object.values(variablesSet.variables).forEach( (melangeVariable) => {
    css.write(melangeVariable.toCSSProperty())
    css.write("\n")
  })
  css.write("\n")
})
css.write("}\n")

const writeCSSClass = (cssClass) => {
  css.write(cssClass.toCSS())
  css.write("\n")
}
const startBreakpoint = (breakpoint) => {
  if (breakpoint.toMediaQuery() !== "") {
    css.write(`${breakpoint.toMediaQuery()} {\n`)
  }
}
const endBreakpoint = (breakpoint) => {
  if (breakpoint.toMediaQuery() !== "") {
    css.write("}\n")
  }
}

let doc = []
let breakpoint

const rememberBreakpoint = (bp) => {
  breakpoint = bp
}
const writeDocFile = {
  start: (metaPropertyGrouping) => {
    doc = []
    doc.push(`<html>
  <head>
  <title>Melange - Reference - ${metaPropertyGrouping.name}</title>
  <link href="melange.css" rel="stylesheet">
  </head>
  <body>
    <h1 class="f5">${metaPropertyGrouping.name}</h1>\n`)

    metaPropertyGrouping.docs.forEach( (docParagraph) => {
      doc.push(`    <p class="measure f2">${docParagraph}</p>\n`)
    })
  },
  end: (metaPropertyGrouping) => {
    doc.push("</body>")
    doc.push("</html>")
    if (breakpoint.isDefault()) {
      fs.writeFileSync(`${metaPropertyGrouping.slug}.doc.html`, doc.join("\n"))
    }
    else {
      console.log(`Ignoring breakpoint ${breakpoint.variableNameQualifier}`)
    }
  }
}

const documentMetaProperty = {
  start: (metaProperty) => {
    doc.push(`    <section>
      <h2 class="f4">${metaProperty.name}</h2>
`)
    metaProperty.docs.forEach( (docParagraph) => {
      doc.push(`      <p class="measure f2">${docParagraph}</p>\n`)
    })
  },
  end: (metaProperty) => { doc.push("    </section>\n") }
}
const documentTemplate = {
  start: (cssClassTemplate) => {
    doc.push("      <section>\n")
		doc.push(`        <h3 class=\"f3\">${cssClassTemplate.classNameBase}</h3>\n`)
    if (cssClassTemplate.docs) {
      cssClassTemplate.docs.forEach( (docParagraph) => {
        doc.push(`         <p class="measure f2">${docParagraph}</p>\n`)
      })
    }
    doc.push("       <ul>\n")
  },
  end: (cssClassTemplate) => {
    doc.push("        </ul>\n      </section>\n")
  }
}

const documentClass = (cssClass, cssClassTemplate) => {
  doc.push(`
          <li>
            <code>.${cssClass.className()}</code>\n`)
  if (cssClassTemplate.hasExample()) {
    const example = cssClassTemplate.example(cssClass)
    doc.push(`            <div><code><pre>${example.escaped}</pre></code></div>`)
    doc.push(`            ${example.markup}`)
  }
  doc.push(`          </li>`)
}

/* Generate CSS */
metaTheme.eachCSSClass({
  onCSSClass: writeCSSClass,
  onBreakpoint: {
    start: startBreakpoint,
    end:  endBreakpoint,
  },
})
/* Generate Docs */
metaTheme.eachCSSClass({
  onBreakpoint: {
    start: rememberBreakpoint,
  },
  onMetaPropertyGrouping: writeDocFile,
  onMetaProperty: documentMetaProperty,
  onCSSClassTemplate: documentTemplate,
  onCSSClass: documentClass,
})

css.close()
