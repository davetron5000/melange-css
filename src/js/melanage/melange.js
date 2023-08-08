import { MetaTheme }   from "../lib/MetaTheme.js"
import { breakpoints } from "./breakpoints.js"
import { spacings }    from "./spacings.js"
import { typography }  from "./typography.js"
import { display }     from "./display.js"
import { widths }      from "./widths.js"
import { colors }      from "./colors.js"
import { debugging }   from "./debugging.js"
import { position }    from "./position.js"

const metaTheme = new MetaTheme({
  metaPropertyGroupings: [
    spacings,
    widths,
    position,
    typography,
    display,
    colors,
    debugging,
  ],
  breakpoints: breakpoints,
})

export {
  metaTheme,
}
