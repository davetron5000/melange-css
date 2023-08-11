import { parseArgs } from 'node:util';
import process from 'node:process';

import CSSBuilder        from "../melange/builders/CSSBuilder.js"
import melange           from "../melange/melange.js"

export default class CSS {
  summary() {
    return "Generate .css files"
  }
  run(args) {
    const {
      values,
      positionals
    } = parseArgs({
      args: args,
      options: {
        css: {
          type: "string",
        },
        variables: {
          type: "string",
        },
        "no-reset": {
          type: "boolean",
        },
        help : {
          type: "boolean",
          short: "h",
        }
      },
      strict: true,
    })

    if (values.help) {
      console.log("Usage: melange css [options]")
      console.log()
      console.log("OPTIONS")
      console.log()
      console.log("  --css FILENAME                 - name of the .css file to write")
      console.log("  --variables VARIABLES_FILENAME - if specified, write variables to this file instead of the --css file")
      console.log("  --no-reset                     - if set, omit the reset css in the output .css file")
      console.log("  --help                         - show this message")
      console.log()
      console.log("EXAMPLES")
      console.log()
      console.log("  Generate a single file with all variables and styles:")
      console.log()
      console.log("    melange css --css melange.css")
      console.log()
      console.log("  Generate styles in one file, variables in another:")
      console.log()
      console.log("    melange css --css melange-styles.css --variables melange-variables.css")
      console.log()
      console.log("  Generate styles, without the reset, in one file, variables in another:")
      console.log()
      console.log("    melange css --css melange-styles.css --variables melange-variables.css --no-reset")
      console.log()
    }
    else {
      if (!values.css) {
        console.log("missing --css")
        process.exit(1)
      } 
      const builders = []
      if (values.variables) {
        builders.push(new CSSBuilder({
          filename: values.css,
          writeCSS: true,
          writeVariables: false,
          writeReset: values["no-reset"] != true
        }))
        builders.push(new CSSBuilder({
          filename: values.variables,
          writeCSS: false,
          writeVariables: true,
          writeReset: false,
        }))
      }
      else {
        builders.push(new CSSBuilder({
          filename: values.css,
          writeCSS: true,
          writeVariables: true,
          writeReset: values["no-reset"] != true
        }))
      }
      melange.checkForDupes()
      builders.forEach( (builder) => {
        builder.build(melange)
      })
    }
  }
}
