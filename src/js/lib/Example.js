/*
 * An example of one use of a CSS class.
 */
export default class Example {
  /*
   * htmlForDocs - Minimal HTML to document use of the class.  This would ideally just be a div with the class
   *               on it, but if the class is meaningless without additional classes, those would be here, too.
   *               This should not have anything presentation in it at all.
   * markupForRendering - A superset of the htmlForDocs that will demonstrate the class's behavior.
   *                      This would include any additional styling or classes that are needed to demonstrate
   *                      how the class works.  For example, if documentating floats, this markup
   *                      might surround htmlForDocs with another box that has a border, so that you can see
   *                      the floating aspects.  This is optional.  If omitted, there will be no demonstration of
   *                      the class shown in the docs.
   *
   */
  constructor({ htmlForDocs, markupForRendering }) {
    this.htmlForDocs = htmlForDocs
    this.markupForRendering = markupForRendering
  }

  /* Returns an escaped version of htmlForDocs that can put into markup to document the HTML to use. */
  escapedHtml() { return this.htmlForDocs.replace(/</g,"&lt;").replace(/>/g,"&gt;") }
  markup() { return this.markupForRendering }

  hasMarkup() { return !!this.markupForRendering }
}

