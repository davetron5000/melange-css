import { MetaProperty, MetaPropertyGrouping }    from "./MetaProperty.js"
import { CSSClassTemplate }                      from "./CSSClass.js"
import { MelangeVariable }                       from "./MelangeVariable.js"
import { VariableBasedScale }                    from "./Scale.js"
import { ExampleTemplate }                       from "./ExampleTemplate.js"
import { DefaultPseudoSelector, PseudoSelector } from "./PseudoSelector.js"

class ColorExampleTemplate extends ExampleTemplate {
  _htmlForDocs(selector, _content) {
    return `<div class=\"${selector}\"> This is text using ${selector} </div>`
  }
  _markupForRendering(htmlForDocs) {
    const spaced = htmlForDocs.replace("<div ","<div style=\"width: 20rem; border: dotted thin #888; padding: 1rem; background-color: COLOR\" ")
    const black = spaced.replace("COLOR","#000")
    const white = spaced.replace("COLOR","#fff")
    return `<div style="display:flex; gap: 0.25rem;">
  ${black}${white}
</div>`
  }
}

class BackgroundColorExampleTemplate extends ColorExampleTemplate {
  _markupForRendering(htmlForDocs) {
    const spaced = htmlForDocs.replace("<div ","<div style=\"width: 20rem; border: dotted thin #888; padding: 1rem; color: COLOR\" ")
    const black = spaced.replace("COLOR","#000")
    const white = spaced.replace("COLOR","#fff")
    return `<div style="display:flex; gap: 0.25rem;">
  ${black}${white}
</div>`
  }
}

class BorderColorExampleTemplate extends ColorExampleTemplate {
  _markupForRendering(htmlForDocs) {
    const spaced = htmlForDocs.replace("<div ","<div style=\"width: 20rem; border-style: solid; border-width: thick; padding: 1rem; background-color: BG_COLOR; color: COLOR;\" ")
    const black = spaced.replace("BG_COLOR","#000").replace("COLOR","#fff")
    const white = spaced.replace("BG_COLOR","#fff").replace("COLOR","#000")
    return `<div style="display:flex; gap: 0.25rem;">
${black}${white}
  </div>`
  }
}

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
    const variables = MelangeVariable.register(colorName,stepNamesAndDefaultValues,`Tints/Shades for ${colorName}`)
    this.colorScale[colorName] = {
      variables: variables,
      tints: tints
    }
    return variables
  }

  asMetaPropertyGrouping() {
    const pseudoSelectors = [
      new DefaultPseudoSelector(),
      new PseudoSelector({ variableNameQualifier: "hover",selector: "hover"}),
    ]

    const metaProperties = Array.from(Object.entries(this.colorScale)).map( ([colorName, { variables, tints }]) => {
      return new MetaProperty({
        name: colorName,
        enumeratedValues: [ new VariableBasedScale(variables) ],
        pseudoSelectors: pseudoSelectors,
        cssClassTemplates: [
          new CSSClassTemplate(colorName, "color",{
            exampleTemplate: new ColorExampleTemplate(),
          }),
          new CSSClassTemplate(`bg-${colorName}`, "background-color", {
            exampleTemplate: new BackgroundColorExampleTemplate(),
          }),
          new CSSClassTemplate(`b--${colorName}`, "border-color", {
            exampleTemplate: new BorderColorExampleTemplate(),
          }),
        ]
      })
    })
    return new MetaPropertyGrouping({ name: "colors", metaProperties: metaProperties})
  }
}
export {
  ColorTints
}
