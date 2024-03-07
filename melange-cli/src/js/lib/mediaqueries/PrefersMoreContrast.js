
import MediaQuery from "./MediaQuery.js"
export default class PrefersMoreContrast extends MediaQuery {
  name() { return "High Contrast" }
  toMediaQuery() {
    return "@media (prefers-contrast: more)"
  }
  variableNameQualifier() { return "hc" }
  description() { return "Prefers more contrast (Browser and HTML-configured contrast is the default)" }
}
