import DefaultMediaQuery    from "../lib/mediaqueries/DefaultMediaQuery.js"
import Breakpoint           from "../lib/mediaqueries/Breakpoint.js"
import PrefersReducedMotion from "../lib/mediaqueries/PrefersReducedMotion.js"
import PrefersDarkMode      from "../lib/mediaqueries/PrefersDarkMode.js"
import PrefersMoreContrast  from "../lib/mediaqueries/PrefersMoreContrast.js"

class MediaQueries {
  constructor() {
    this.default = new DefaultMediaQuery()
    this.breakpoints = [
      new Breakpoint({
        name: "Not Small Width",
        variableNameQualifier: "ns",
        minWidth: "30em",
        description: "Screens that are larger than mobile sized"
      }),
      new Breakpoint({
        name: "Medium Width",
        variableNameQualifier: "m",
        minWidth: "30em",
        maxWidth: "60em",
        description: "Screens larger than the mobile size but smaller than what is considered large (e.g. tablets)"
      }),
      new Breakpoint({
        name: "Large Width",
        variableNameQualifier: "l",
        minWidth: "60em",
        description: "Screens larger than the medium size (e.g. desktops)"
      }),
    ]
    this.darkMode = new PrefersDarkMode()
    this.reducedMotion = new PrefersReducedMotion()
    this.moreContrast = new PrefersMoreContrast()
  }

  onlyBreakpoints(includeDefault=true) {
    if (includeDefault) {
      return [
        this.default,
        ...this.breakpoints,
      ]
    }
    else {
      return this.breakpoints
    }
  }

  toArray(includeDefault=true) {
    return [
      ...this.onlyBreakpoints(includeDefault),
      this.darkMode,
      this.reducedMotion,
      this.moreContrast,
    ]
  }

  find(idOrVariableNameQualifier) {
    return this.toArray().find( (mediaQuery) => {
      return (mediaQuery.id()                    == idOrVariableNameQualifier) ||
             (mediaQuery.variableNameQualifier() == idOrVariableNameQualifier)
    })
  }
}

const mediaQueries = new MediaQueries()

export default mediaQueries
