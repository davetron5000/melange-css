import DerivedVariable            from "../lib/DerivedVariable.js"
import Scale                      from "../lib/scales/Scale.js"
import VariableBasedScale         from "../lib/scales/VariableBasedScale.js"
import VariableBasedScaleWithZero from "../lib/scales/VariableBasedScaleWithZero.js"
import VariableRegistry           from "../lib/VariableRegistry.js"

/* First, we declare CSS variables we will use
 * for certain scales.  These allow the user of the raw .CSS to change
 * them without having to use the Melange code directly. */

const spacingVariables = VariableRegistry.register(
  "sp",
  [
    "0.25rem",
    "0.5rem",
    "1rem",
    "2rem",
    "4rem",
    "8rem",
    "18rem",
  ],
  "Spacing",
  "Spacing scale for margins, paddings, widths, positions, etc.",
)
const spacingScale = new VariableBasedScaleWithZero(spacingVariables, { name: "Steps" })

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
    baseName: "nsp",
    variable: variable,
    propertyTransform: propertyTransform,
    stepNameTransform: stepNameTransform
  })
})
VariableRegistry.registerVariables("nsp", negativeSpacingVariables) // no docs means this is a derived set
const negativeSpacingScale = new VariableBasedScale(negativeSpacingVariables)

const fontSizeVariables = VariableRegistry.register(
  "fs",
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
  "Font Scale",
  "Font scale, with size 2 being the body font size",

)
const fontScale = new VariableBasedScale(fontSizeVariables, { name: "Modular Scale" })

const fontFamilyVariables = VariableRegistry.register(
  "ff",
  {
    "sans": "Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif",
    "serif": "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
    "mono": "'Nimbus Mono PS', 'Courier New', monospace",
    "cursive": "'Snell Roundhand', 'Segoe Print', 'Bradley Hand', Chilanka, TSCu_Comic, casual, cursive",
    "fantasy": "'Party Let', fantasy",
  },
  "Fonts",
  "Fonts to use for sans, serif, etc.",
)

const fontFamilies = new VariableBasedScale(fontFamilyVariables)

const borderWidthVariables = VariableRegistry.register(
  "bw",
  [
    "0.125rem",
    "0.25rem",
    "0.5rem",
    "1rem",
    "2rem",
  ],
  "Border widths",
  "Border widths",
)
const borderWidthScale = new VariableBasedScaleWithZero(borderWidthVariables)

/** Now, we have literal scales that don't make sense to have as variables,
 * but that we nevertheless want to define as a scale */

const percentageScale = new Scale({
  "10": "10%",
  "20": "20%",
  "30": "30%",
  "third": "calc(100% / 3)",
  "40": "40%",
  "50": "50%",
  "60": "60%",
  "two-thirds": "calc(100% / 1.5)",
  "70": "70%",
  "80": "80%",
  "90": "90%",
  "100": "100%",
}, { name: "Percentages" })

const viewportHeightScale = new Scale({
  "10vh": "10vh",
  "20vh": "20vh",
  "30vh": "30vh",
  "40vh": "40vh",
  "50vh": "50vh",
  "60vh": "60vh",
  "70vh": "70vh",
  "80vh": "80vh",
  "90vh": "90vh",
  "100vh": "100vh",
}, { name: "Percentages of View Height" })
const viewportWidthScale = new Scale({
  "10vw": "10vw",
  "20vw": "20vw",
  "30vw": "30vw",
  "40vw": "40vw",
  "50vw": "50vw",
  "60vw": "60vw",
  "70vw": "70vw",
  "80vw": "80vw",
  "90vw": "90vw",
  "100vw": "100vw",
}, { name: "Percentages of View Width" })

export {
  spacingScale,
  borderWidthScale,
  negativeSpacingScale,
  fontScale,
  percentageScale,
  fontFamilies,
  viewportWidthScale,
  viewportHeightScale,
}
