import MetaTheme            from "../lib/MetaTheme.js"

import spacings        from "./groups/spacings.js"
import typography      from "./groups/typography.js"
import display         from "./groups/display.js"
import flex            from "./groups/flex.js"
import widths          from "./groups/widths.js"
import colors          from "./groups/colors.js"
import debugging       from "./groups/debugging.js"
import position        from "./groups/position.js"
import borders         from "./groups/borders.js"
import overflow        from "./groups/overflow.js"
import lists           from "./groups/lists.js"
import visuals         from "./groups/visuals.js"
import background      from "./groups/background.js"
import mediaQueries    from "./mediaQueries.js"
import pseudoSelectors from "./pseudoSelectors.js"

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
  mediaQueries: mediaQueries.toArray(),
  pseudoSelectors: pseudoSelectors.toArray(),
})

export default metaTheme
