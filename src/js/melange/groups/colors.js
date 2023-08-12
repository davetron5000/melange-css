import ColorTints      from "../../lib/ColorTints.js"
import pseudoSelectors from "../pseudoSelectors.js"
import mediaQueries    from "../MediaQueries.js"

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
colorTints.register("gray",   [ "#F5F5F5", "#ADADAD", "#999999", "#5C5C5C", "#1F1F1F" ])
colorTints.register("red",    [ "#FFDFDF", "#FF8D86", "#FF4136", "#E7040F", "#80211b" ])
colorTints.register("orange", [ "#FFEFE6", "#FFA166", "#FF6300", "#CC4F00", "#803200" ])
colorTints.register("yellow", [ "#FFFBE6", "#FFE766", "#FFD700", "#B39700", "#665600" ])
colorTints.register("green",  [ "#E8F6F1", "#75CBAC", "#19A974", "#0F6546", "#073323" ])
colorTints.register("blue",   [ "#EBF2FC", "#86B2EB", "#357EDD", "#204C85", "#102642" ])
colorTints.register("purple", [ "#EFEAF6", "#8E6BC0", "#5E2CA5", "#421F73", "#261242" ])
colorTints.registerCustom("black", {"": "#000000", "ish": "#111111"})
colorTints.registerCustom("white", {"": "#FFFFFF", "ish": "#F4F4F4"})

const colors = colorTints.asMetaPropertyGrouping()

export default colors
