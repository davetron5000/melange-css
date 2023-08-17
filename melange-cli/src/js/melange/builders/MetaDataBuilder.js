import fs               from "node:fs"
import VariableRegistry from "../../lib/VariableRegistry.js"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default class MetaDataBuilder {
  constructor({filename}) {
    this.filename       = filename
  }

  build(metaTheme) {
    const mediaQueries = {}

    const collectMediaQuery = (mediaQuery) => {
      mediaQueries[mediaQuery.id()] = {
        name: mediaQuery.name(),
        isDefault: mediaQuery.isDefault(),
        variableNameQualifier: mediaQuery.variableNameQualifier(),
        mediaQuery: mediaQuery.toMediaQuery(),
      }
      if (mediaQuery.isBreakpoint()) {
        mediaQueries[mediaQuery.id()].breakpoint = {
          minWidth: mediaQuery.minWidth,
          maxWidth: mediaQuery.maxWidth,
        }
      }
    }
    metaTheme.eachCSSClass({
      onMediaQuery: collectMediaQuery,
    })
    const css = fs.createWriteStream(this.filename)

    css.write(`{\n  "melangeMetaData": {\n`)
    css.write(`  "mediaQueries": ${JSON.stringify(mediaQueries,null,6)}\n`)
    css.write("  }\n}")

  }

}

