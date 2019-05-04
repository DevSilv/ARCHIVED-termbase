# Remarks

## Vieport size remarks

- Recommended minimum width of viewport is 384px (3 * 128px). The application may be usable with smaller viewport width values, but was not designed for them.
- Recommended minimum height of viewport is 512px (4 * 128px). The application may be usable with smaller viewport height values, but was not designed for them.

## HTML remarks

- Although in a two places there would fit the unordered list HTML element (`<ul>`) as a container for HTML elements, I have chosen not to use any there. These places include the buttons for document's actions and the controls of the form for adding new term. I decided to do so because of CSS class naming inconsistencies appearing when dealing with an additional parent-child dependency level. When trying to deal with such naming incosistencies, the only way that was coming to my mind was to get rid of class names for list elements. But this was causing that selectors needed to be constructed in a less elegant form (for example, using the child selector `>`).

## CSS remarks

- Used CSS naming methodology: slightly modified BEM.

## Additional remarks

- Having problems with aligning CSS containers, a thought came to my mind: if I am having such problems WHEN DEALING WITH THE CSS API, then what problems shall the implementers of new CSS features have, when dealing with the CSS language interpreter source code?...

## Not solved problems

- There may be a situation when the property list, action list or source list elements of a term are displayed partially outside the viewport, the term being displayed properly. So far, no good solution have come to my mind how to solve it.