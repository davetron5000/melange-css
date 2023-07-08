import fs from "node:fs"

import { MelangeVariable }                          from "../lib/MelangeVariable.js"
import { EnumeratedValues, LiteralEnumeratedValue } from "../lib/EnumeratedValues.js"
import {
  VariableBasedScale,
  VariableBasedScaleWithZero,
  LiteralScale
}                                                from "../lib/Scale.js"
import { CSSClassTemplate }                      from "../lib/CSSClass.js"
import { DefaultPseudoSelector, PseudoSelector } from "../lib/PseudoSelector.js"
import { MetaProperty, MetaPropertyGrouping }    from "../lib/MetaProperty.js"
import { MetaTheme }                             from "../lib/MetaTheme.js"
import { metaTheme } from "./melange.js"
import {
  DocBuilder,
  CSSBuilder
} from "./builders.js"

metaTheme.checkForDupes()

const cssBuilder = new CSSBuilder()
cssBuilder.writeCSS("melange.css", metaTheme)
const docBuilder = new DocBuilder()
docBuilder.writeDocs(metaTheme)

