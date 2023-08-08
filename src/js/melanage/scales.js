import VariableBasedScale from "../lib/scales/VariableBasedScale.js"
import VariableBasedScaleWithZero from "../lib/scales/VariableBasedScaleWithZero.js"
import Scale from "../lib/scales/Scale.js"

import { spacings, negativeSpacings, fontSizes, fontFamily } from "./variables.js"
const spacingFixedScale = new VariableBasedScaleWithZero(spacings)
const negativeSpacingFixedScale = new VariableBasedScale(negativeSpacings)
const fontScale = new VariableBasedScale(fontSizes)
const fontFamilies = new VariableBasedScale(fontFamily)
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

const autoScale = new Scale({
  "auto": "auto",
})

const thirdsScale = new Scale({
  "third": "calc(100% / 3)",
  "two-thirds": "calc(100% / 1.5)",
})

export {
  spacingFixedScale,
  negativeSpacingFixedScale,
  fontScale,
  percentageScale,
  autoScale,
  thirdsScale,
  fontFamilies,
}
