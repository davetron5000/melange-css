import fs                from "node:fs"
import { dirname }       from "path"
import { fileURLToPath } from "url"
import ejs               from "ejs"

const __dirname = dirname(fileURLToPath(import.meta.url))

import Example         from "../../lib/Example.js"
import Anchor          from "../../lib/Anchor.js"
import HumanizedString from "../../lib/HumanizedString.js"

export default class DocBuilder {
  constructor({dir, templates}) {
    this.dir = dir
    this.templates = templates
    if (Object.keys(this.templates).length == 0) {
      throw `There are no templates`
    }
    if (!this.templates.mediaQueries) { throw `There is no mediaQueries template` }
    if (!this.templates.index) { throw `There is no index template` }
    if (!this.templates.grouping) { throw `There is no grouping template` }
  }

  build(metaTheme) {  
    let metaPropertyGroupingsByName
    let doc = []
    let mediaQueries = []
    let mediaQuery
    let currentGroupingFd

    const onMediaQuery = {
      start: (mq) => {
        mediaQuery = mq
        mediaQueries.push(mq)
        if (mediaQuery.isDefault()) {
          metaPropertyGroupingsByName = {}
        }
      },
      end: (mq) => {
      }
    }
    const onMetaPropertyGrouping = {
      start: (metaPropertyGrouping) => {
        doc = []
    /*
    <h1 class="f-5">${metaPropertyGrouping.name}</h1>\n`)
          */

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
        if (mediaQuery.isDefault()) {
          metaPropertyGroupingsByName[metaPropertyGrouping.name] = {
            metaPropertyGrouping: metaPropertyGrouping,
            filename: filename
          }
        }
        doc.push("</main>")
        doc.push("</body>")
        doc.push("</html>")
        if (mediaQuery.isDefault()) {
          fs.writeFileSync(this.dir + "/" + filename, doc.join("\n"))
        }
      }
    }

    const onMetaProperty = {
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
      onMetaPropertyGrouping: onMetaPropertyGrouping,
      onMetaProperty: onMetaProperty,
      onCSSClassTemplate: onCSSClassTemplate,
      onPsuedoSelector: onPsuedoSelector,
      onCSSClass: onCSSClass,
    })

    this._renderMediaQueries(
      {
        template: this.templates.mediaQueries,
        templatesRoot: this.templates["ROOT"],
        dir: this.dir,
        mediaQueries: mediaQueries
      }
    )
    this._renderIndex(
      {
        template: this.templates.index,
        templatesRoot: this.templates["ROOT"],
        dir: this.dir,
        metaPropertyGroupingsByName: metaPropertyGroupingsByName,
      }
    )

  }
  _renderIndex( {
    template,
    templatesRoot,
    dir,
    metaPropertyGroupingsByName, }) {
    ejs.renderFile(
      template,
      {
        metaPropertyGroupingsByName: metaPropertyGroupingsByName,
        HumanizedString: HumanizedString,
        Anchor: Anchor,
        title: null,
      },
      { 
        root: templatesRoot,
      },
      (err, str) => {
        if (err)  {
          throw err
        }
        const fd = fs.openSync(`${dir}/index.html`, "w")
        fs.writeFileSync(fd, str)
        fs.closeSync(fd)
      }
    )
  }

  _renderMediaQueries({ template, templatesRoot, dir, mediaQueries }) {
    ejs.renderFile(
      template,
      {
        mediaQueries: mediaQueries,
        Anchor: Anchor,
        title: "Media Queries",
      },
      { 
        root: templatesRoot,
      },
      (err, str) => {
        if (err)  {
          console.log(`ERR: ${err}`)
          return
        }
        const fd = fs.openSync(`${dir}/mediaQueries.html`, "w")
        fs.writeFileSync(fd, str)
        fs.closeSync(fd)
      }
    )
  }
}
