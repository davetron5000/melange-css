import DocStrings from "./DocStrings.js"

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
   */
  constructor({name, metaProperties, docs, summarization}) {
    this.name           = name
    this.slug           = name.replaceAll(/[\s\*\.\"\']/g,"-").toLowerCase()
    this.metaProperties = metaProperties
    this.docs           = new DocStrings(docs)
    this.summarization  = summarization
  }
  /*
   * Create a MetaPropertyGrouping that contains a single MetaProperty
   */
  static singleton(metaProperty) {
    return new MetaPropertyGrouping({ name: metaProperty.name, metaProperties: [ metaProperty ]})
  }
}
