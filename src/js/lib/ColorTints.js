import CSSClassTemplate                          from "./CSSClassTemplate.js"
import Step                    from "./scales/Step.js"
import Scale                    from "./scales/Scale.js"
import VariableBasedScale              from "./scales/VariableBasedScale.js"
import DefaultPseudoSelector from "./DefaultPseudoSelector.js"
  import PseudoSelector from "./PseudoSelector.js"
import { ExampleTemplate }                       from "./ExampleTemplate.js"
import VariableRegistry                       from "./VariableRegistry.js"
import MetaProperty from "./MetaProperty.js"
import MetaPropertyGrouping    from "./MetaPropertyGrouping.js"

const pseudoSelectors = [
  new DefaultPseudoSelector(),
  new PseudoSelector({ variableNameQualifier: "hover",selector: "hover"}),
]

class ColorExampleTemplate extends ExampleTemplate {
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

export default class ColorTints {
  static DEFAULT_TINTNAMES = [
    "lightest",
    "light",
    "",
    "dark",
    "darkest",
  ]
  constructor(tintNames) {
    this.tintNames = tintNames || ColorTints.DEFAULT_TINTNAMES
    this.colorScale = {}
    this.customColors = []
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
    const variables = VariableRegistry.register(colorName,stepNamesAndDefaultValues,`Tints/Shades for ${colorName}`)
    this.colorScale[colorName] = {
      variables: variables,
      tints: tints
    }
    return variables
  }

  registerCustom(colorName, tintNamesAndValues) {
    const metaProperty = new MetaProperty({
      name: colorName,
      enumeratedValues: [ Scale.forLiteralValues(tintNamesAndValues) ],
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
    this.customColors.push(metaProperty)
  }

  asMetaPropertyGrouping() {

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
    }).concat(this.customColors)

    const summarization = []
    metaProperties.forEach( (metaProperty) => {
      summarization.push(`<div style=\"display: flex; align-items: stretch; justify-content: start; margin-bottom: 1rem;\"><h3 style="width: 8rem;"><a style=\"color: black; text-decoration: underline;\" href=\"#${metaProperty.name}\">${metaProperty.name}</a></h3>`)
      metaProperty.cssClassTemplates.forEach( (cssClassTemplate) => {
        metaProperty.enumeratedValues().forEach( (enumeratedValues) => {
          enumeratedValues.eachStep( (enumeratedValue) => {
            const cssClass = cssClassTemplate.toCSSClass(enumeratedValue)
            if (cssClass.propertiesAndValues.color) {
              summarization.push(`<div>
  <div style=\"width: 8rem; height: 4rem; background-color: ${cssClass.propertiesAndValues.color}\">
  &nbsp;
  </div>
  <div><code>${cssClass.selector}</code></div>
</div>`)
            }
          })
        })
      })
      summarization.push("</div>")
    })
    return new MetaPropertyGrouping({
      name: "colors",
      metaProperties: metaProperties,
      docs: [
        "All colors can be used for text, borders, or backgrounds by using the color name and tint on its own (for text), with <code>b--</code> (for borders), or <code>bg-</code> (for backgrounds).  Hover styles are available by prefixing <code>hover-</code> in front of the class",
      ],
      summarization: summarization.join("\n")
    })
  }
}
