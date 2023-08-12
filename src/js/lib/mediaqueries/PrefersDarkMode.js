import MediaQuery from "./MediaQuery.js"
export default class PrefersDarkMode extends MediaQuery {
  toMediaQuery() {
    return "@media (prefers-color-scheme: dark)"
  }
  variableNameQualifier() { return "dark" }
  description() { "Prefers dark mode (light mode considered default)" }
}
