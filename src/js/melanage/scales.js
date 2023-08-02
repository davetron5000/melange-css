import { MelangeVariable }            from "../lib/MelangeVariable.js"
import { VariableBasedScale, VariableBasedScaleWithZero, LiteralScale } from "../lib/Scale.js"

import { spacings, fontSizes, fontFamily } from "./variables.js"
const spacingFixedScale = new VariableBasedScaleWithZero(spacings)
const fontScale = new VariableBasedScale(fontSizes)
const fontFamilies = new VariableBasedScale(fontFamily)
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

export {
  spacingFixedScale,
  fontScale,
  percentageScale,
  autoScale,
  thirdsScale,
  fontFamilies,
}
