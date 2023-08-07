import { MelangeVariable }            from "../lib/MelangeVariable.js"

const spacings = MelangeVariable.register(
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
  "Spacing scale for margins, paddings, widths, positions, etc.",
)
const negativeSpacings = MelangeVariable.register(
  "negativeSpacing",
  {
    "-1": "-0.25rem",
    "-2": "-0.5rem",
    "-3": "-1rem",
    "-4": "-2rem",
    "-5": "-4rem",
    "-6": "-8rem",
    "-7": "-18rem",
  },
  "Negative spacing scale for margins, paddings, widths, positions, etc.",
)

const fontSizes = MelangeVariable.register(
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

const fontFamily = MelangeVariable.register(
  "fontFamily",
  {
    "-sans": "Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif",
    "-serif": "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
    "-mono": "'Nimbus Mono PS', 'Courier New', monospace",
    "-cursive": "'Snell Roundhand', 'Segoe Print', 'Bradley Hand', Chilanka, TSCu_Comic, casual, cursive",
    "-fantasy": "'Party Let', fantasy",
  },
  "Fonts to use for sans, serif, etc.",
)
export {
  spacings,
  negativeSpacings,
  fontSizes,
  fontFamily,
}
