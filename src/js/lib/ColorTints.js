import CSSClassTemplate      from "./CSSClassTemplate.js"
import DefaultPseudoSelector from "./DefaultPseudoSelector.js"
import Example               from "./Example.js"
import ExampleTemplate       from "./ExampleTemplate.js"
import MetaProperty          from "./MetaProperty.js"
import MetaPropertyGrouping  from "./MetaPropertyGrouping.js"
import PseudoSelector        from "./PseudoSelector.js"
import Scale                 from "./scales/Scale.js"
import Step                  from "./scales/Step.js"
import VariableBasedScale    from "./scales/VariableBasedScale.js"
import VariableRegistry      from "./VariableRegistry.js"

const pseudoSelectors = [
  new DefaultPseudoSelector(),
  new PseudoSelector({ variableNameQualifier: "hover",selector: "hover"}),
]

const colorExampleTemplate = (selector) => {
  const oneDiv = `<div class="${selector}"
     style="width: 20rem; border: dotted thin #888; padding: 1rem; background-color: COLOR">
  .${selector}
</div>`
  const onBlack = oneDiv.replace("COLOR","#000")
  const onWhite = oneDiv.replace("COLOR","#fff")
  return new Example({
    markupForRendering: `<div style="display:flex; gap: 0.25rem;">
  ${onBlack}${onWhite}
</div>`
  })
}
const backgroundColorExampleTemplate = (selector) => {
  const oneDiv = `<div class="${selector}"
     style="width: 20rem; border: dotted thin #888; padding: 1rem; color: COLOR">
  .${selector}
</div>`
  const onBlack = oneDiv.replace("COLOR","#000")
  const onWhite = oneDiv.replace("COLOR","#fff")
  return new Example({
    markupForRendering: `<div style="display:flex; gap: 0.25rem;">
  ${onBlack}${onWhite}
</div>`
  })
}
const borderColorExampleTemplate = (selector) => {
  const oneDiv = `<div class="${selector}"
     style="width: 20rem; padding: 1rem; border-style: solid; border-thickness: thick; color: COLOR; background-color: BG_COLOR">
  .${selector}
</div>`
  const onBlack = oneDiv.replace("COLOR","#fff").replace("BG_COLOR","#000")
  const onWhite = oneDiv.replace("COLOR","#000").replace("BG_COLOR","#fff")
  return new Example({
    markupForRendering: `<div style="display:flex; gap: 0.25rem;">
  ${onBlack}${onWhite}
</div>`
  })
}


/*
 * A helper for producing colors and color scales.  This will allow you to configure
 * the number of tints per color and what they are called, then produce the requisite
 * CSS variables and other configuration.
 *
 * Currently, this produces:
 *
 * - color (for text e.g.)
 * - background-color
 * - border-color
 * - each of these as hovers
 */
export default class ColorTints {
  /*
   * Create a ColorTints helper with the given scale of tint names.
   *
   * tintNames: An array of tint names.  They can be from lightest to darkest or vice versa.  One name
   * can be blank, to provide e.g. a class like "purple".
   */
  constructor(tintNames) {
    this.tintNames = tintNames
    this.colorScale = {}
    this.customColors = []
  }

  /*
   * Register tints for a given color name.
   *
   * colorName: the name of the color. Can be anything that can be used in a CSS class.
   * tints: An array of CSS colors that line up with the tintNames passed to the constructor.
   *
   * This will create CSS variables for the color and steps, register those with the 
   * VariableRegistry *and* store them internally in this class for later use (see asMetaPropertyGrouping()).
   *
   * The created variables are returned if you need them.
   *
   * If colorName has already been passed to register, this will throw an error.
   *
   * If tints is not the same length as tintNames, this will throw an error.
   */
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

  /*
   * This can be used to register custom colors that don't conform to your tint levels or names.
   * This is mostly useful for defining white, offwhite, black, and near black, but you can use it
   * for any one-off color, and you will get all the variations defined.
   *
   * colorName - name of the color
   * tintNamesAndValues - an Object where the key is the step name and the value is a CSS color. You can 
   *                      use a blank string.
   */
  registerCustom(colorName, tintNamesAndValues) {
    const metaProperty = new MetaProperty({
      name: colorName,
      scales: [ Scale.forLiteralValues(tintNamesAndValues) ],
      pseudoSelectors: pseudoSelectors,
      cssClassTemplates: [
        new CSSClassTemplate(colorName, "color",{
          exampleTemplate: colorExampleTemplate,
        }),
        new CSSClassTemplate(`bg-${colorName}`, "background-color", {
          exampleTemplate: backgroundColorExampleTemplate,
        }),
        new CSSClassTemplate(`b--${colorName}`, "border-color", {
          exampleTemplate: borderColorExampleTemplate,
        }),
      ]
    })
    this.customColors.push(metaProperty)
  }

  /*
   * Return all registered colors as a MetaPropertyGrouping you can pass directly to the MetaTheme.
   */
  asMetaPropertyGrouping() {

    const metaProperties = Array.from(Object.entries(this.colorScale)).map( ([colorName, { variables, tints }]) => {
      return new MetaProperty({
        name: colorName,
        scales: [ new VariableBasedScale(variables) ],
        pseudoSelectors: pseudoSelectors,
        cssClassTemplates: [
          new CSSClassTemplate(colorName, "color",{
            exampleTemplate: colorExampleTemplate,
          }),
          new CSSClassTemplate(`bg-${colorName}`, "background-color", {
            exampleTemplate: backgroundColorExampleTemplate,
          }),
          new CSSClassTemplate(`b--${colorName}`, "border-color", {
            exampleTemplate: borderColorExampleTemplate,
          }),
        ]
      })
    }).concat(this.customColors)

    const summarization = []
    metaProperties.forEach( (metaProperty) => {
      summarization.push(`<div style=\"display: flex; align-items: stretch; justify-content: start; margin-bottom: 1rem;\"><h3 style="width: 8rem;"><a style=\"color: black; text-decoration: underline;\" href=\"#${metaProperty.name}\">${metaProperty.name}</a></h3>`)
      metaProperty.cssClassTemplates.forEach( (cssClassTemplate) => {
        metaProperty.scales().forEach( (scale) => {
          scale.eachStep( (step) => {
            const cssClass = cssClassTemplate.toCSSClass(step)
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
