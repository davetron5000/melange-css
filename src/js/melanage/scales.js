import DerivedVariable            from "../lib/DerivedVariable.js"
import Scale                      from "../lib/scales/Scale.js"
import VariableBasedScale         from "../lib/scales/VariableBasedScale.js"
import VariableBasedScaleWithZero from "../lib/scales/VariableBasedScaleWithZero.js"
import VariableRegistry           from "../lib/VariableRegistry.js"

/* First, we declare CSS variables we will use
 * for certain scales.  These allow the user of the raw .CSS to change
 * them without having to use the Melange code directly. */

const spacingVariables = VariableRegistry.register(
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
const spacingScale = new VariableBasedScaleWithZero(spacingVariables)

/** We want negative spacings to be relfective of the chosen scale for
 * spacings, so if we change the scale above, this one will automatically be
 * reflected correclty
 */
const negativeSpacingVariables = spacingVariables.map( (variable) => {
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
VariableRegistry.registerVariables("negativeSpacing", negativeSpacingVariables)
const negativeSpacingScale = new VariableBasedScale(negativeSpacingVariables)

const fontSizeVariables = VariableRegistry.register(
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
const fontScale = new VariableBasedScale(fontSizeVariables)

const fontFamilyVariables = VariableRegistry.register(
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

const fontFamilies = new VariableBasedScale(fontFamilyVariables)

/** Now, we have literal scales that don't make sense to have as variables,
 * but that we nevertheless want to define as a scale */

const percentageScale = new Scale({
  "10": "10%",
  "20": "20%",
  "30": "30%",
  "40": "40%",
  "50": "50%",
  "60": "60%",
  "70": "70%",
  "80": "80%",
  "90": "90%",
  "100": "100%",
})

const thirdsScale = new Scale({
  "third": "calc(100% / 3)",
  "two-thirds": "calc(100% / 1.5)",
})

export {
  spacingScale,
  negativeSpacingScale,
  fontScale,
  percentageScale,
  thirdsScale,
  fontFamilies,
}
