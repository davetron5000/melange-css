import mediaQueries from "../../melange/mediaQueries.js"
import CLIArgError  from "./CLIArgError.js"
import DefaultMediaQuery from "../../lib/mediaqueries/DefaultMediaQuery.js"
import ParsedArg    from "./ParsedArg.js"

export default class MediaQueries extends ParsedArg {
  static field       = "mediaQuery"
  static description = "Media Queries to target in output (see values below)"
  static shortField  = "q"
  static isArray() { return true }

  static parse(values) {
    const mediaQueryNames = values[this.field]
    if (mediaQueryNames) {
      const parsedMediaQueries = mediaQueryNames.map( (mediaQueryName) => {
        return mediaQueries.find(mediaQueryName) || `No such media query '${mediaQueryName}'`
      })

      const errors = parsedMediaQueries.filter( (x) => typeof(x) === "string" )
      if (errors.length > 0) {
        return new CLIArgError(this.field, errors.join(","))
      }
      return new MediaQueries(parsedMediaQueries)
    }
    else {
      return new CLIArgError(this.field,"is required")
    }
  }
  constructor(mediaQueries) {
    super()
    this.mediaQueries = mediaQueries
    if (!this.mediaQueries.find( (mq) => mq.isDefault() )) {
      this.mediaQueries = [ new DefaultMediaQuery(), ...this.mediaQueries ]
    }
  }
}
