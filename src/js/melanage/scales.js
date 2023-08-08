import { MelangeVariable }            from "../lib/MelangeVariable.js"
import VariableBasedEnumeratedValues from "../lib/scales/VariableBasedEnumeratedValues.js"
import VariableBasedEnumeratedValuesWithZero from "../lib/scales/VariableBasedEnumeratedValuesWithZero.js"
import LiteralEnumeratedValues from "../lib/scales/LiteralEnumeratedValues.js"

import { spacings, negativeSpacings, fontSizes, fontFamily } from "./variables.js"
const spacingFixedScale = new VariableBasedEnumeratedValuesWithZero(spacings)
const negativeSpacingFixedScale = new VariableBasedEnumeratedValues(negativeSpacings)
const fontScale = new VariableBasedEnumeratedValues(fontSizes)
const fontFamilies = new VariableBasedEnumeratedValues(fontFamily)
const percentageScale = new LiteralEnumeratedValues({
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

const autoScale = new LiteralEnumeratedValues({
  "auto": "auto",
})

const thirdsScale = new LiteralEnumeratedValues({
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
