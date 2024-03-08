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
    const pseudoSelectors = {}

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
    const collectPsuedoSelector = (pseudoSelector) => {
      if (!pseudoSelector.isDefault()) {
        pseudoSelectors[pseudoSelector.selector] = {
          name: pseudoSelector.name,
          variableNameQualifier: pseudoSelector.variableNameQualifier,
        }
      }
    }

    metaTheme.eachCSSClass({
      onMediaQuery: collectMediaQuery,
      onPsuedoSelector: collectPsuedoSelector,
    })

    const object = {
      melangeMetaData: {
        mediaQueries: mediaQueries,
        pseudoSelectors: pseudoSelectors,
      }
    }
    const json = fs.createWriteStream(this.filename)
    json.write(JSON.stringify(object,null,2))

  }

}

