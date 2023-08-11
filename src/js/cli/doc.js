import DocBuilder from "../melange/builders/DocBuilder.js"
import fs from "node:fs";
import { parseArgs } from "node:util";
import process from "node:process";
import melange    from "../melange/melange.js"

export default class Doc {
  summary() { return "Generate reference documentation" }
  run(args) {
    const {
      values,
      positionals
    } = parseArgs({
      args: args,
      options: {
        dir: {
          type: "string",
        },
        force: {
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
      console.log("  --dir DIR - where the doc .html files should be written")
      console.log("  --force   - If set, will remove existing directory before building")
      console.log("  --help    - show this message")
      console.log()
    }
    else {
      if (!values.dir) {
        console.log("missing --dir")
        process.exit(1)
      } 

      if (fs.existsSync(values.dir)) {
        if (values.force) {
          console.log(`${values.dir} exists. Removing since --force was specified`)
          fs.rmSync(values.dir, {recursive: true, force: true})
        }
        else {
          console.log(`${values.dir} exists. Aborting. Use --force to remove`)
          process.exit(2)
        }
      }
      fs.mkdirSync(values.dir, {recursive: true})

      const builder = new DocBuilder({dir: values.dir})
      melange.checkForDupes()
      builder.build(melange)
    }
  }
}
