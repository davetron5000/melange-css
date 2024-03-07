import ColorTints       from "../../lib/ColorTints.js"
import pseudoSelectors  from "../pseudoSelectors.js"
import mediaQueries     from "../MediaQueries.js"
import VariableRegistry from "../../lib/VariableRegistry.js"

const colorTints = new ColorTints(
  [
    "900",
    "800",
    "700",
    "600",
    "500",
    "400",
    "300",
    "200",
    "100",
  ],
  [
    pseudoSelectors.default,
    pseudoSelectors.hover,
  ],
  [
    ...mediaQueries.onlyBreakpoints(),
    mediaQueries.darkMode,
    mediaQueries.moreContrast,
  ],
)

// https://ghola.dev/?otherColors=triad-lower%2C%230069d5%2C%23F3F331%2C%23EA6C00%2C%2374747B%3AGray%2C%23E30D00&primaryColor=%236937cb%3APurple&compact=false#

colorTints.register(
  "red",
  [
    "#FFFAF9",
    "#FFE7E6",
    "#FFB2AD",
    "#FF6258",
    "#E30D00",
    "#A80A00",
    "#640600",
    "#320300",
    "#1E0200",
  ]
)

colorTints.register(
  "orange",
  [
    "#FFFCF9",
    "#FFF2E6",
    "#FFD4AF",
    "#FFA75C",
    "#EA6C00",
    "#AD5000",
    "#673000",
    "#331800",
    "#1E0E00",
  ]
)


colorTints.register(
  "yellow",
  [
    "#FFFFFB",
    "#FEFEEC",
    "#FCFCC3",
    "#F8F885",
    "#F3F331",
    "#CCCC0C",
    "#797907",
    "#3D3D04",
    "#242402",
  ]
)


colorTints.register(
  "green",
  [
    "#FBFEFC",
    "#EDFAF2",
    "#C5F0D4",
    "#89E0A6",
    "#37CB69",
    "#27984D",
    "#175A2E",
    "#0C2D17",
    "#071B0E",
  ]
)

colorTints.register(
  "blue",
  [
    "#F9FCFF",
    "#E4F1FF",
    "#A9D3FF",
    "#50A6FF",
    "#0069d5",
    "#004E9E",
    "#002E5E",
    "#00172F",
    "#000E1C",
  ]
)

colorTints.register(
  "purple",
  [
    "#FCFBFE",
    "#F2EDFA",
    "#D4C5F0",
    "#A689E0",
    "#6937cb",
    "#4D2798",
    "#2E175A",
    "#170C2D",
    "#0E071B",
  ]
)
colorTints.register(
  "gray",
  [
    "#FCFCFC",
    "#F2F2F3",
    "#D7D7D9",
    "#ADADB1",
    "#74747B",
    "#56565B",
    "#333336",
    "#1A1A1B",
    "#0F0F10",
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
