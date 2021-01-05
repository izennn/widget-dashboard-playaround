# React-grid-layout Playground

For official documentation of the library, please visit [the official GitHub repository](https://github.com/STRML/react-grid-layout).

## Motviation

A playground for design team to understand the potential configurations of react-grid-layout library.

## Getting Started (Running the App) 

Navigate to the project root directory (where the `public` and `src` directories reside), type the command `npm start` for the app to run in development mode.

Once the app is up and running, open [http://localhost:3000](http://localhost:3000) to view it in the browser.


# Configurations

Navigate to `src/components/widgetview/mock-initial-values.tsx`, where you'll see three objects defined: 

1. `mockBreakpoints`
2. `mockCols`
3. `mockLayouts`

## What are breakpoints?

Out of the 3, `mockBreakpoints` is the most important, and the one that affects the other configurations. 

**Breakpoints** is a key/value paired dictionary. The key is a string that represents a sized breakpoint (e.g. 'lg' for large), and its corresponding screen width (e.g. 1200 pixels). As the screen size changes, if the screen size in pixel drops below 1200, then the breakpoint is no longer size 'lg'

## Breakpoints affect other Properties

The other 2 mock values mentioned here, `mockCols`, and `mockLayouts` are also dictionary values, and their keys have to exist within the breakpoints dictionary. For example, if a `mockCols` were to have a key of 'extraBig' defined in its body, but the key 'extraBig' does NOT exist in `mockBreakpoints`, there would be an error. 

As the breakpoint marker changes, e.g. from 'lg' to 'md', the column count also changes from whatever value is defined for the 'lg' key in `mockCols` to the 'md' key in `mockCols`. 

Asides from column count and layout, breakpoint can also affect `rowHeight`, `margin` (margin between items in pixels), and `containerPadding` (padding inside the containeri n px).  