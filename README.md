# Melange - CSS Utility Framework and Design System

Melanage is a CSS Utility library similar to Tailwind but more like Tachyons.  Melange includes a design system, so you
don't have infinite possibilities, just what you probably need for most things.

## Install

### Use a CDN

TODO

### Use NPM

```
npm install --save melange-css
```

The `melange-css` package provides two ways to use it:

* Use `melange.css` which contains everything
* Copy `melange-variables-only.css` into your project and use that copy plus `melange-styles-only.css` from this package.
You can modify `melange-variables-only.css` based on the needs of your design system.

## Use

You don't find a class like `button` or `btn`.  Instead, you'll find classes that are mnemonic for CSS properties and
common values.  One way to make a button is to use a `a` tag that has a larger horizontal padding as compared to its
vertical, and a rounded border.  Here's one way to do that:

```html
<a href="#" class="ph-3 pv-2 ba br-3 tc">Click Me!</a>
```

Melange provides styles for many CSS properties, however it does not provide an infinite number of *values* for those
properties. As such, there is no build step like TailwindCSS has.

