import fs                  from "node:fs"
import { MelangeVariable } from "../lib/MelangeVariable.js"
import { Example }         from "../lib/ExampleTemplate.js"

class CSSBuilder {
  writeCSS(filename, metaTheme) {
    const writeCSSClass = (cssClass) => {
      css.write(cssClass.toCSS())
      css.write("\n")
    }
    const startBreakpoint = (breakpoint) => {
      if (breakpoint.toMediaQuery() !== "") {
        css.write(`${breakpoint.toMediaQuery()} {\n`)
      }
    }
    const endBreakpoint = (breakpoint) => {
      if (breakpoint.toMediaQuery() !== "") {
        css.write("}\n")
      }
    }
    const css = fs.createWriteStream("melange.css")
    css.write(":root {\n")
    MelangeVariable.eachSetOfVariables( (baseName,variablesSet) => {
      css.write("/*\n")
      css.write(` * ${baseName}\n *\n`)
      if (variablesSet.documentation) {
        css.write(` * ${variablesSet.documentation}\n`)
      }
      css.write(" */\n")

      Object.values(variablesSet.variables).forEach( (melangeVariable) => {
        css.write(melangeVariable.toCSSProperty())
        css.write("\n")
      })
      css.write("\n")
    })
    css.write("}\n")
    /* Generate CSS */
    metaTheme.eachCSSClass({
      onCSSClass: writeCSSClass,
      onBreakpoint: {
        start: startBreakpoint,
        end:  endBreakpoint,
      },
    })
    css.close()
  }
}

class DocBuilder {
  writeDocs(metaTheme) {  
    let doc = []
    let breakpoint

    const rememberBreakpoint = (bp) => {
      breakpoint = bp
    }
    const writeDocFile = {
      start: (metaPropertyGrouping) => {
        doc = []
        doc.push(`<html>
  <head>
  <title>Melange - Reference - ${metaPropertyGrouping.name}</title>
  <link href="melange.css" rel="stylesheet">
  </head>
  <body>
    <h1 class="f5">${metaPropertyGrouping.name}</h1>\n`)

        metaPropertyGrouping.docs.forEach( (docParagraph) => {
          doc.push(`    <p class="measure f2">${docParagraph}</p>\n`)
        })

        if (metaPropertyGrouping.summarization) {
          doc.push(`    ${metaPropertyGrouping.summarization}`)
        }

      },
      end: (metaPropertyGrouping) => {
        doc.push("</body>")
        doc.push("</html>")
        if (breakpoint.isDefault()) {
          fs.writeFileSync(`${metaPropertyGrouping.slug}.doc.html`, doc.join("\n"))
        }
        else {
          console.log(`Ignoring breakpoint ${breakpoint.variableNameQualifier}`)
        }
      }
    }

    const documentMetaProperty = {
      start: (metaProperty) => {
        doc.push(`    <section>
      <a name=\"${metaProperty.name}\"></a>
      <h2 class="f4">${metaProperty.name}</h2>
`)
        metaProperty.docs.forEach( (docParagraph) => {
          doc.push(`      <p class="measure f2">${docParagraph}</p>\n`)
        })
      },
      end: (metaProperty) => { doc.push("    </section>\n") }
    }
    const documentTemplate = {
      start: (cssClassTemplate) => {
        doc.push("      <section>\n")
        doc.push(`        <h3 class=\"f3\">${cssClassTemplate.classNameBase}</h3>\n`)
        if (cssClassTemplate.docs) {
          cssClassTemplate.docs.forEach( (docParagraph) => {
            doc.push(`         <p class="measure f2">${docParagraph}</p>\n`)
          })
        }
        doc.push(`
<table>
<thead>
<tr>
<th style=\"text-align: left\">Example</th>
<th style=\"text-align: left\">Demo</th>
</thead>
<tbody>
        `)
      },
      end: (cssClassTemplate) => {
        doc.push("        </tbody></table>\n      </section>\n")
      }
    }

    const documentClass = (cssClass, cssClassTemplate) => {
      let example
      if (cssClassTemplate.hasExample()) {
        example = cssClassTemplate.example(cssClass)
      }
      else {
        example = new Example({ htmlForDocs: `<div class=\"${cssClass.className()}\"></div>` })
      }
      doc.push(`<tr><td style="padding: 0.5rem; border: solid thin gray"><code><pre>${example.escapedHtml()}</pre></code>`)
      doc.push(`<div style=\"padding: 0.25rem; border: solid thin black; background-color: #111111; color: #F4F4F4; border-radius: 0.25rem;\"><code><pre>${cssClass.toCSS()}</pre></code></div><div>CSS</div></td>`)
      if (example.hasMarkup()) {
        doc.push(`<td style="padding: 0.5rem; border: solid thin gray">${example.markup()}</td>`)
      }
      else {
        doc.push("<td>&nbsp;</td>")
      }
      doc.push("</tr>")
    }

    /* Generate Docs */
    metaTheme.eachCSSClass({
      onBreakpoint: {
        start: rememberBreakpoint,
      },
      onMetaPropertyGrouping: writeDocFile,
      onMetaProperty: documentMetaProperty,
      onCSSClassTemplate: documentTemplate,
      onCSSClass: documentClass,
    })

  }
}

export {
  DocBuilder,
  CSSBuilder,
}
