import MediaQuery from "./MediaQuery.js"
export default class PrefersReducedMotion extends MediaQuery {
  toMediaQuery() {
    return "@media (prefers-reduced-motion: reduce)"
  }
  variableNameQualifier() { return "rm" }
  description() { "Prefers reduced motion (full/regular motion considered default)" }
}
