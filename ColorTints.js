import { MetaProperty } from "./MetaProperty.js"
import { CSSClassTemplate } from "./CSSClass.js"
import { MelangeVariable } from "./MelangeVariable.js"
import { VariableBasedScale } from "./Scale.js"
import { DefaultPseudoSelector, PseudoSelector } from "./PseudoSelector.js"

class ColorTints {
  static DEFAULT_TINTNAMES = [
    "-lightest",
    "-light",
    "",
    "-dark",
    "-darkest",
  ]
  constructor(tintNames) {
    this.tintNames = tintNames || ColorTints.DEFAULT_TINTNAMES
    this.colorScale = {}
  }

  register(colorName, tints) {
    if (this.colorScale[colorName]) {
      throw `Color '${colorName}' has already been registered`
    }
    if (tints.length != this.tintNames.length) {
      throw `registerColorTints requires that tints be exactly ${this.tintNames.length} in size.  Got ${tints.length} instead`
    }
    const stepNamesAndDefaultValues = Object.fromEntries(tints.map( (tint, index) => {
      return [ this.tintNames[index], tint ]
    }))
    const variables = MelangeVariable.register(colorName,stepNamesAndDefaultValues)
    this.colorScale[colorName] = {
      variables: variables,
      tints: tints
    }
    return variables
  }

  asMetaProperties() {
    const pseudoSelectors = [
      new DefaultPseudoSelector(),
      new PseudoSelector({ variableNamePrefix: "hover",selector: "hover"}),
    ]

    return Array.from(Object.entries(this.colorScale)).map( ([colorName, { variables, tints }]) => {
      return new MetaProperty({
        name: colorName,
        enumeratedValues: [ new VariableBasedScale(variables) ],
        pseudoSelectors: pseudoSelectors,
        cssClassTemplates: [
          new CSSClassTemplate(colorName, "color"),
          new CSSClassTemplate(`bg-${colorName}`, "background-color"),
          new CSSClassTemplate(`b--${colorName}`, "border-color"),
        ]
      })
    })
  }
}
export {
  ColorTints
}
