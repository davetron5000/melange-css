import DefaultMediaQuery    from "../lib/mediaqueries/DefaultMediaQuery.js"
import Breakpoint           from "../lib/mediaqueries/Breakpoint.js"
import PrefersReducedMotion from "../lib/mediaqueries/PrefersReducedMotion.js"
import PrefersDarkMode      from "../lib/mediaqueries/PrefersDarkMode.js"

class MediaQueries {
  constructor() {
    this.default = new DefaultMediaQuery()
    this.breakpoints = [
      new Breakpoint({name: "Not Small", variableNameQualifier: "ns", minWidth: "30em", description: "Screens that are larger than mobile sized"}),
      new Breakpoint({name: "Medium", variableNameQualifier: "m",  minWidth: "30em", maxWidth: "60em", description: "Screens larger than the mobile size but smaller than what is considered large"}),
      new Breakpoint({name: "Large", variableNameQualifier: "l",  minWidth: "60em", description: "Screens larger than both the mobile size and the medium size"}),
    ]
    this.darkMode = new PrefersDarkMode()
    this.reducedMotion = new PrefersReducedMotion()
  }

  onlyBreakpoints() {
    return [
      this.default,
      ...this.breakpoints,
    ]
  }

  toArray() {
    return [
      ...this.onlyBreakpoints(),
      this.darkMode,
      this.reducedMotion,
    ]
  }
}

const mediaQueries = new MediaQueries()

export default mediaQueries
