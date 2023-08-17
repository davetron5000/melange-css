export default class HumanizedString {
  constructor(string) {
    this.string = string || ""
    this.humanizedString = this.string.split(" ").map( (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(" ")
  }

  toString() { return this.humanizedString }
}
