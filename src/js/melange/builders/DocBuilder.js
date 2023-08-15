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
    let metaPropertyGroupingsByName = {}
    let doc = []
    let mediaQueries = []
    let currentMediaQuery
    let currentMetaPropertyGroupingAdditional

    const onMediaQuery = {
      start: (mq) => {
        currentMediaQuery = mq
        mediaQueries.push(mq)
      },
      end: (mq) => {
      }
    }
    const onMetaPropertyGrouping = {
      start: (metaPropertyGrouping) => {
        let extension = "doc.html"
        if (currentMediaQuery.variableNameQualifier() != "") {
          extension = `${currentMediaQuery.variableNameQualifier()}.doc.html`
        }
        const filename = `${metaPropertyGrouping.slug}.${extension}`
        currentMetaPropertyGroupingAdditional = {
          metaPropertyGrouping: metaPropertyGrouping,
          filename: filename,
          mediaQueryFilenames: Object.fromEntries(metaPropertyGrouping.mediaQueries.map( (mq) => {
            let mqExtension = "doc.html"
            if (mq.variableNameQualifier() != "") {
              mqExtension = `${mq.variableNameQualifier()}.doc.html`
            }

            return [ mq.isDefault() ? "default" : mq.name(), `${metaPropertyGrouping.slug}.${mqExtension}` ]
          }))
        }
        if (currentMediaQuery.isDefault()) {
          metaPropertyGroupingsByName[metaPropertyGrouping.name] = {
            metaPropertyGrouping: metaPropertyGrouping,
            filename: filename
          }
        }
      },
      end: (metaPropertyGrouping) => {
        ejs.renderFile(
          this.templates.grouping,
          {
            metaPropertyGrouping: metaPropertyGrouping,
            HumanizedString: HumanizedString,
            Anchor: Anchor,
            title: new HumanizedString(metaPropertyGrouping.name),
            showTitleInNav: false,
            mediaQuery: currentMediaQuery,
            mediaQueryFilenames: currentMetaPropertyGroupingAdditional.mediaQueryFilenames,
          },
          { 
            root: this.templates["ROOT"],
          },
          (err, str) => {
            if (err)  {
              throw err
            }
            const fd = fs.openSync(`${this.dir}/${currentMetaPropertyGroupingAdditional.filename}`, "w")
            fs.writeFileSync(fd, str)
            fs.closeSync(fd)
          }
        )
      }
    }


    /* Generate Docs */
    metaTheme.eachCSSClass({
      onMediaQuery: onMediaQuery,
      onMetaPropertyGrouping: onMetaPropertyGrouping,
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
