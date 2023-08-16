import fs                from "node:fs"
import { dirname }       from "path"
import { fileURLToPath } from "url"
import ejs               from "ejs"

const __dirname = dirname(fileURLToPath(import.meta.url))

import Example          from "../../lib/Example.js"
import Anchor           from "../../lib/Anchor.js"
import HumanizedString  from "../../lib/HumanizedString.js"
import VariableRegistry from "../../lib/VariableRegistry.js"

class DocFilename {
  constructor(metaPropertyGrouping, mediaQuery, cssClassTemplate) {
    let extension = "doc.html"
    if (mediaQuery.variableNameQualifier() != "") {
      extension = `${mediaQuery.variableNameQualifier()}.doc.html`
    }
    this.filename = `${metaPropertyGrouping.slug}.${extension}`
    if (cssClassTemplate) {
      this.filename = this.filename + `#${new Anchor(cssClassTemplate.classNameBase)}`
    }
  }

  toString() { return this.filename }
}
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
    if (!this.templates.classesIndex) { throw `There is no classesIndex template` }
    if (!this.templates.variables) { throw `There is no variables template` }
  }

  build(metaTheme) {  
    let metaPropertyGroupingsByName = {}
    let doc = []
    let mediaQueries = []
    let currentMediaQuery
    let currentMetaPropertyGroupingAdditional
    let cssClassesForIndex = {}

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
        const filename = new DocFilename(metaPropertyGrouping, currentMediaQuery)

        currentMetaPropertyGroupingAdditional = {
          metaPropertyGrouping: metaPropertyGrouping,
          filename: filename,
          mediaQueryFilenames: Object.fromEntries(metaPropertyGrouping.mediaQueries.map( (mq) => {
            return [ mq.isDefault() ? "default" : mq.name(), new DocFilename(metaPropertyGrouping, mq) ]
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
        this._renderGrouping(metaPropertyGrouping, currentMediaQuery, currentMetaPropertyGroupingAdditional)
      }
    }

    const onCSSClass = (cssClass, _pseudoSelector, cssClassTemplate, _metaProperty, metaPropertyGrouping, mediaQuery) => {
      cssClassesForIndex[cssClass.className()] = {
        cssClass: cssClass,
        cssClassTemplate: cssClassTemplate,
        metaPropertyGrouping: metaPropertyGrouping,
        mediaQuery: mediaQuery,
        docFilename: new DocFilename(metaPropertyGrouping, mediaQuery, cssClassTemplate),
      }
    }

    /* Generate Docs */
    metaTheme.eachCSSClass({
      onMediaQuery: onMediaQuery,
      onMetaPropertyGrouping: onMetaPropertyGrouping,
      onCSSClass: onCSSClass,
    })

    this._renderVariables({
      template: this.templates.variables,
      templatesRoot: this.templates["ROOT"],
      dir: this.dir,
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

    this._renderClassIndex(
      {
        template: this.templates.classesIndex,
        templatesRoot: this.templates["ROOT"],
        dir: this.dir,
        cssClassesForIndex: cssClassesForIndex,
      }
    )
  }

  _renderVariables({template, templatesRoot, dir}) {
    ejs.renderFile(
      template,
      {
        title: "Variables",
        VariableRegistry: VariableRegistry,
        Anchor: Anchor,
      },
      { 
        root: templatesRoot,
      },
      (err, str) => {
        if (err)  {
          throw err
        }
        const fd = fs.openSync(`${dir}/variables.html`, "w")
        fs.writeFileSync(fd, str)
        fs.closeSync(fd)
      }
    )
  }

  _renderClassIndex({ template, templatesRoot, dir, cssClassesForIndex }) {
    ejs.renderFile(
      template,
      {
        cssClassesForIndex: cssClassesForIndex,
        HumanizedString: HumanizedString,
        Anchor: Anchor,
        title: "Index of CSS Classes",
      },
      { 
        root: templatesRoot,
      },
      (err, str) => {
        if (err)  {
          throw err
        }
        const fd = fs.openSync(`${dir}/classesIndex.html`, "w")
        fs.writeFileSync(fd, str)
        fs.closeSync(fd)
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
    if (!mediaQueries) {
      throw `wtf`
    }
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

  _renderGrouping(metaPropertyGrouping, currentMediaQuery, currentMetaPropertyGroupingAdditional) {
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
