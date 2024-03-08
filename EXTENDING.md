# Extending Melange CSS

## Adding your own styles

Goal is to create a class, and then create `.css` that has that class, plus the class at the given media queries using the naming
convention + pseudo selectors as needed.

```
npx melange -i input.css -o output.css -s «selectors» -p «pseudo-selectors»
```

1. Parse input.css making some assumptions:
   - it must be `.selector {` followed by rules, followed by `}`. Nothing else fancy is supported
2. For each media query in the metadata.json that is part of selectors and each pseudo selector, produce CSS
