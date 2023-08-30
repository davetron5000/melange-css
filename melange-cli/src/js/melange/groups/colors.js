import ColorTints       from "../../lib/ColorTints.js"
import pseudoSelectors  from "../pseudoSelectors.js"
import mediaQueries     from "../MediaQueries.js"
import VariableRegistry from "../../lib/VariableRegistry.js"

const colorTints = new ColorTints(
  [
    "lightest",
    "light",
    "",
    "dark",
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
*/
colorTints.register("gray",   [ "#F6F6F6", "#D5D5D5", "#717171", "#494949", "#2A2A2A" ])
colorTints.register("red",    [ "#FFF4F4", "#FFC7C7", "#DE1E1E", "#921313", "#570C0C" ])
colorTints.register("orange", [ "#FFF5EE", "#FFCAA8", "#ED5C00", "#7E3100", "#4A1D00" ])
colorTints.register("yellow", [ "#FeF6DD", "#FECF49", "#AA8630", "#5C4619", "#35280F" ])
colorTints.register("green",  [ "#ECFAED", "#9FE582", "#409D44", "#225324", "#143015" ])
colorTints.register("blue",   [ "#EFF8FC", "#B1DBEF", "#0077B2", "#004E74", "#002D43" ])
colorTints.register("purple", [ "#F4F6FE", "#D0D2F7", "#6167C9", "#46427C", "#2B2643" ])

const blacks = VariableRegistry.register("black",
  {
    "": "#000000",
    "ish": "#151515",
  },
  "Black",
  "Blacks",
  "Color")
const whites = VariableRegistry.register("white",
  {
    "": "#FFFFFF",
    "ish": "#F8F8F8",
  },
  "White",
  "Whites",
  "Color")
colorTints.registerCustom("black", blacks)
colorTints.registerCustom("white", whites)

const colors = colorTints.asMetaPropertyGrouping()

export default colors
