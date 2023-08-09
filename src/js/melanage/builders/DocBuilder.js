import fs      from "node:fs"
import Example from "../../lib/Example.js"

export default class DocBuilder {
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
  <meta charSet="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
  <title>Melange - Reference - ${metaPropertyGrouping.name}</title>
  <link href="melange.css" rel="stylesheet">
  </head>
  <body class="font-sans">
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
    /*
            <h3 class="f5"><code>f-l</code></h3>
        <article style="margin-left: 1rem; align-items: start; justify-items: between;" class="flex-ns items-start justify-between db">
          <div>
            <h4 class="f4 ma-0">Example</h4>
            <code style="overflow-x: scroll" class="mw-100 db pa-2 br-3 bg-black-ish blue-lightest"><pre style="margin: 0">&lt;div&gt;
  &lt;div class="f-l"&gt;.f-l&lt;/div&gt;
  &lt;div&gt;Greetings, programs! Remember to fight for the users!&lt;/div&gt;
&lt;/div&gt;</pre></code>
          </div>
          <div class="ml-3-ns mt-3 mt-0-ns">
            <h4 class="f4 ma-0">Demo</h4>
           <div style="border: dashed thin black; "><div style="padding-left: 1rem; padding-right: 1rem; border: solid thin black" class="f-l">.f-l</div><div style="padding-left: 1rem; padding-right: 1rem; background-color: #ddd;" >Greetings, programs! Remember to fight for the users!</div></div>
          </div>
          </article>
          <details style="margin-top: 1rem; margin-bottom: 1rem; margin-left: 1rem;">
            <summary>Show CSS</summary>
            <code style="overflow-x: scroll"; class="mw-100 db pa-2 br-3 bg-black-ish blue-lightest"><pre style="margin: 0">.f-l {
  float: left;
}</pre></code>
          </details>
        </div>

  */
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
      let example = cssClass.example()
      if (!example) {
        example = new Example({ htmlForDocs: `<div class=\"${cssClass.className()}\"></div>` })
      }
      doc.push(`<tr><td style="padding: 0.5rem; border: solid thin gray"><code><pre>${example.escapedHtml()}</pre></code>`)
      doc.push(`<div style=\"max-width: 500px; overflow-x: scroll; padding: 0.25rem; border: solid thin black; background-color: #111111; color: #F4F4F4; border-radius: 0.25rem;\"><code><pre>${cssClass.toCSS()}</pre></code></div><div>CSS</div></td>`)
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
