export default class Anchor {
  constructor(string) {
    this.string = string
    this.anchor = string.replaceAll(/[\s\/\'\"]/g,"-").toLowerCase()
  }

  toString() { return this.anchor }
}
