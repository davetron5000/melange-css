import fs              from "node:fs"
import Example         from "../../lib/Example.js"
import Anchor          from "../../lib/Anchor.js"
import HumanizedString from "../../lib/HumanizedString.js"

export default class DocBuilder {
  constructor({dir}) {
    this.dir = dir
  }
  build(metaTheme) {  
    let index
    let doc = []
    let mediaQueries = []
    let mediaQuery

    const onMediaQuery = {
      start: (mq) => {
        mediaQuery = mq
        mediaQueries.push(mq)
        index = {}
      },
      end: (mq) => {
        if (!mediaQuery.isDefault()) {
          return
        }
        const indexDoc = []
        indexDoc.push(`<html>
  <head>
  <meta charSet="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
  <title>Melange - Reference</title>
  <link href="melange.css" rel="stylesheet">
  <style>
  </style>
  </head>
  <body class="font-serif pa0 ma0 bg-orange-lightest black-ish">
  <header class="bg-black-ish orange-lightest pa-3 pt-4">
    <h1 class="tc tl-ns f-6 ma-0 mb-3">MelangeCSS Reference</h1>
  </header>
  <main>
    <nav class="flex flex-wrap items-start justify-between pa-3">
          `)
        Object.entries(index).forEach( ([name, {metaPropertyGrouping, filename}]) => {
          indexDoc.push(`<div class="tc tl-ns w-100 w-third-ns ms-third-ns flex flex-column mb-3"><a class="f-4 gray-darkest fw-6 lh-copy" href="${filename}">${name}</a>`)
          metaPropertyGrouping.metaProperties.forEach( (metaProperty) => {
            indexDoc.push(`    <a class="indent-1 mb-2 f-3 fw-normal gray-darkest ws-nowrap" href="${filename}#${new Anchor(metaProperty.name)}">`)
            indexDoc.push(`      ${new HumanizedString(metaProperty.name)}`)
            indexDoc.push(`    </a>`)
          })
          indexDoc.push(`</div>`)
        })
        indexDoc.push(`</main></body></html>`)
        fs.writeFileSync(`${this.dir}/index.html`, indexDoc.join("\n"))
      }
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
  <style>
  .with-background-image {
background-image: url("data:image/png;base64,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");
}
</style>
  </head>
  <body class="font-sans pa0 ma0">
  <header class="bg-black-ish white-ish">
    <div class="pa-1 w-auto w-80-ns mh-auto">
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
        doc.push(`    <main class="pa-1 w-auto w-80-ns mh-auto">`)
      },
      end: (metaPropertyGrouping) => {
        const filename = `${metaPropertyGrouping.slug}.doc.html`
        index[metaPropertyGrouping.name] = { metaPropertyGrouping: metaPropertyGrouping, filename: filename }
        doc.push("</main>")
        doc.push("</body>")
        doc.push("</html>")
        if (mediaQuery.isDefault()) {
          fs.writeFileSync(this.dir + "/" + filename, doc.join("\n"))
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

    const onCSSClass = (cssClass, _pseudoSelector, cssClassTemplate, _metaProperty, metaPropertyGrouping, _mediaQuery, allMediaQueries) => {
      let example = cssClass.example()
      const className = cssClass.className()
      if (!example) {
        example = new Example({ htmlForDocs: `<div class=\"${className}\">.${className}</div>` })
      }
      const supportedMediaQueries = allMediaQueries.filter( (mediaQuery) => {
        return !mediaQuery.isDefault() && metaPropertyGrouping.supportsMediaQuery(mediaQuery)
      }).map( (mediaQuery) => {
        return `<code class="db di-ns f-2 fw-normal ws-nowrap lh-copy"><a class="link underline black" href="/media-queries.html#${new Anchor(mediaQuery.name())}">${cssClass.atMediaQuery(mediaQuery).className()}</a></code>`
      }).join("<span class=\"dn di-ns f-3 fw-normal\"> / </span>")
      doc.push(`
        <h4 class="f-3 mt-3 mb-2"><code class="db di-ns">${className}</code><span class="dn di-ns f-3 fw-normal"> / </span>${ supportedMediaQueries }</h4>
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
      onMediaQuery: onMediaQuery,
      onMetaPropertyGrouping: writeDocFile,
      onMetaProperty: documentMetaProperty,
      onCSSClassTemplate: onCSSClassTemplate,
      onPsuedoSelector: onPsuedoSelector,
      onCSSClass: onCSSClass,
    })


        const mqDocs = []
        mqDocs.push(`<html>
  <head>
  <meta charSet="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
  <title>Melange - Reference</title>
  <link href="melange.css" rel="stylesheet">
  <style>
  </style>
  </head>
  <body class="font-serif pa0 ma0 bg-orange-lightest black-ish">
  <header class="bg-black-ish orange-lightest pa-3 pt-4">
    <h1 class="tc tl-ns f-6 ma-0 mb-3">MelangeCSS Media Queries Reference</h1>
  </header>
  <main class="pa-3 w-50-ns w-90 mh-auto">
  <p class="measure lh-copy">
  Melange is designed so that each class applies to the page when there is no media query in effect.  This means any screen size, light (or no selected) color mode, and no explicit setting for reduced motion.  You can then customize your page's styling when a media query <strong>is</strong> in affect by adding additional classes that have a suffix for that media query.  For example, <code>purple-darkest</code> would apply to all situations by default, whereas <code>purple-darkest-dm</code> would apply only when the “prefers dark mode” media query applies.
  </p>
  <p class="measure lh-copy">
  Each melange class includes a list of the media query variants that are available.  For example, colors may have variants for dark mode, but spacings would not.  Here are all the known media queries, their definitions, and their naming conventions.
  </p>`)
        mediaQueries.forEach( (mediaQuery) => {
          if (!mediaQuery.isDefault()) {
            mqDocs.push(`<section><a name="${new Anchor(mediaQuery.name())}"></a><h2>${mediaQuery.name()}</h2>
            <p class="measure lh-copy">${mediaQuery.description()}</p>
            <ul>
            <li class="lh-copy">Naming convention: <code>*-${mediaQuery.variableNameQualifier()}</code></li>
            <li class="lh-copy">Example: <code>purple-darkest-${mediaQuery.variableNameQualifier()}</code></li>
            <li class="lh-copy">Definition:
            <code class="db w-auto overflow-x-scroll pv-1 ph-2 bg-black blue-light br-2"><pre class="ma-0">${mediaQuery.toMediaQuery()}</pre></code></li>
            </ul></section>`)
          }
        })
        mqDocs.push("</main></body></html>")
        fs.writeFileSync(`${this.dir}/media-queries.html`, mqDocs.join("\n"))
  }
}
