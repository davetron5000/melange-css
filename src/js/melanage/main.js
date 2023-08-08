import DocBuilder from "./builders/DocBuilder.js"
import CSSBuilder from "./builders/CSSBuilder.js"
import melange from "./melange.js"

melange.checkForDupes()

const cssBuilder = new CSSBuilder()
const docBuilder = new DocBuilder()

cssBuilder.writeCSS("melange.css", melange)
docBuilder.writeDocs(melange)

