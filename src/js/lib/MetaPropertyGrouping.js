import DocStrings from "./DocStrings.js"

/*
 * A grouping of MetaProperties for the purposes of organization or documentation.
 */
export default class MetaPropertyGrouping {
  constructor({name, metaProperties, docs, summarization}) {
    this.name           = name
    this.slug           = name.replaceAll(/[\s\*\.\"\']/g,"-").toLowerCase()
    this.metaProperties = metaProperties
    this.docs           = new DocStrings(docs)
    this.summarization  = summarization
  }
  static singleton(metaProperty) {
    return new MetaPropertyGrouping({ name: metaProperty.name, metaProperties: [ metaProperty ]})
  }
}
