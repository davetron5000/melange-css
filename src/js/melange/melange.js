import MetaTheme         from "../lib/MetaTheme.js"
import DefaultMediaQuery from "../lib/mediaqueries/DefaultMediaQuery.js"
import Breakpoint        from "../lib/mediaqueries/Breakpoint.js"

import spacings    from "./groups/spacings.js"
import typography  from "./groups/typography.js"
import display     from "./groups/display.js"
import flex        from "./groups/flex.js"
import widths      from "./groups/widths.js"
import colors      from "./groups/colors.js"
import debugging   from "./groups/debugging.js"
import position    from "./groups/position.js"
import borders     from "./groups/borders.js"
import overflow    from "./groups/overflow.js"
import lists       from "./groups/lists.js"
import visuals     from "./groups/visuals.js"
import background  from "./groups/background.js"


const mediaQueries = [
  new DefaultMediaQuery(),
  new Breakpoint({name: "Not Small", variableNameQualifier: "ns", minWidth: "30em", description: "Screens that are larger than mobile sized"}),
  new Breakpoint({name: "Medium", variableNameQualifier: "m",  minWidth: "30em", maxWidth: "60em", description: "Screens larger than the mobile size but smaller than what is considered large"}),
  new Breakpoint({name: "Large", variableNameQualifier: "l",  minWidth: "60em", description: "Screens larger than both the mobile size and the medium size"}),
]

const metaTheme = new MetaTheme({
  metaPropertyGroupings: [
    spacings,
    widths,
    position,
    typography,
    display,
    flex,
    colors,
    debugging,
    borders,
    overflow,
    lists,
    visuals,
    background,
  ],
  mediaQueries: mediaQueries,
})

export default metaTheme
