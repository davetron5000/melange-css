import fs from "node:fs"
import CSSClass from "../lib/CSSClass.js"

const SELECTOR_REGEXP       = /^\.([^\s,:]+)\s*\{\s*$/
const SELECTOR_END_REGEXP   = /^\s*\}\s*$/
const PROPERTY_VALUE_REGEXP = /^\s*([^\s:]+)\s*:\s*(.*)$/
const BLANK_REGEXP          = /^\s*$/
const COMMENT_START_REGEXP  = /^\s*\/\*.*$/
const COMMENT_REGEXP        = /^\s*\*.*$/
const COMMENT_STOP_REGEXP   = /^.*\*\/\s*$/

class ParseError {
  constructor(line,lineNumber,errorMessage) {
    this.line         = line
    this.lineNumber   = lineNumber
    this.errorMessage = errorMessage
  }
  toString() {
    return `line ${this.lineNumber}: ${this.errorMessage}\n\n${this.line}`
  }
}

class ParsedCSS {
  constructor(cssClasses) {
    this.cssClasses = cssClasses
  }
}

const parse = (input) => {
  const css = fs.readFileSync(input.filename).toString().split(/\n/)
  let cssClasses = []
  let currentSelector
  let currentProperties = {}

  css.forEach( (line,index) => {

    if (BLANK_REGEXP.test(line) ||
        COMMENT_START_REGEXP.test(line) ||
        COMMENT_REGEXP.test(line) ||
        COMMENT_STOP_REGEXP.test(line)) {
      return
    }

    if (currentSelector) {
      if (SELECTOR_END_REGEXP.test(line)) {
        cssClasses.push(new CSSClass({selector: currentSelector, propertiesAndValues: currentProperties}))
        currentSelector = null
        currentProperties = {}
      }
      else {
        const parsed = PROPERTY_VALUE_REGEXP.exec(line)
        if (parsed && parsed[1] && parsed[2]) {
          const property = parsed[1]
          const value = parsed[2].replace(/;$/,"")

          currentProperties[property] = value
        }
        else {
          throw new ParseError(line,index+1,"Cannot parse as property/value assignment")
        }
      }
    }
    else {
      const result = SELECTOR_REGEXP.exec(line)
      if (result && result[1]) {
        currentSelector = result[1]
      }
      else {
        throw new ParseError(line,index+1,"Cannot parse as selector")
      }
    }
  })
  return new ParsedCSS(cssClasses)
}

class OutputCSS {
  constructor(filename) {
    this.filename = filename
  }

  start() {
    if (this.fd) {
      throw "Already started"
    }
    this.fd = fs.openSync(this.filename,"w")
  }

  forMediaQuery(mediaQuery, code) {
    this.currentMediaQuery = mediaQuery
    if (!mediaQuery.isDefault()) {
      fs.writeSync(this.fd, `${mediaQuery.toMediaQuery()} {\n`)
    }
    code()
    if (!mediaQuery.isDefault()) {
      fs.writeSync(this.fd, "}\n")
    }
    this.currentMediaQuery = null
  }
  writeClass(cssClass,pseudoSelector) {

    if (!this.currentMediaQuery) {
      throw "writeClass must be called inside forMediaQuery"
    }

    cssClass.
      forSelector(pseudoSelector).
      atMediaQuery(this.currentMediaQuery).
      toCSS().
      split(/\n/).
      forEach( (line) => {
        if (!this.currentMediaQuery.isDefault()) {
          fs.writeSync(this.fd,"  ")
        }
        fs.writeSync(this.fd,line)
        fs.writeSync(this.fd,"\n")
      })
    fs.writeSync(this.fd,"\n")
  }

  done() {
    if (this.fd) {
      fs.closeSync(this.fd)
    }
  }

}

const generateCSS = ({input,output,mediaQuery,pseudoSelector}) => {

  if (!input)                                        { throw "input is required" }
  if (!output)                                       { throw "output is required" }
  if (!mediaQuery || mediaQuery.length == 0)         { throw "mediaQueries is required" }
  if (!pseudoSelector || pseudoSelector.length == 0) { throw "pseudoSelectors is required" }

  try {
    const parsedCSS = parse(input)
    const outputCSS = new OutputCSS(output.filename)
    outputCSS.start()
    mediaQuery.mediaQueries.forEach( (mq) => {
      outputCSS.forMediaQuery(mq, () => {
        pseudoSelector.pseudoSelectors.forEach( (ps) => {
          parsedCSS.cssClasses.forEach( (c) => {
            outputCSS.writeClass(c,ps)
          })
        })
      })
    })
    outputCSS.done()
  }
  catch (e) {
    if (e instanceof ParseError) {
      console.error(e.toString())
    }
    else {
      console.log(e)
    }
  }
}

export default generateCSS;
