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
  [ // Based on Tachyons
    "0.25rem",
    "0.5rem",
    "1rem",
    "2rem",
    "4rem",
    "8rem",
    "12rem", // not in Tachyons
    "16rem", // Tachyons has 18
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

const doubleSpacingVariables = spacingVariables.map( (variable) => {
  const propertyTransform = (variable) => {
    return `calc(2 * var(${variable._variableName()}))`
  }
  const stepNameTransform = (stepName) => {
    return `${stepName}`
  }
  return new DerivedVariable({
    baseName: "nsp",
    variable: variable,
    propertyTransform: propertyTransform,
    stepNameTransform: stepNameTransform
  })
})
VariableRegistry.registerVariables("2xsp", doubleSpacingVariables) // no docs means this is a derived set
const doubleSpacingScale = new VariableBasedScale(doubleSpacingVariables)

const fontSizeVariables = VariableRegistry.register(
  "fs",
  [ // based on Tachyons'
    "0.875rem",
    "1rem",
    "1.25rem",
    "1.5rem",
    "2.25rem",
    "3rem",
    "4.25rem", // not in Tachyons
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

const leadingVariables = VariableRegistry.register(
  "lh",
  {
    "solid": "1",
    "title": "1.25",
    "copy": "1.5",
  },
  "Leading",
  "Leading or line-heights"
)

const leadingScale = new VariableBasedScale(leadingVariables)

const trackingVariables = VariableRegistry.register(
  "ls",
  {
    "": "0.1em",
    "tight": "-0.05em",
    "mega": "0.25em",
    "none": "normal",
  },
  "Tracking",
  "Tracking or letter-spacing"
)

const trackingScale = new VariableBasedScale(trackingVariables)

const indentVariables = VariableRegistry.register(
  "ident",
  {
    "1": "1em",
    "2": "1.5em",
    "3": "2em",
    "-1": "-1em",
    "-2": "-1.5em",
    "-3": "-2em",
  },
  "Indent",
  "Indent"
)

const indentScale = new VariableBasedScaleWithZero(indentVariables)

const measureVariables = VariableRegistry.register(
  "tw",
  {
    "": "60ch",
    "wide": "75ch",
    "narrow": "50ch",
  },
  "Measure",
  "Width for reading text"
)

const measureScale = new VariableBasedScale(measureVariables)

/** Now, we have literal scales that don't make sense to have as variables,
 * but that we nevertheless want to define as a scale */

const percentageScale = new Scale({
  "10": "10%",
  "20": "20%",
  "25": "25%",
  "30": "30%",
  "third": "calc(100% / 3)",
  "40": "40%",
  "50": "50%",
  "60": "60%",
  "two-thirds": "calc(100% / 1.5)",
  "70": "70%",
  "75": "75%",
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
  doubleSpacingScale,
  fontScale,
  percentageScale,
  fontFamilies,
  viewportWidthScale,
  viewportHeightScale,
  leadingScale,
  trackingScale,
  indentScale,
  measureScale,
}
