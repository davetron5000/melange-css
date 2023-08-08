export default class DocStrings {
  constructor(docs) {
    this.paragraphs = Array(docs || []).flat()
  }
  forEach(f) {
    this.paragraphs.forEach(f)
  }
}
