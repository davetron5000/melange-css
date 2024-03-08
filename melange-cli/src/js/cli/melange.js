#!/usr/bin/env node

import process       from "node:process"
import { parseArgs } from "node:util"

import mediaQueries    from "../melange/mediaQueries.js"
import pseudoSelectors from "../melange/pseudoSelectors.js"
import InputFile       from "./cli-args/InputFile.js"
import OutputFile      from "./cli-args/OutputFile.js"
import MediaQueries    from "./cli-args/MediaQueries.js"
import PseudoSelectors from "./cli-args/PseudoSelectors.js"

import generateCSS     from "./generateCSS.js"

const cliArgs = [
  InputFile,
  OutputFile,
  MediaQueries,
  PseudoSelectors,
]

const parseArgsOptions = Object.fromEntries(cliArgs.map( (argClass) => argClass.toParseArgsOption() ) )

const showHelp = () => {
  console.log("usage: npx melange-css [options]")
  console.log()
  console.log("OPTIONS")
  console.log()
  cliArgs.forEach( (argClass) => {
    console.log("  -%s/%s - %s",argClass.shortField,`--${argClass.field}`.padEnd(18),argClass.description)
    if (argClass.isArray()) {
      console.log("                          [use multiple times for mulitple values]")
    }
  })
  console.log()
  console.log("MEDIA QUERIES")
  console.log()
  mediaQueries.toArray().filter( (mq) => !mq.isDefault() ).forEach( (mediaQuery) => {
    console.log("  %s - %s",mediaQuery.variableNameQualifier().padStart(3," "),mediaQuery.name())
    console.log("        %s",mediaQuery.description())
    console.log("        %s",mediaQuery.toMediaQuery())
    console.log()
  })
  console.log("PSEUDO SELECTORS")
  console.log()
  pseudoSelectors.toArray().filter( (ps) => !ps.isDefault() ).forEach( (pseudoSelector) => {
    console.log("  %s - %s",pseudoSelector.variableNameQualifier.padStart(10," "),pseudoSelector.name)
    console.log("               %s { ... }",pseudoSelector.forSelector(".some-selector"))
    console.log()
  })
}

const firstArg = process.argv[2]

if ( !firstArg             ||
      firstArg == "--help" ||
      firstArg == "-h"     ||
      firstArg == "-help"  ||
      firstArg == "help" ) {

  showHelp()
  process.exit(0)

}

const args = process.argv.slice(2)
const {
  values,
  positionals
} = parseArgs({
  args: args,
  options: parseArgsOptions,
  strict: true,
})

const parsedValues = [
  InputFile,
  OutputFile,
  MediaQueries,
  PseudoSelectors,
].map( (klass) => klass.parse(values) )

const errors = parsedValues.filter( (pv) => pv.hasError() )

if (errors.length > 0) {
  console.log("%d %s in command-line arguments:",errors.length,errors.length == 1 ? "error" : "errors")
  console.log()
  errors.forEach( (error) => {
    console.log("  --%s - %s",error.field.padEnd(18),error.errorMessage)
  })
  console.log()
  console.log("run 'npm melange-css --help' to see usage")
  console.log()
  process.exit(1)
}

const parsedCLIArgs = Object.fromEntries(parsedValues.map( (pv) => [ pv.constructor.field,pv] ))

generateCSS(parsedCLIArgs)
