import { ColorTints } from "../lib/ColorTints.js"

const colorTints = new ColorTints()
colorTints.register("gray", [ "#F5F5F5", "#ADADAD", "#999999", "#5C5C5C", "#1F1F1F" ])
colorTints.register("red",  [ "#FFDFDF", "#FF8D86", "#FF4136", "#E7040F", "#80211b" ])

const colors = colorTints.asMetaPropertyGrouping()

export {
  colors
}
