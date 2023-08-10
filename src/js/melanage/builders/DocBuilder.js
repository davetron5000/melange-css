import fs              from "node:fs"
import Example         from "../../lib/Example.js"
import Anchor          from "../../lib/Anchor.js"
import HumanizedString from "../../lib/HumanizedString.js"

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
  <body class="font-sans pa0 ma0">
  <header class="bg-black-ish white-ish">
    <div class="pa-1 w-auto w-60-l w-80-m mh-auto">
    <h1 class="f-5">${metaPropertyGrouping.name}</h1>\n`)

        metaPropertyGrouping.docs.forEach( (docParagraph) => {
          doc.push(`    <p class="measure f-2">${docParagraph}</p>\n`)
        })

        if (metaPropertyGrouping.summarization) {
          doc.push(`    ${metaPropertyGrouping.summarization}`)
        }
        else {

          doc.push(`    <nav class="flex flex-wrap items-start pb-3">`)
          metaPropertyGrouping.metaProperties.forEach( (metaProperty) => {
            doc.push(`    <div class="flex flex-column items-start mr-3">`)
            doc.push(`    <a class="mb-2 f-3 fw-5 white-ish ws-nowrap" href="#${new Anchor(metaProperty.name)}">`)
            doc.push(`      ${new HumanizedString(metaProperty.name)}`)
            doc.push(`    </a>`)
            doc.push(`    </div>`)
          })
          doc.push(`    </nav>`)
          doc.push(`    </div>`)
        }
        doc.push(`    </header>`)
        doc.push(`    <main class="pa-1 w-auto w-60-l w-80-m mh-auto">`)
      },
      end: (metaPropertyGrouping) => {
        doc.push("</main>")
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
      <a name=\"${new Anchor(metaProperty.name)}\"></a>
      <h2 class="f-3">
        ${metaProperty.name}
      </h2>
`)
        if (metaProperty.cssClassTemplates.length > 1) {
          doc.push(`
      <nav class="flex flex-wrap">`)
          const linkHTML = metaProperty.cssClassTemplates.map( (cssClassTemplate) => {
            const links = [ `<a class="lh-copy black" href="#${new Anchor(cssClassTemplate.classNameBase)}">${cssClassTemplate.summary || new HumanizedString(cssClassTemplate.classNameBase)}</a>` ]
            if (metaProperty.pseudoSelectors.length > 1) {
              metaProperty.pseudoSelectors.forEach( (pseudoSelector) => {
                if (!pseudoSelector.isDefault()) {
                  const pseudoAnchor = new Anchor(cssClassTemplate.classNameBase + '-' + pseudoSelector.selector)
                  links.push(`<a class="lh-copy black" href="#${pseudoAnchor}">${cssClassTemplate.summary || new HumanizedString(cssClassTemplate.classNameBase)} - ${pseudoSelector.name}</a>`)
                }
              })
            }
            return links
          }).flat().join("<span role=\"none\" class=\"mh-2\">&middot;</span>")
          doc.push(linkHTML)
          doc.push(`
      </nav>`)
        }
        metaProperty.docs.forEach( (docParagraph) => {
          doc.push(`      <p class="measure lh-copy f-2">${docParagraph}</p>\n`)
        })
      },
      end: (metaProperty) => { doc.push("    </section>\n") }
    }
    const onCSSClassTemplate = {
      start: (cssClassTemplate, metaProperty) => {
        doc.push("      <section>\n")
        doc.push(`        <a name="${new Anchor(cssClassTemplate.classNameBase)}"></a>`)
        if (metaProperty.totalSteps() <= 1) {
        }
        else {
          doc.push(`        <h3 class="f-3">`)
          doc.push(`          <code class="f-4">${cssClassTemplate.classNameBase}*</code>`)
          if (cssClassTemplate.summary) {
            doc.push(`          <span class="f-3 ml-2"> - ${new HumanizedString(metaProperty.name)} ${cssClassTemplate.summary}</span>`)
          }
          doc.push(`        </h3>\n`)
        }
        if (cssClassTemplate.docs) {
          cssClassTemplate.docs.forEach( (docParagraph) => {
            doc.push(`         <p class="measure f-2">${docParagraph}</p>\n`)
          })
        }
        doc.push("<section>")
      },
      end: (cssClassTemplate) => {
        doc.push("</section>")
      }
    }
    const onPsuedoSelector = {
      start: (pseudoSelector, cssClassTemplate, metaProperty) => {
        if (pseudoSelector.isDefault()) {
          return
        }
        if (metaProperty.totalSteps() <= 1) {
          return
        }
        doc.push(`<a name="${new Anchor(cssClassTemplate.classNameBase + '-' + pseudoSelector.selector)}"></a>`)
        doc.push(`<h3 class="f-4 mt-4">${cssClassTemplate.summary || cssClassTemplate.classNameBase} - ${pseudoSelector.name}</a></h3>`)
      },
    }

    const onCSSClass = (cssClass, _pseudoSelector, cssClassTemplate, _metaProperty, _metaPropertyGrouping, _breakpoint, allBreakpoints) => {
      let example = cssClass.example()
      const className = cssClass.className()
      if (!example) {
        example = new Example({ htmlForDocs: `<div class=\"${className}\">.${className}</div>` })
      }
      const nonMobileBreakpoints = allBreakpoints.filter( (breakpoint) => {
        return !breakpoint.isDefault();
      }).map( (breakpoint) => {
        return `<code class="db di-ns f-2 fw-normal ws-nowrap lh-copy">${cssClass.atBreakpoint(breakpoint).className()}</code>`
      }).join("<span class=\"dn di-ns f-3 fw-normal\"> / </span>")
      doc.push(`
        <h4 class="f-3 mt-3 mb-2"><code class="db di-ns">${className}</code><span class="dn di-ns f-3 fw-normal"> / </span>${ nonMobileBreakpoints }</h4>
`)
      doc.push(`
          <article class="ml-4-ns ml-0 db flex-ns items-start justify-between">
          <div class="w-50-ns w-auto mw-90">
            <h5 class="f-2 fw-b ma-0 mb-2">Example</h5>
            <code style="overflow-x: scroll" class="mw-auto db pa-2 br-3 bg-black green-light"><pre class="ma-0">${example.escapedHtml()}</pre></code>
          </div>`)
      if (example.hasMarkup()) {
        doc.push(`
          <div class="ml-3-ns mt-3 mt-0-ns flex-grow-1-ns">
            <h5 class="f-2 fw-b ma-0 mb-2">Demo</h5>
            <div>${example.markup()}</div>
          </div>`)
      }
      doc.push(`
          </article>
          <details class="ml-2 mv-2">
            <summary class="f-2 tt-l fw-2">Show CSS</summary>
            <code style="overflow-x: scroll"; class="mw-auto db pa-2 br-3 f-1 fw-5 bg-black blue-light"><pre class="ma0">${ cssClass.toCSS()}</pre></code>
          </details>`)
    }

    /* Generate Docs */
    metaTheme.eachCSSClass({
      onBreakpoint: {
        start: rememberBreakpoint,
      },
      onMetaPropertyGrouping: writeDocFile,
      onMetaProperty: documentMetaProperty,
      onCSSClassTemplate: onCSSClassTemplate,
      onPsuedoSelector: onPsuedoSelector,
      onCSSClass: onCSSClass,
    })

  }
}
