# Melange - CSS Utility Framework and Design System

Melanage is a CSS Utility library similar to Tailwind but more like Tachyons.  Melange includes a design system, so you
don't have infinite possibilities, just what you probably need for most things.

## Install

### Use a CDN

Add this to the `<head>` section of your HTML:

```
<link rel="stylesheet"
      href="https://unpkg.com/melange-css@1.0.0-alpha2/melange.min.css"/>
```

To customize things, download the variables to your project with something like `curl`:

```
curl https://unpkg.com/melange-css@1.0.0-alpha2/melange-variables-only.css > melange-variables.css
```

You can change this file how you like to adjust the design system.  Then, includ the styles-only version in your project:

```
<link rel="stylesheet"
      href="https://unpkg.com/melange-css@1.0.0-alpha2/melange-styles-only.css"/>
```

### Download to Your Project

Use something like `curl` to download the file and save it to your project:

```
curl https://unpkg.com/melange-css@1.0.0-alpha2/melange.css > melange.css
```

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

