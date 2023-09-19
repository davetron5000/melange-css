import ColorTints       from "../../lib/ColorTints.js"
import pseudoSelectors  from "../pseudoSelectors.js"
import mediaQueries     from "../MediaQueries.js"
import VariableRegistry from "../../lib/VariableRegistry.js"

const colorTints = new ColorTints(
  [
    "lightest",
    "lighter",
    "light",
    "",
    "dark",
    "darker",
    "darkest",
  ],
  [
    pseudoSelectors.default,
    pseudoSelectors.hover,
  ],
  [
    ...mediaQueries.onlyBreakpoints(),
    mediaQueries.darkMode,
  ],
)
/*
colorTints.register("gray",   [ "#F5F5F5", "#ADADAD", "#999999", "#5C5C5C", "#1F1F1F" ])
colorTints.register("red",    [ "#FFDFDF", "#FF8D86", "#FF4136", "#E7040F", "#80211b" ])
colorTints.register("orange", [ "#FFEFE6", "#FFA166", "#FF6300", "#CC4F00", "#803200" ])
colorTints.register("yellow", [ "#FFFBE6", "#FFE766", "#FFD700", "#B39700", "#665600" ])
colorTints.register("green",  [ "#E8F6F1", "#75CBAC", "#19A974", "#0F6546", "#073323" ])
colorTints.register("blue",   [ "#EBF2FC", "#86B2EB", "#357EDD", "#204C85", "#102642" ])
colorTints.register("purple", [ "#EFEAF6", "#8E6BC0", "#5E2CA5", "#421F73", "#261242" ])
colorTints.register("gray",   [ "#F6F6F6", "#D5D5D5", "#717171", "#494949", "#2A2A2A" ])
colorTints.register("red",    [ "#FFF4F4", "#FFC7C7", "#DE1E1E", "#921313", "#570C0C" ])
colorTints.register("orange", [ "#FFF5EE", "#FFCAA8", "#ED5C00", "#7E3100", "#4A1D00" ])
colorTints.register("yellow", [ "#FeF6DD", "#FECF49", "#AA8630", "#5C4619", "#35280F" ])
colorTints.register("green",  [ "#ECFAED", "#9FE582", "#409D44", "#225324", "#143015" ])
colorTints.register("blue",   [ "#EFF8FC", "#B1DBEF", "#0077B2", "#004E74", "#002D43" ])
colorTints.register("purple", [ "#F4F6FE", "#D0D2F7", "#6167C9", "#46427C", "#2B2643" ])
*/

// http://127.0.0.1:8888/?numColors=6&colorHex=%23ff4013&secondaryColorHex=%237b219f&numShades=7&scaleModel=FixedHSLHandCrafted&colorWheel=NuancedHueBased&showColorDetails=true&showContrastInfo=true&bigSwatches=true&secondaryColorChecked=true

colorTints.register(
  "red",
  [
    "#fff7f5",
    "#ffc1b3",
    "#ff8366",
    "#ff3100",
    "#661300",
    "#3d0c00",
    "#290800",
  ]
)
colorTints.register(
  "orange",
  [
    "#fefaf6",
    "#f8d8b9",
    "#f2b273",
    "#e97e16",
    "#5d3209",
    "#381e05",
    "#251404",
  ]
)
colorTints.register(
  "yellow",
  [
    "#fefdf6",
    "#f8f3b9",
    "#f2e773",
    "#e9d816",
    "#5d5609",
    "#383405",
    "#252204",
  ]
)
colorTints.register(
  "green",
  [
    "#f6fef6",
    "#bef8b9",
    "#7df273",
    "#26e916",
    "#0f5d09",
    "#093805",
    "#062504",
  ]
)
colorTints.register(
  "blue",
  [
    "#f6fafe",
    "#b9dbf8",
    "#73b7f2",
    "#1687e9",
    "#09365d",
    "#052038",
    "#041625",
  ]
)
colorTints.register(
  "purple",
  [
    "#fbf7fd",
    "#e4c0f2",
    "#c880e5",
    "#a32cd3",
    "#411254",
    "#270b33",
    "#1a0722",
  ]
)
colorTints.register(
  "gray",
  [
    "#fafafa",
    "#d9d9d9",
    "#b3b3b3",
    "#808080",
    "#333333",
    "#1f1f1f",
    "#141414",
  ]
)

const blacks = VariableRegistry.register("black",
  {
    "": "#000000",
    "ish": "#131313", // try to keep it darker than the darkest gray
  },
  "Black",
  "Blacks",
  "Color")
const whites = VariableRegistry.register("white",
  {
    "": "#FFFFFF",
    "ish": "#FBFBFB", // try to keep brighter that lightest gray
  },
  "White",
  "Whites",
  "Color")
colorTints.registerCustom("black", blacks)
colorTints.registerCustom("white", whites)

const colors = colorTints.asMetaPropertyGrouping()

export default colors
