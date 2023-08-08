import fs               from "node:fs"
import VariableRegistry from "../../lib/VariableRegistry.js"

export default class CSSBuilder {
  writeCSS(filename, metaTheme) {
    const writeCSSClass = (cssClass) => {
      css.write(cssClass.toCSS())
      css.write("\n")
    }
    const startBreakpoint = (breakpoint) => {
      if (breakpoint.toMediaQuery() !== "") {
        css.write(`${breakpoint.toMediaQuery()} {\n`)
      }
    }
    const endBreakpoint = (breakpoint) => {
      if (breakpoint.toMediaQuery() !== "") {
        css.write("}\n")
      }
    }
    const css = fs.createWriteStream("melange.css")
    css.write(":root {\n")
    VariableRegistry.eachSetOfVariables( (baseName,variablesSet) => {
      if (variablesSet.documentation) {
        css.write("/*\n")
        css.write(` * ${baseName}\n *\n`)
        if (variablesSet.documentation) {
          css.write(` * ${variablesSet.documentation}\n`)
        }
        css.write(" */\n")

        Object.values(variablesSet.variables).forEach( (melangeVariable) => {
          const property = melangeVariable.toCSSProperty()
          if (property) {
            css.write(melangeVariable.toCSSProperty())
            css.write("\n")
          }
        })
        css.write("\n")
      }
    })
    css.write("}\n")
    /* Generate CSS */
    metaTheme.eachCSSClass({
      onCSSClass: writeCSSClass,
      onBreakpoint: {
        start: startBreakpoint,
        end:  endBreakpoint,
      },
    })
    css.close()
  }
}

