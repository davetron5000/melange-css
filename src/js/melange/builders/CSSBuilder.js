import fs               from "node:fs"
import VariableRegistry from "../../lib/VariableRegistry.js"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default class CSSBuilder {
  constructor({filename, writeVariables, writeCSS, writeReset}) {
    this.filename       = filename
    this.writeVariables = writeVariables
    this.writeCSS       = writeCSS
    this.writeReset     = writeReset
  }

  build(metaTheme) {
    const css = fs.createWriteStream(this.filename)

    const writeCSSClass = (cssClass) => {
      css.write(cssClass.toCSS())
      css.write("\n")
    }
    const startMediaQuery = (mediaQuery) => {
      if (mediaQuery.toMediaQuery() !== "") {
        css.write(`/*
 * ${mediaQuery.description()}
 */
`)
        css.write(`${mediaQuery.toMediaQuery()} {\n`)
      }
    }
    const endMediaQuery = (mediaQuery) => {
      if (mediaQuery.toMediaQuery() !== "") {
        css.write("}\n")
      }
    }

    if (this.writeReset) {
      css.write(this._reset())
      css.write("\n")
    }
    if (this.writeVariables) {
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
    }
    if (this.writeCSS) {
      /* Generate CSS */
      metaTheme.eachCSSClass({
        onCSSClass: writeCSSClass,
        onMediaQuery: {
          start: startMediaQuery,
          end:  endMediaQuery,
        },
      })
    }
    css.close()
  }

  _reset() {
    return fs.readFileSync(`${__dirname}/../../../css/necolas-normalize.css`).toString()
  }
}

