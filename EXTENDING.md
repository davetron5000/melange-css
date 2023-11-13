# Extending Melange CSS

## Changing the colors & sizes

Melange ships with CSS custom properties that you can change.  This is documented

## Changing the # of steps, # of colors, breakpoints, or other major things.

Clone this repo and modify `src/js/melange/melange.js` and any file it includes.

## Adding your own styles

:active

Suppose you want to add your own style for something, but want it to have melange's media queries or pseudo-selectors.

1. Define your class as normal CSS in any file you like.  For example `src/css/custom.melange.css`

   ```css
   .ts-tron {
      text-shadow:
        0 0 2px #74F7FF,
        0 0 4px #74F7FF,
        0 0 7px #74F7FF,
        0 0 9px #0af,
        0 0 11px #0bf,
        0 0 13px #0cf,
        0 0 15px #0df;
   }
   ```
2. Run `npx melange custom-css src/css/custom.melange.css app/assets/stylesheets/melange-customizations.css`
3. This will produce `.ts-tron`, `.ts-tron-ns`, `.ts-tron-m`, and `.ts-tron-l` in `app/assets/stylesheets/melange-customizations.css`



