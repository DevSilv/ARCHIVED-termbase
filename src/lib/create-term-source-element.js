export default function createTermSourceElement(termSourceContent, isURI) {
    // The parameter "termSourceContent" is expected to be a native JavaScript object.
    // The function returns an HTML element.

    const termSourceElement = document.createElement("LI");
    termSourceElement.classList.add("term__source");

    // TERM SOURCE'S CONTENT

    // Term source's content element

    const termSourceContentElement = document.createElement("P");
    termSourceElement.appendChild(termSourceContentElement);

    // Term source's content value

    let termSourceValueElement = undefined;
    let termSourceValue = undefined;
    if (!isURI) {
        // Any string except a URI
        termSourceValue = document.createTextNode(termSourceContent);
        termSourceContentElement.appendChild(termSourceValue);
    } else {
        // A URI
        termSourceValueElement = document.createElement("A");
        termSourceContentElement.appendChild(termSourceValueElement);
        termSourceValueElement.setAttribute("href", termSourceContent);
        const termSourceValue = document.createTextNode(termSourceContent);
        termSourceValueElement.appendChild(termSourceValue);
    }

    return termSourceElement;
}