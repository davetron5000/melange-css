import DerivedVariable from "../lib/DerivedVariable.js"
import VariableRegistry from "../lib/VariableRegistry.js"

const spacings = VariableRegistry.register(
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
const negativeSpacings = spacings.map( (variable) => {
  const propertyTransform = (variable) => {
    return `calc(-1 * var(${variable._variableName()}))`
  }
  const stepNameTransform = (stepName) => {
    return `-${stepName}`
  }
  return new DerivedVariable({
    baseName: "negativeSpacing",
    variable: variable,
    propertyTransform: propertyTransform,
    stepNameTransform: stepNameTransform
  })
})

VariableRegistry.registerVariables("negativeSpacing", negativeSpacings)

const fontSizes = VariableRegistry.register(
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

const fontFamily = VariableRegistry.register(
  "fontFamily",
  {
    "sans": "Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif",
    "serif": "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
    "mono": "'Nimbus Mono PS', 'Courier New', monospace",
    "cursive": "'Snell Roundhand', 'Segoe Print', 'Bradley Hand', Chilanka, TSCu_Comic, casual, cursive",
    "fantasy": "'Party Let', fantasy",
  },
  "Fonts to use for sans, serif, etc.",
)
export {
  spacings,
  negativeSpacings,
  fontSizes,
  fontFamily,
}
