import MetaTheme         from "../lib/MetaTheme.js"
import DefaultBreakpoint from "../lib/breakpoints/DefaultBreakpoint.js"
import Breakpoint        from "../lib/breakpoints/Breakpoint.js"

import spacings    from "./groups/spacings.js"
import typography  from "./groups/typography.js"
import display     from "./groups/display.js"
import widths      from "./groups/widths.js"
import colors      from "./groups/colors.js"
import debugging   from "./groups/debugging.js"
import position    from "./groups/position.js"
import borders     from "./groups/borders.js"


const breakpoints = [
  new DefaultBreakpoint(),
  new Breakpoint({name: "Not Small", variableNameQualifier: "ns", minWidth: "30em"}),
  new Breakpoint({name: "Medium", variableNameQualifier: "m",  minWidth: "30em", maxWidth: "60em"}),
  new Breakpoint({name: "Large", variableNameQualifier: "l",  minWidth: "60em"}),
]

const metaTheme = new MetaTheme({
  metaPropertyGroupings: [
    spacings,
    widths,
    position,
    typography,
    display,
    colors,
    debugging,
    borders,
  ],
  breakpoints: breakpoints,
})

export default metaTheme
