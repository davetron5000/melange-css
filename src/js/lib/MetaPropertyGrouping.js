import DocStrings        from "./DocStrings.js"
import DefaultMediaQuery from "./mediaqueries/DefaultMediaQuery.js"

/*
 * A grouping of MetaProperties for the purposes of organization or documentation.
 */
export default class MetaPropertyGrouping {
  /*
   * name - a human-friendly name fo this group
   * metaProperties - an array of one or more MetaProperty instances
   * docs - an array of strings that document this grouping, if needed.
   * summarization - Raw HTML that is just plopped into the page when documentation is generated.
   *                 The idea is that this can summarize the styles.  See the colors for an example.
   * mediaQueries - an array of MediaQuery instances that should apply to this grouping.  This is used
   *                to allow colors to take advantage of dark mode, but not spacings (for example).
   */
  constructor({name, metaProperties, docs, summarization, mediaQueries}) {
    this.name           = name
    this.slug           = name.replaceAll(/[\s\*\.\"\']/g,"-").toLowerCase()
    this.metaProperties = metaProperties
    this.docs           = new DocStrings(docs)
    this.summarization  = summarization
    this.mediaQueries   = mediaQueries || [ new DefaultMediaQuery() ]
  }

  supportsMediaQuery(mediaQuery) {
    const index = this.mediaQueries.findIndex((mq) => mq.variableNameQualifier() === mediaQuery.variableNameQualifier())
    return index != -1
  }
  /*
   * Create a MetaPropertyGrouping that contains a single MetaProperty
   */
  static singleton(metaProperty) {
    return new MetaPropertyGrouping({ name: metaProperty.name, metaProperties: [ metaProperty ]})
  }
}
