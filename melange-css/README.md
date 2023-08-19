# Melange - CSS Utility Framework and Design System for Developers

MelangeCSS is a utility-style CSS framework to allow you to start styling pages right away without having to write much, if any, CSS.  It provides a basic design system based on a set of spacings, font sizes, and colors that is suitable for any basic app.

## Install

Include this in your `.html` files' `<head>` section:

```
<link rel="stylesheet"
      href="https://unpkg.com/melange-css@1.0.0-alpha3/melange.min.css"/>
```

`melange-css` is available as an NPM module, so installing it will bring the `.css` file into your `node_modules`
directory:

```
npm install --save melange-css
```

From there, including it in your app depends on how your app is built.

## Who Melange is For

* Teams where members produce entire solutions, end-to-end ("full stack").
* Teams where design is presented as a treatment, leaving finer details to the team itself.
* Apps where the team controls the markup.

## Who Melange is NOT For

* Teams where a designer presents a picture of an app that the team must achieve with precise fidelity.
* Apps where markup is generated and the team has little control over the classes
* Teams where there is no core competency in CSS and rely heavily on frameworks like Bootstrap or Bulma.

## Use

Melange is a spiritual successor to Tachyons and is somewhat similar to TailwindCSS, though different in ways we'll get
to.

Melange is a series of classes you can apply to your HTML. Each class typically sets one CSS property to one predefined
value.  For example, `dib` sets `display` to the value `inline-block`.

You would then use these classes in whatever combination you like to achieve the design you need.  For example, here is
how you might create a button:

```html
<a href="#" class="ba br-3 ph-3 pv-2 tc">Click Me!</a>
```

Those terse, seemingly unreadable classes do the following:

* There is a border on all sides
* The border radius is the third size on a scale from 1 to 5
* The horizontal padding is the third size on a scale from 1 to 7
* The vertical padding is the second size on a scale from 1 to 7
* The text is centered

Perhaps you can tell which class achieves which?

See [the reference docs](#) or the [component gallery](#) to get started.

## About this Folder

This folder's contents are almost entirely generated from the `melange-cli` folder.  Generally avoid editing files in
here.
