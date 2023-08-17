# melange-cli - CLI for advanced Melange CSS customization

*You probably don't need this!*

This is a CLI tool to allow for more advanced customizations of your use of MelangeCSS.  Ideally, you can modify the
variables included with the `melange-css` npm package and that will be that.

If that doesn't work for your needs, read on!

## What This Is

This is JavaScript that produces `melange.css` and its documentation.  It's designed as a set of classes to create a
Melange-like CSS library. The idea is that no CSS is written, but instead meta information is described that can produce
the actual CSS.  For example:

```javascript
const borderWidthMetaProperty = new MetaProperty({
  name: "Border Widths",
  scales: [ borderWidthScale ],
  cssClassTemplates: [
    new CSSClassTemplate("bw", "border-width",
                        { exampleTemplate: borderWidthExampleTemplate, summary: "all" }),
    new CSSClassTemplate("blw", "border-left-width",
                        { exampleTemplate: borderWidthExampleTemplate, summary: "left" }),
    new CSSClassTemplate("brw", "border-right-width",
                        { exampleTemplate: borderWidthExampleTemplate, summary: "right" }),
    new CSSClassTemplate("btw", "border-top-width",
                        { exampleTemplate: borderWidthExampleTemplate, summary: "top" }),
    new CSSClassTemplate("bbw", "border-bottom-width",
                        { exampleTemplate: borderWidthExampleTemplate, summary: "bottom" }),
  ]
})
```
This ensures that all border widths are a consistent size, so that when you use `blw-3` and `bbw-3` both the left and
bottom border widths are the same value: the third step of the border width scale.

The `exampleTemplate` also allows programmatic configuration of examples that demonstrate the style and can produce
documentation.

## What This Will Be

The reason this was done is to allow users to, if they choose, customize things are a relatively detailed level.  But
it's not there, yet.
