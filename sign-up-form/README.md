# Sign Up Form
## Overview
This web page features an image, brand name and fields for completing a sign up form.

## Concepts practised
- The responsive design shown uses vanilla CSS with flexbox without media queries.  Without media queries, less data is needed to be downloaded for this page to load.  Faster load times promotes better conversion rates.
- Javascript was implemented to perform validation on the field inputs at the front end so that validation at the server end is delayed until the form is filled out as correctly as possible.  Validation performed at the front end keeps the user session client-side, reducing any delays in the sign up process which could occur if the form was posted to the server side, validation performed and a response returned.
- A minimum.css file was used to overwrite browser padding and margin to 0.
- The minimum.css file set `box-sizing` to `border-box`.  This rule ensures that padding and borders for the element takes up the space it has been set.  The bounding box takes up the space it has been set rather than allowing padding and border sizing to be added on top of the allocated space.  This particular styling works well with flexbox as the elements can be centered easily, along the main axis and cross axis of the flex-direction.  If flexbox wasn't used in this context, box-sizing using border-box can result in unusual layouts.
- Using `--variable-name:` properties to declare values that can be used in different contexts.  This keeps the code DRY.  The variable can be called and set with the use of `var(--variable-name)`
- Background setup: usage of different properties to achieve the best result.
  - `background-position` can be set up so that the focus is on a specific location as the dimensions of the box changes.  In this context, the hand of the sculpture was the main feature showcase.  No hard and fast rule for this, but trial and error setting two percentage values on the background-position. 
  - `background-size` being set to `cover` ensures that the background image spans the box as it grows smaller or bigger than the image's default size.
- Setting the width is important for this container as without it, the container will only be the width of the contents within it instead of understanding that it needs to allocate width for the image it is showing.  The width for the `.hero` element was set to 100%.  The width of the `.hero` item has knock-on effects with its neighbouring flex-item `main` which is the second half of this sign-up page.
- As above, the given width for `.hero` is 100%.  Thereafter we assess the width behaviour in relation to the `.main` element with different width properties.
  - when `main` width is not set, the `.hero` image occupies less space than it could, with the extra space taken up by `main` instead, resulting in a poorer distribution of space. 
  - When `main` width is set to 100%, both elements `.hero` and `.main` occupy a 1:1 proportion within the space they share.
  - When `main` width is set to 180%, the proportion of space occupied with `.hero` and `main` is now 1:1.8, meaning that `main` takes up a greater proportion of space than `.hero` at any given moment.  This relationship offers reponsive design, and maintains itself right up to 375px widths without any javascript!
  - Further research on flex-grow, flex-shrink and flex-basis could create a better result.
- As with the width requiring a measurement, the height also needs this otherwise the size of the box will amount only to the sizeable elements contained within it, i.e. the brand name box and the credit box.  This rule holds true for the `.hero` node as a child to the `body` node.  Therefore both the `body` element and the `.hero` elements need their heights set to 100vh so that the background image spans the entire height.
- The viewport height excludes overflow though, so if the `.main` element did not have the `overflow-y` property set to `scroll`, you will encounter a weird artefact where contents within the `.main` element vertically overflow beyond the `body` element when the child elements get wrapped and push the space vertically.

