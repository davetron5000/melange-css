import fs            from "node:fs";
import { parseArgs } from "node:util";
import process       from "node:process";
import path          from "node:path";
import ejs           from "ejs"

export default class ReferenceDoc {

  summary() { return "Generate Melange website" }

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
        templates: {
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
      console.log("Usage: melange website [options]")
      console.log()
      console.log("OPTIONS")
      console.log()
      console.log("  --dir DIR       - where the doc .html files should be written")
      console.log("  --templates DIR - where the .html templates are")
      console.log("  --force         - If set, will remove existing directory before building")
      console.log("  --help          - show this message")
      console.log()
    }
    else {
      if (!values.dir) {
        console.log("missing --dir")
        process.exit(1)
      } 
      if (!values.templates) {
        console.log("missing --templates")
        process.exit(1)
      } 

      const templates = {
      }
      const templatesRoot = path.resolve(values.templates)

      fs.readdirSync(templatesRoot).forEach((file) => {
        if (file.match(/\.html$/)) {
          const basename = path.basename(file, ".html")
          if (!basename.startsWith("_")) {
            templates[basename] = path.resolve(templatesRoot + "/" + file)
          }
        }
      })

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

      Object.entries(templates).forEach( ([basename, template]) => {
        ejs.renderFile(
          template,
          {
          },
          { 
            root: templatesRoot,
          },
          (err, str) => {
            if (err)  {
              throw err
            }
            const fd = fs.openSync(`${values.dir}/${basename}.html`, "w")
            fs.writeFileSync(fd, str)
            fs.closeSync(fd)
          }
        )
      })
    }
  }
}
