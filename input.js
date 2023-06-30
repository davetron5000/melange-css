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
  new Breakpoint({variableNamePrefix: "ns", minWidth: "30em"}),
  new Breakpoint({variableNamePrefix: "m",  minWidth: "30em", maxWidth: "60em"}),
  new Breakpoint({variableNamePrefix: "l",  minWidth: "60em"}),
]

MelangeVariable.register("spacing",[
  "0.25rem",
  "0.5rem",
  "1rem",
  "2rem",
  "4rem",
  "8rem",
  "18rem",
])

MelangeVariable.register("fontSize",[
  "0.875rem",
  "1rem",
  "1.25rem",
  "1.5rem",
  "2.25rem",
  "3rem",
  "5rem",
  "6rem",
])

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
  "-two-thirds": "calc(100% * 1.5)",
})

const spacingFixedScale = new VariableBasedScaleWithZero(MelangeVariable.fetchAll("spacing"))
const fontScale = new VariableBasedScale(MelangeVariable.fetchAll("fontSize"))

const spacings = new MetaProperty({
  name: "Spacings",
  enumeratedValues: [
    spacingFixedScale
  ],
  cssClassTemplates: [
    new CSSClassTemplate("p", "padding"),
    new CSSClassTemplate("pl", "padding-left"),
    new CSSClassTemplate("pr", "padding-right"),
    new CSSClassTemplate("pt", "padding-top"),
    new CSSClassTemplate("pb", "padding-bottom"),
    new CSSClassTemplate("ph", "padding-left", "padding-right"),
    new CSSClassTemplate("pv", "padding-top", "padding-bottom"),
    new CSSClassTemplate("m", "margin"),
    new CSSClassTemplate("ml", "margin-left"),
    new CSSClassTemplate("mr", "margin-right"),
    new CSSClassTemplate("mt", "margin-top"),
    new CSSClassTemplate("mb", "margin-bottom"),
    new CSSClassTemplate("mh", "margin-left", "margin-right"),
    new CSSClassTemplate("mv", "margin-top", "margin-bottom"),
  ]
})

const fontSizes = new MetaProperty({
  name: "Font Scale",
  enumeratedValues: [
    fontScale,
  ],
  cssClassTemplates: [
    new CSSClassTemplate("f", "font-size"),
  ]
})

const measureScale = new LiteralScale({
  "": "30rem",
  "-wide": "40rem",
  "-narrow": "25rem",
})

const measure = new MetaProperty({
  name: "Measure",
  enumeratedValues: [ measureScale ],
  cssClassTemplates: [
    new CSSClassTemplate("measure", "max-width"),
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
    new CSSClassTemplate("w", "width"),
    new CSSClassTemplate("mw", "max-width"),
  ]
})

const colorMetaProperties = []

const colorTints = new ColorTints()
colorTints.register("gray", [ "#F5F5F5", "#ADADAD", "#999999", "#5C5C5C", "#1F1F1F" ])
colorTints.register("red",  [ "#FFDFDF", "#FF8D86", "#FF4136", "#E7040F", "#80211b" ])

const flex = MetaProperty.literal("flex", "display", "flex")
const inlineFlex = MetaProperty.literal("inline-flex", "display", "inline-flex")
const flexNone = MetaProperty.literal("flex-none", "flex", "none")
const flexDirection = new MetaProperty({
  name: "Flex Direction",
  cssClassTemplates: [
    new CSSClassTemplate("flex", "flex-direction"),
  ],
  enumeratedValues: [
    LiteralEnumeratedValue.literalValues({
      "-column": "column",
      "-row": "row",
      "-column-reverse": "column-reverse",
      "-row-reverse": "row-reverse",
    })
  ]
})
const flexWrap = new MetaProperty({
  name: "Flex Wrap",
  cssClassTemplates: [
    new CSSClassTemplate("flex", "flex-wrap"),
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
console.log(":root {")
Object.entries(MelangeVariable.registeredVariables).forEach( ([_,x]) => {
  Object.entries(x).forEach( ([_,melangeVariable]) => {
  console.log(melangeVariable.toCSSProperty("3px"))
  })
})
console.log("}")
metaTheme.eachCSSClass( (cssClass) => {
  console.log(cssClass.toCSS())
})
