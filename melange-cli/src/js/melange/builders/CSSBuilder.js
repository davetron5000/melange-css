import fs               from "node:fs"
import VariableRegistry from "../../lib/VariableRegistry.js"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default class CSSBuilder {
  constructor({filename, writeVariables, writeCSS, writeReset, omitMediaQueries, onlyMediaQueries}) {
    this.filename         = filename
    this.writeVariables   = writeVariables
    this.writeCSS         = writeCSS
    this.writeReset       = writeReset
    this.omitMediaQueries = omitMediaQueries || []
    this.onlyMediaQueries = onlyMediaQueries || []
  }

  build(metaTheme) {
    const css = fs.createWriteStream(this.filename)
    let skippingThisMediaQuery = false

    const writeCSSClass = (cssClass) => {
      if (skippingThisMediaQuery) {
        return
      }
      css.write(cssClass.toCSS())
      css.write("\n")
    }
    const startMediaQuery = (mediaQuery) => {
      if (this._skipMediaQuery(mediaQuery)) {
        skippingThisMediaQuery = true
        return
      }
      skippingThisMediaQuery = false
      if (mediaQuery.toMediaQuery() !== "") {
        css.write(`/*
 * ${mediaQuery.description()}
 */
`)
        css.write(`${mediaQuery.toMediaQuery()} {\n`)
      }
    }
    const endMediaQuery = (mediaQuery) => {
      if (skippingThisMediaQuery) {
        skippingThisMediaQuery = true
        return
      }
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
        if (!variablesSet.derived) {
          css.write("/*\n")
          css.write(` * ${variablesSet.summary}\n *\n`)
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
    return fs.readFileSync(`${__dirname}/../../../css/minimal-reset.css`).toString()
  }

  _skipMediaQuery(mediaQuery) {
    if (this.omitMediaQueries.length != 0) {
      return !!this.omitMediaQueries.find( (mq) => mq.id() == mediaQuery.id() )
    }
    else if (this.onlyMediaQueries.length != 0) {
      return !this.onlyMediaQueries.find( (mq) => mq.id() == mediaQuery.id() )
    }
    else {
      return false
    }
  }
}

