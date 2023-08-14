import MediaQuery from "./MediaQuery.js"
export default class PrefersReducedMotion extends MediaQuery {
  name() { return "Reduced Motion" }
  toMediaQuery() {
    return "@media (prefers-reduced-motion: reduce)"
  }
  variableNameQualifier() { return "rm" }
  description() { return "Prefers reduced motion (full/regular motion considered default)" }
}
