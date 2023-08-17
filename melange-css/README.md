# Melange - CSS Utility Framework and Design System for Developers

MelangeCSS is a utility-style CSS framework to allow you to start styling pages right away without having to write much, if any, CSS.  It provides a basic design system based on a set of spacings, font sizes, and colors that is suitable for any basic app.

## Install

Include this in your `.html` files' `<head>` section:

```
CDN LINK
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

Melange also provides classes to target specific media queries.  By default, Melange classes assume to apply to any
device, in particular a mobile device.  Melange requires that you adopt a mobile-first design philosophy, because
overrides only apply at larger screen sizes.

For example, suppose that our button needed a different font size on mobile than desktop.  You'd achieve this by setting
the font-size for mobile, then overriding it for "not small" screens:

```html
<a href="#" class="f-2 f-3-ns ba br-3 ph-3 pv-2 tc">Click Me!</a>
```

Melange's classes are chosen based on two guiding principles:

* You do not need an infinite number of sizes of things
* The class names should themselves be designed aroudn consistency, intuitiveness, and brevity

### You Do Not Need Infinite Sizes

Designers have long employed grid-based designs, which means that elements placement and size woudl conform to a grid.
For example, an element might be 10px wide or 5px wide, but never 7px wide.  Grid-based design allows the designer to
eliminate huge amounts of possible designs and focus on a relatively small number they can audition to find the right
one.

Melange, like Tachyons before it, embraces this.  While some CSS properties, like the aforementioned `display` only have
so many values, other properties, like `padding` or `font-size` have an infinite number of possible values.  Melange
provides classes to set these properties to only a few values, assuming that these will be sufficient for most tasks.

For example, `ph-3` sets the horizontal padding of an element to the third step of the scale.  An element using `ph-2`
would have very obviously smaller horizontal padding, and `ph-4` would similarly have very obviously larger padding.
This grid-based design system works well for the web, because pixel-perfect designs are rarely achievable given the wide
variety of screen sizes and display orientations.

The specific values of the second or third steps of the scale can be anything, and Melange provides you with a solid
default. You can change it easily.

Of note, for those familiar with TailwindCSS, this aspect of Melange (and Tachyons) is a fundamental difference.  Whereas
Tailwind provides over 100 values for padding, Melange provides 7.  7 is enough for most needs and this creates other
benefits to be discussed (notable: no build step to eliminate unused classes).

## Class names should be designed around consistency, intuitiveness, and brevity

`ph-3` is not friendly to newcomers, nor is `dib` or `f4`.  These classnames do, however, reward those that learn them,
as well as the underlying naming convention on which they are based.  And they are not as hard to learn as you might
think, especially if you know CSS. If you do not know CSS well, you should be using Bootstrap or Bulma.

Consider `display`.  It has some common values: `none`, `block`, `inline`, and `inline-block`.  An initialism of the
property and these values yields `dn`, `db`, `di`, and `dib`.  If you had merely memorized that `db` was `display:
block`, you could guess that `display: none` could be achieved with `dn` and you would be right.

The more you learn the class required to set a specific value for a specific property, the more likely you are to guess
the class name required to set that property to another value, and the less you will need to examine the documentation as
you work.

*Only through a grid-based design system and a consistent, terse naming convention can you achieve the best of a
utilitiy-based CSS library*

See [the reference docs](#) or the [component gallery](#) to get started.

You may have a few questions:

* [Why would I use this style of CSS?](#)
* [Why would I not just use Tailwind?](#)
* [How do I manage the duplication that would occur?](#)
* [How do I configure or change things?](#)



