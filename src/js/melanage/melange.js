import { MetaTheme }   from "../lib/MetaTheme.js"
import { breakpoints } from "./breakpoints.js"
import { spacings }    from "./spacings.js"
import { typography }  from "./typography.js"
import { flex }        from "./flex.js"
import { widths }      from "./widths.js"
import { colors }      from "./colors.js"

const metaTheme = new MetaTheme({
  metaPropertyGroupings: [
    spacings,
    widths,
    typography,
    flex,
    colors,
  ],
  breakpoints: breakpoints,
})

export {
  metaTheme,
}
