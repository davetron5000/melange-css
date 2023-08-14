import MediaQuery from "./MediaQuery.js"
export default class PrefersDarkMode extends MediaQuery {
  name() { return "Dark Mode" }
  toMediaQuery() {
    return "@media (prefers-color-scheme: dark)"
  }
  variableNameQualifier() { return "dm" }
  description() { return "Prefers dark mode (light mode considered default)" }
}
