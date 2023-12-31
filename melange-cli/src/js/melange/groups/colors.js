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



colorTints.register(
  "red",
  [
    "#FEF8F8",
    "#FAD6D4",
    "#F07D77",
    "#E30D00",
    "#790700",
    "#2D0300",
    "#060000",
  ]
)


colorTints.register(
  "orange",
  [
    "#FEFBF8",
    "#FBE6D4",
    "#F4B077",
    "#EA6C00",
    "#7D3A00",
    "#2E1500",
    "#070300",
  ]
)

colorTints.register(
  "yellow",
  [
    "#FFFFF9",
    "#FDFDDC",
    "#F9F991",
    "#F3F331",
    "#82821A",
    "#30300A",
    "#070701",
  ]
)

colorTints.register(
  "green",
  [
    "#F9FDFA",
    "#DAF2E1",
    "#89D6A0",
    "#22B34D",
    "#126029",
    "#07230F",
    "#010502",
  ]
)

colorTints.register(
  "blue",
  [
    "#F9FAFD",
    "#DADFF2",
    "#8999D6",
    "#2240B3",
    "#122260",
    "#070D23",
    "#010205",
  ]
)

colorTints.register(
  "purple",
  [
    "#FAF9FD",
    "#E1DAF2",
    "#A089D6",
    "#4D22B3",
    "#291260",
    "#0F0723",
    "#020105",
  ]
)


colorTints.register(
  "gray",
  [
    "#FBFBFB",
    "#E8E8E9",
    "#B5B5B8",
    "#74747B",
    "#3E3E42",
    "#171718",
    "#030303",
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
