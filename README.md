# Melange - CSS Utility Framework and Design System

MelangeCSS is a utility-style CSS framework to allow you to start styling pages right
away without having to write much, if any, CSS.  It provides a basic design system based
on a set of spacings, font sizes, and colors that is suitable for any basic app.

Melange is designed around _gradual customization_, which means that commonly-need
customizations like fonts and colors are easy to do, whiel complex customizations like
breakpoints and number of steps in a scale are possible.

## We Already Have Tailwind

Tailwind does not include a design system. Tailwind works by providing a very large set
of classes to handle almost any styling need. It then runs a build step inside your
project on every change to produce only that CSS needed to achieve your goals.

Melange is more like Tachyons in that it provides a vastly smaller amoutn of CSS at the
cost of flexibilty.  The idea is that where Tailwind provides near infinite font sizes
(e.g.), Melange provides eight, and that any design or styling need can be met with one
of those eight sizes (though this customizable).

As such, Melange requires no build step in your applicaiton. Once it's installed, it's in
your app to use however you like.

## Install

You can use Melange right now via CDN:

```
CODE
```

This version provides minimal customization options.

## Values, Theory, and Architecture

Melange is based on these core values:

* "Pixel Perfect" is a non-sequiter given the wide variety of devices used to view a web
page.
* 90% of styling needs can be met with a minimal number of values for each CSS property
* The remaining 10% should be possible with minimal duplication of existing design system
decisions.
* CSS is not the unit of re-use - CSS, JS, and HTML together are
* The semantics of markup are not defined by CSS but my the markup itself, via the use of appropriate elements and `aria-` attributes.

Melange is great for:

* A lone developer doing almost everything, including design
* Small teams where UX and Visual Design is presented as a treatment, leaving finer
details to the team itself
* Apps and websites where the team controls the markup, CSS, and JS

Melange is a bad for:

* Teams where a designer hands off a series of pictures of the app or website and the
team that the team is expected to produce with perfect fidelity.
* Apps where markup is generated and the team cannot easily control the element names or
attributes.
* Teams where there is no general understanding of CSS and instead heavy reliance on
"batteries included" frameworks like Bootstrap.

### Architecture

Melange is made up of three parts:

* Meta Theme - This is JavaScript code that is more like configuration.  It defines the
number of steps in the scale, number of colors, number of tints per color, etc.  It does
not define what the scale steps are nor what the colors are.  For example, the Meta Theme
is where "there are 8 font sizes" is encoded.
* Theme - These are JavaScript files that use the Meta Theme to produce CSS.  The Theme
is where the actual font sizes and colors are defined.
* Core - This is the JavaScript code used by Melange to take a Meta Theme and Theme and
produce CSS and documentation.

Users of Melange don't need to interact with any of this, however developers may modify
the theme or meta theme if needed.

## Usage

Melange includes documentation that shows what all the classes available are and what
they do.  In general, most classes are shorthand for setting a specific CSS property to a
specific value, where the value is one of a small number in your scale.  For example, to
set text to take up the entire width on mobile devices, but have a maximum width of the 6th size in the scale for all others, and a font size that is one step larger than the body font, in a dark grey you would write this:

```html
<p class="mw-auto ns-mw6 f3 gray-darkest">
  This is some text.
</p>
```

Note a few things:

* Melange does not abstract CSS. You must understand CSS to use it.
* While Melange's classes appear equivalent to inline styles, inline styles cannot use
media queries and they have a higher specificity than classes.
* it does not take long to memorize the class names or the underlying naming convention
to properly guess them.

### Re-use

If you find yourself repeating the same series of classes over and over again, you may
think you want to create a class, for example `btn` to wrap something like `ph3 pv2 br3
ba` or something.

First, do you *really* need to re-use the classes?  A surprising number of elements end
up having a unique set of CSS properties and values, meaning the abstraction of those
properties and values creates a drag on your team.

Second, note that the re-use you seek is the re-use of a *component*.  CSS, while necessary to the definition of a component, is not sufficient.  You need also markup, along with perhaps JavaScript and back-end support.

Thus, your app's templating system is the logical place for re-usable components to be
managed.  For example, here is a Rails helper:

```ruby
def button_component
  content_tag("button", class: "ph3 pv2 br3 ba")
end
```

Let your app's needs and architecture guide both *when* to create a re-usable compoment
and *how* to do so.  Creating a new clas in a `.css` file is rarely the best way to do
this.

## Customization

There are four levels of customization options for Melange, each more complex, depending
on your needs.

### Simple Extension

When installing via CDN or by dropping `melange.css` into your project, you can only
customization Melange via extending it using variables.

At the top of `melange.css` are a series of variables that drive the underlying design
system.  You can create new classes using these variables, for example:

```css
.p8 {
    padding: cal(2 * --melange-spacing7);
}
```

Variables cannot be used for breakpoints, so creating new classes for each breakpoint
will require duplication.

### Simple Configuration

To change the values of Melange's variables—for example to modify the color pallette—you
will need to install Melange via a package manager, or download the simple configuration
version.  This will result in two files you must include in your project:

* `melange-variables.css`
* `melanage.css`

The former file is *just* the variables Melange uses.  When installed this way **you own
that file** and can make changes to it as needed.  `melange.css` relies on the variables
in this file.  Meaning: you can update `melange.css` to get changes and bugfixes, but
maintain your customizsations inside `melange-variables.css`

For example, you might wish to change the font scale.  You could do this by replacing all
declarations of `--melange-fontSize*` with your own:

```css
--melange-fontSize1: 0.5rem;
--melange-fontSize2: 1rem;
--melange-fontSize3: 1.5rem;
--melange-fontSize4: 1.5rem;
--melange-fontSize5: 2rem;
--melange-fontSize6: 4rem;
--melange-fontSize7: 6rem;
--melange-fontSize8: 10rem;
```

Not that you *must* set a value for every variable, and you cannot add steps. In the
above example, declaring `--melange-fontSize9` will have no effect on the contents of
`melange.css`.

You can use Simple Extension techniques here, if needed. Note that you cannot change the breakpoints using Simple Configuration.

### Advanced Extension

Advanced extension allows for adding new sets of classes using breakpoints and variables
with the support of Melange tooling.  This addresses the problems with referencing
breakpoints, allows for the addition of classes needed (e.g. if you want a spacing between sizes 4 and 5 called "4-and-a-half" that is available for all breakpoints and all spacing-related properties) but without a runtime or build-time dependency on Melange.

```
> melanage extend spacing 4-and-a-half
```

This would create the variable `--melanage-spacing-4-and-a-half` in your
`melange-variables.css` file and create all the classes that rely on a spacing variable
at all breakpoints in `melange-extensions.css`.

This is a one time and one-way change.  You own this generated code, melange just helped
write it.

### Advanced Configuration

If you need a different number of steps in your scales, different or more breakpoints, or
generally want to use Melange to create your own utility-first CSS framework, you will
need to use Advanced Configuration.  This will result in a build-time dependency on
melange, however you will only need to execute melange as needed when you change
configuration (and not every time you change a file).

Installing melange this way will generate a series of JavaScript configuration files that
use Melange's data structures.  It will also generate a main JavaScript file that brings
it all together and will produce a `melange.css` file based on your configuration.
Documentation will also be produced.

For example, to changef breakpoints, you would modify `breakpoints.js` to look like so:

```javascript
import { DefaultBreakpoint, Breakpoint }         from "../lib/Breakpoint.js"

const breakpoints = [
  new DefaultBreakpoint(),
  new Breakpoint({variableNameQualifier: "ns", minWidth: "40em"}),
  new Breakpoint({variableNameQualifier: "m",  minWidth: "40em", maxWidth: "70em"}),
  new Breakpoint({variableNameQualifier: "l",  minWidth: "70em", maxWidth: "90em"}),
  new Breakpoint({variableNameQualifier: "xl", minWidth: "90em"}),
]
export {
  breakpoints
}
```

When you rebuild your `melange.css`, you will now have classes like `xl-m3`.
