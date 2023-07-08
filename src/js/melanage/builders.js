import fs from "node:fs"
import { MelangeVariable }                          from "../lib/MelangeVariable.js"

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
        doc.push("       <ul>\n")
      },
      end: (cssClassTemplate) => {
        doc.push("        </ul>\n      </section>\n")
      }
    }

    const documentClass = (cssClass, cssClassTemplate) => {
      doc.push(`
          <li>
            <code>.${cssClass.className()}</code>\n`)
      if (cssClassTemplate.hasExample()) {
        const example = cssClassTemplate.example(cssClass)
        doc.push(`            <div><code><pre>${example.escaped}</pre></code></div>`)
        doc.push(`            ${example.markup}`)
      }
      doc.push(`          </li>`)
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
