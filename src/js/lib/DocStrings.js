/*
 * A wrapper around strings to avoid null checks and array coercions.
 */
export default class DocStrings {
  constructor(docs) {
    this.paragraphs = Array(docs || []).flat()
  }

  hasDocs() { return this.paragraphs.length > 0 }

  forEach(f) {
    this.paragraphs.forEach(f)
  }
}
