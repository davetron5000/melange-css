import fs                from "node:fs"
import { dirname }       from "path";
import { fileURLToPath } from "url";

import DocBuilder        from "./builders/DocBuilder.js"
import CSSBuilder        from "./builders/CSSBuilder.js"

import melange           from "./melange.js"

const __dirname = dirname(fileURLToPath(import.meta.url));

melange.checkForDupes()

const monolithicDir        = __dirname + "/../../../dist/monolithic/"
const separateVariablesDir = __dirname + "/../../../dist/separate/"
const docsDir              = __dirname + "/../../../dist/docs/"

fs.mkdirSync(monolithicDir, { recursive: true })
fs.mkdirSync(separateVariablesDir, { recursive: true })
fs.mkdirSync(docsDir, { recursive: true })

const monolithicBuilder = new CSSBuilder({
  filename: monolithicDir + "/melange.css",
  writeVariables: true,
  writeCSS: true,
  writeReset: true
})
monolithicBuilder.build(melange)

const cssOnly = new CSSBuilder({
  filename: separateVariablesDir + "/melange-styles.css",
  writeVariables: false,
  writeCSS: true,
  writeReset: true
})
const varsOnly = new CSSBuilder({
  filename: separateVariablesDir + "/melange-variables.css",
  writeVariables: true,
  writeCSS: false,
  writeReset: false
})
cssOnly.build(melange)
varsOnly.build(melange)

const docBuilder = new DocBuilder({dir: docsDir})
docBuilder.writeDocs(melange)
fs.copyFileSync(monolithicDir + "/melange.css", docsDir + "/melange.css")
