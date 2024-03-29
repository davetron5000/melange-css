import { parseArgs } from 'node:util';
import process from 'node:process';

import CSSBuilder        from "../melange/builders/CSSBuilder.js"
import MetaDataBuilder   from "../melange/builders/MetaDataBuilder.js"
import mediaQueries      from "../melange/MediaQueries.js"
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
        "no-variables": {
          type: "boolean",
        },
        "meta-data": {
          type: "string",
        },
        "no-reset": {
          type: "boolean",
        },
        "no-media-queries": {
          type: "string",
        },
        "only-media-queries": {
          type: "string",
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
      console.log("  --no-variables                 - if set, variables are not written")
      console.log("  --meta-data MD_FILENAME        - if specified, write some metadata about the design system to the givcen file")
      console.log("  --no-reset                     - if set, omit the reset css in the output .css file")
      console.log("  --no-media-queries QUERIES     - if set, omit the media queries with the given IDs. Comma-delimited list or ALL for all media queries")
      console.log("  --only-media-queries QUERIES   - if set, include only the media queries with the given IDs. Comma-delimited list or ALL for all media queries, DEFAULT for the default media query")
      console.log("  --help                         - show this message")
      console.log()
      console.log("CONFIGURED MEDIA QUERIES")
      console.log()
      const formatted = mediaQueries.toArray(false).map( (mediaQuery) => {
        return { id: mediaQuery.id(), prefix: mediaQuery.variableNameQualifier(), name: mediaQuery.name() }
      })
      console.table(formatted)
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
      if ( values["no-media-queries"] && values["only-media-queries"] ) {
        console.log("You must use --only-media-queries or --no-media-queries, but not both")
        process.exit(1)
      }
      let mediaQueriesInArgs = []
      let mediaQueryPrefixes = values["no-media-queries"] || values["only-media-queries"]
      if ( mediaQueryPrefixes ) {
        if (mediaQueryPrefixes == "ALL") {
          mediaQueriesInArgs = mediaQueries.toArray(false)
        }
        else {
          mediaQueriesInArgs = mediaQueryPrefixes.split(/\s*,\s*/).map( (idOrPrefix) => {
            const mediaQuery = idOrPrefix == "DEFAULT" ? mediaQueries.default : mediaQueries.find(idOrPrefix)
            if (!mediaQuery) {
              console.log(`No such media query '${idOrPrefix}`)
              process.exit(1)
            }
            return mediaQuery
          })
        }
      }
      let mediaQueriesToOmit = []
      let mediaQueriesToOnlyInclude = []

      if (values["no-media-queries"]) {
        mediaQueriesToOmit = mediaQueriesInArgs
      }
      else {
        mediaQueriesToOnlyInclude = mediaQueriesInArgs
      }

      const builders = []
      builders.push(new CSSBuilder({
        filename: values.css,
        writeCSS: true,
        writeVariables: values["no-variables"] != true,
        writeReset: values["no-reset"] != true,
        omitMediaQueries: mediaQueriesToOmit,
        onlyMediaQueries: mediaQueriesToOnlyInclude,
      }))
      if (values["meta-data"]) {
        builders.push(new MetaDataBuilder({
          filename: values["meta-data"]
        }))
      }
      melange.checkForDupes()
      builders.forEach( (builder) => {
        builder.build(melange)
      })
    }
  }
}
