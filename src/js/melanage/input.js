import {
  DocBuilder,
  CSSBuilder
} from "./builders.js"

import { metaTheme } from "./melange.js"

metaTheme.checkForDupes()

const cssBuilder = new CSSBuilder()
const docBuilder = new DocBuilder()

cssBuilder.writeCSS("melange.css", metaTheme)
docBuilder.writeDocs(metaTheme)

