# Melange - CSS Utility Framework and Design System

Melanage is a CSS Utility library similar to Tailwind but more like Tachyons.  Melange includes a design system, so you
don't have infinite possibilities, just what you probably need for most things.

## Install

### Use a CDN

Add this to the `<head>` section of your HTML:

```
<link rel="stylesheet"
      href="https://unpkg.com/melange-css@1.0.0-RC4/melange.min.css"/>
```

### Download to Your Project

Use something like `curl` to download the file and save it to your project:

```
curl https://unpkg.com/melange-css@1.0.0-RC4/melange.css > melange.css
```

### Use NPM

```
npm install --save melange-css
```

## Use

You don't find a class like `button` or `btn`.  Instead, you'll find classes that are mnemonic for CSS properties and
common values.  One way to make a button is to use a `a` tag that has a larger horizontal padding as compared to its
vertical, and a rounded border.  Here's one way to do that:

```html
<a href="#" class="ph-3 pv-2 ba br-3 tc">Click Me!</a>
```

Melange provides styles for many CSS properties, however it does not provide an infinite number of *values* for those
properties. As such, there is no build step like TailwindCSS has.

## Generative AI Declaration

* All writing, including this README and the HTML content in `melange-cli/src/html` and `docs`, was created [without
assistance from a generative AI](https://declare-ai.org/1.0.0-alpha1/none.html)
* Some aspects of the source code in `melange-cli/src/js` had [non-creative assistance](https://declare-ai.org/1.0.0-alpha1/non-creative.html) from GitHub CoPilot.  Primarily, it auto-complete certain patterns that I then edited.  It was not used to produce more than one line at a time.

## Releasing Melange

* Update versions in `*/package.json`
* Update version here
* `bin/setup` (which will update `package-lock.json`)
* `bin/build`
* commit it all
* `npm publish` it all
