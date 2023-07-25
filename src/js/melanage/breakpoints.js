import { DefaultBreakpoint, Breakpoint }         from "../lib/Breakpoint.js"

const breakpoints = [
  new DefaultBreakpoint(),
  new Breakpoint({variableNameQualifier: "ns", minWidth: "30em"}),
  new Breakpoint({variableNameQualifier: "m",  minWidth: "30em", maxWidth: "60em"}),
  new Breakpoint({variableNameQualifier: "l",  minWidth: "60em"}),
]
export {
  breakpoints
}