import createNewItemFormElement from "./create-new-item-form-element.js";
import createTermSourceElement from "./create-term-source-element.js";
import isURI from "./is-uri.js";
import "../css/term.css";

export default function createTermElement(termContent, sources) {
    // The parameter "termContent" is expected to be a native JavaScript object.
    // The function returns an HTML element.

    const termElement = document.createElement("LI");
    termElement.classList.add("term");

    // TERM'S MAIN CONTENT

    // The term name element used to be "<span>" (for me better
    //  for inline text), but the double-click select-all does not
    //  work as intended with "<span>" (at least by default),
    //  so I changed the element type to "<p>".
    const termNameElement = document.createElement("P");
    termElement.appendChild(termNameElement);
    termNameElement.classList.add("term__name");

    // Term's name

    const termNameValue = document.createTextNode(termContent["name"]);
    termNameElement.appendChild(termNameValue);

    // Other names of the term

    // I am not sure whether in the expression below
    //  there should be specified a leading space character
    //  (instead of, e.g., some margin).
    if (termContent["other-names"].length > 0) {
        const termOtherNameListValue = document.createTextNode(" (" + termContent["other-names"].join(",") + ")");
        termNameElement.appendChild(termOtherNameListValue);
    }

    // TERM'S ADDITIONAL CONTENT

    // Term's sources

    const termSourceListContainerElement = document.createElement("DIV");
    termElement.appendChild(termSourceListContainerElement);
    termSourceListContainerElement.classList.add("term__source-list-container");

    // New term's source form

    // New term's source form's content

    const newTermSourceFormElementContent = {
        "container": {
            "basic-css-class": "new-item-form--basic--left",
            "full-css-class": "",
            "basic-container-css-class": "new-item-form-container--basic--left",
            "full-container-css-class": ""
        },
        "fields": [{
            "label": "New term's source:",
            "element-type": "INPUT",
            "id": "add-term-source-name-input",
            "attributes": [],
            "values": undefined,
            "initial-value": "",
            "always-visible": true,
            "return-data-name": "source",
            "is-array": false
        }]
    };

    // New term's source form's element

    const newTermSourceFormElement = createNewItemFormElement(
        newTermSourceFormElementContent,
        function (termSourceContent) {
            const termSourceElement = createTermSourceElement(
                termSourceContent["source"],
                isURI(termSourceContent["source"])
            );
            // console.log(termSourceContent);
            // TODO: Is it OK to use "prepend" for prepending an HTML element
            //  just like "appendChild" for appending an HTML element?
            termSourceListElement.prepend(termSourceElement);
        }
    );
    termSourceListContainerElement.appendChild(newTermSourceFormElement);

    // Term source list

    const termSourceListElement = document.createElement("UL");
    termSourceListContainerElement.appendChild(termSourceListElement);
    termSourceListElement.classList.add("term__source-list");
    for (let termSource of termContent["sources"]) {
        let termSourceElement = undefined;
        if (Number.isInteger(termSource)) {
            // A term source's ID (existing or not)
            const termSourceObject = sources.find(x => x["id"] === termSource);
            if (!termSourceObject) {
                // No source from "sources" matches the given ID
                //  (probably wrong ID specified when edited
                //  the file manually instead of the form).
                throw new Error(`The source with the ID === ${termSource} is not present.`);
            }
            termSourceElement = createTermSourceElement(termSourceObject["uri"], isURI(termSourceObject["uri"]));
        } else if (termSource === "myself") {
            // A string "myself"
            termSourceElement = createTermSourceElement(termSource, false);
        } else {
            // Any other string is not allowed
            throw new Error("The source is of not recognizable type.");
        }
        // TODO: Is it OK to use "prepend" for prepending an HTML element
        //  just like "appendChild" for appending an HTML element?
        termSourceListElement.prepend(termSourceElement);
    }

    // Term's properties and actions

    const termActionListAndPropertyListContainerElement = document.createElement("DIV");
    termElement.appendChild(termActionListAndPropertyListContainerElement);
    termActionListAndPropertyListContainerElement.classList.add("term__action-list-and-property-list-container");

    // Term's properties

    const termPropertyListElement = document.createElement("UL");
    termActionListAndPropertyListContainerElement.appendChild(termPropertyListElement);
    termPropertyListElement.classList.add("term__property-list");

    // Property "experience"

    const termExperiencePropertyListItemElement = document.createElement("LI");
    termPropertyListElement.appendChild(termExperiencePropertyListItemElement);

    const termExperiencePropertyElement = document.createElement("DIV");
    termExperiencePropertyListItemElement.appendChild(termExperiencePropertyElement);
    termExperiencePropertyElement.classList.add("term__property", "term__experience-property");

    const termExperienceContentElement = document.createElement("SELECT");
    termExperiencePropertyElement.appendChild(termExperienceContentElement);
    termExperienceContentElement.classList.add("term__experience-property__content");

    // Set all the available options for the property "experience"

    const termExperienceOptionMap = [{
        "key": 0,
        "value": "(no experience)"
    }, {
        "key": 1,
        "value": "Only read about"
    }, {
        "key": 2,
        "value": "Used once"
    }, {
        "key": 3,
        "value": "Used many times"
    }];
    for (let termExperienceOption of termExperienceOptionMap) {
        const termExperienceContentOptionElement = document.createElement("OPTION");
        termExperienceContentElement.appendChild(termExperienceContentOptionElement);

        const termExperienceContentOptionValue = document.createTextNode(termExperienceOption.value);
        termExperienceContentOptionElement.appendChild(termExperienceContentOptionValue);
    }

    // Set the initial option for the property "experience"

    termExperienceContentElement.selectedIndex = termExperienceOptionMap.findIndex(elem => {
        if (elem.key === termContent["experience"]) {
            // Change the term's initial formatting according to the selected option of the property "experience"
            termElement.style.border = `${elem.key}px solid black`;

            return elem.value;
        }
    });

    // Change the term's formatting according to the selected option of the property "experience"

    termExperienceContentElement.addEventListener("change", function () {
        termExperienceOptionMap.findIndex(elem => {
            if (elem.key === termExperienceContentElement.selectedIndex) {
                termElement.style.border = `${elem.key}px solid black`;
            }
        });
    });

    // Property "is to learn"

    const termIsToLearnPropertyListItemElement = document.createElement("LI");
    termPropertyListElement.appendChild(termIsToLearnPropertyListItemElement);

    const termIsToLearnPropertyElement = document.createElement("DIV");
    termIsToLearnPropertyListItemElement.appendChild(termIsToLearnPropertyElement);
    termIsToLearnPropertyElement.classList.add("term__property", "term__is-to-learn-property");

    const termIsToLearnPropertyLabelElement = document.createElement("H5");
    termIsToLearnPropertyElement.appendChild(termIsToLearnPropertyLabelElement);
    termIsToLearnPropertyLabelElement.classList.add("term__property__label", "term__is-to-learn-property__label");

    const termIsToLearnPropertyLabelValue = document.createTextNode("To learn:");
    termIsToLearnPropertyLabelElement.appendChild(termIsToLearnPropertyLabelValue);

    const termIsToLearnPropertyContentElement = document.createElement("SELECT");
    termIsToLearnPropertyElement.appendChild(termIsToLearnPropertyContentElement);
    termIsToLearnPropertyContentElement.classList.add("term__is-to-learn-property__content");

    // Set all the available options for the property "is to learn"

    const termIsToLearnPropertyOptionMap = [{
        "key": true,
        "value": "YES"
    }, {
        "key": false,
        "value": "No"
    }];
    for (let termIsToLearnPropertyOption of termIsToLearnPropertyOptionMap) {
        const termIsToLearnPropertyOptionElement = document.createElement("OPTION");
        termIsToLearnPropertyContentElement.appendChild(termIsToLearnPropertyOptionElement);

        const termIsToLearnPropertyOptionValue = document.createTextNode(termIsToLearnPropertyOption.value);
        termIsToLearnPropertyOptionElement.appendChild(termIsToLearnPropertyOptionValue);
    }

    // Set the initial option for the property "is to learn"

    termIsToLearnPropertyContentElement.selectedIndex = termIsToLearnPropertyOptionMap.findIndex(elem => {
        if (elem.key === termContent["is-to-learn"]) {
            return elem.value;
        }
    });

    // Change the term's formatting according to the selected option of the property "is to learn"

    if (termContent["is-to-learn"] === true) {
        termNameElement.classList.add("term--to-learn");
    }

    termIsToLearnPropertyContentElement.addEventListener("change", function () {
        if (termIsToLearnPropertyContentElement.selectedIndex ===
            termIsToLearnPropertyOptionMap.findIndex(elem => elem.key === true)) {
            termNameElement.classList.add("term--to-learn");
        } else {
            termNameElement.classList.remove("term--to-learn");
        }
    });

    // Property "is project done"

    const termIsProjectDonePropertyListItemElement = document.createElement("LI");
    termPropertyListElement.appendChild(termIsProjectDonePropertyListItemElement);

    const termIsProjectDoneElement = document.createElement("DIV");
    termIsProjectDonePropertyListItemElement.appendChild(termIsProjectDoneElement);
    termIsProjectDoneElement.classList.add("term__property", "term__is-project-done-property");

    const termIsProjectDoneLabelElement = document.createElement("H5");
    termIsProjectDoneElement.appendChild(termIsProjectDoneLabelElement);
    termIsProjectDoneLabelElement.classList.add("term__property__label", "term__is-project-done-property__label");

    const termIsProjectDoneLabelValue = document.createTextNode("A project done:");
    termIsProjectDoneLabelElement.appendChild(termIsProjectDoneLabelValue);

    const termIsProjectDonePropertyContentElement = document.createElement("SELECT");
    termIsProjectDoneElement.appendChild(termIsProjectDonePropertyContentElement);
    termIsProjectDonePropertyContentElement.classList.add("term__is-project-done-property__content");

    // Set all the available options for the property "is project done"

    const termIsProjectDonePropertyOptionMap = [{
        "key": true,
        "value": "YES"
    }, {
        "key": false,
        "value": "No"
    }];
    for (let termIsProjectDonePropertyOption of termIsProjectDonePropertyOptionMap) {
        const termIsProjectDonePropertyOptionElement = document.createElement("OPTION");
        termIsProjectDonePropertyContentElement.appendChild(termIsProjectDonePropertyOptionElement);

        const termIsProjectDonePropertyOptionValue = document.createTextNode(termIsProjectDonePropertyOption.value);
        termIsProjectDonePropertyOptionElement.appendChild(termIsProjectDonePropertyOptionValue);
    }

    // Set the initial option for the property "is project done"

    termIsProjectDonePropertyContentElement.selectedIndex = termIsToLearnPropertyOptionMap.findIndex(elem => {
        if (elem.key === termContent["is-project-done"]) {
            return elem.value;
        }
    });

    // Change the term's formatting according to the selected option of the property "is project done"

    if (termContent["is-project-done"] === true) {
        termElement.classList.add("term--project-done");
    }
    termIsProjectDonePropertyContentElement.addEventListener("change", function () {
        if (termIsProjectDonePropertyContentElement.selectedIndex ===
            termIsProjectDonePropertyOptionMap.findIndex(elem => elem.key === true)) {
            termElement.classList.add("term--project-done");
        } else {
            termElement.classList.remove("term--project-done");
        }
    });

    // Term's actions

    const termActionListElement = document.createElement("UL");
    termActionListAndPropertyListContainerElement.appendChild(termActionListElement);
    termActionListElement.classList.add("term__action-list");

    // Action "toggle sources view"

    const termToggleSourcesViewActionListItemElement = document.createElement("LI");
    termActionListElement.appendChild(termToggleSourcesViewActionListItemElement);

    const termToggleSourcesViewActionElement = document.createElement("BUTTON");
    termToggleSourcesViewActionListItemElement.appendChild(termToggleSourcesViewActionElement);
    termToggleSourcesViewActionElement.classList.add("term__action", "term__toggle-sources-view-action");

    const termToggleSourcesViewActionValue = document.createTextNode("Sources");
    termToggleSourcesViewActionElement.appendChild(termToggleSourcesViewActionValue);
    termToggleSourcesViewActionElement.addEventListener("click", function (event) {
        if (termSourceListContainerElement.style.display === "none" ||
            termSourceListContainerElement.style.display === "") {
            termSourceListContainerElement.style.display = "block";
        } else {
            termSourceListContainerElement.style.display = "none";
        }
    });

    document.getElementsByTagName("body")[0].addEventListener("click", function (event) {
        if (termSourceListContainerElement.style.display === "block" &&
            termSourceListContainerElement !== event.target &&
            !Array.from(termSourceListContainerElement.children).includes(event.target) &&
            !Array.from(termSourceListContainerElement.children).some(elem => Array.from(elem.children).includes(event.target)) &&
            !Array.from(termSourceListContainerElement.children).some(elem => Array.from(elem.children).some(e => Array.from(e.children).includes(event.target))) &&
            termSourceListElement !== event.target &&
            !Array.from(termSourceListElement.children).includes(event.target) &&
            !Array.from(termSourceListElement.children).some(elem => Array.from(elem.children).includes(event.target)) &&
            event.target !== termToggleSourcesViewActionElement) {
            /* This complicated set of conditions is defined
            because I do not know a different way to define
            that the event handler is to be fired on: (1) clicking
            the source list container or (2) any of its children
            (recursive)... */
            termSourceListContainerElement.style.display = "none";
        }
    });

    // Action "remove"

    const termRemoveActionListItemElement = document.createElement("LI");
    termActionListElement.appendChild(termRemoveActionListItemElement);

    const termRemoveActionElement = document.createElement("BUTTON");
    termRemoveActionListItemElement.appendChild(termRemoveActionElement);
    termRemoveActionElement.classList.add("term__action", "term__remove-action");

    // TODO: How to create an HTML entity in JavaScript?
    const termRemoveActionValue = document.createTextNode("×");
    termRemoveActionElement.appendChild(termRemoveActionValue);
    termRemoveActionElement.addEventListener("click", function () {
        // somewhat too specific, but very intuitive, I like it
        this.parentNode.parentNode.parentNode.parentNode.remove();
    });

    // VARIOUS EVENT HANDLERS FOR TERM

    // Fix the displaying of the the container for the term's
    //  property and action lists partially outside the viewport
    // TODO: Is the "mouseenter" event's behavior the same as the "hover" pseudoclass's?
    termElement.addEventListener("mouseenter", function () {
        const termActionListAndPropertyListContainerElementClientRects = termActionListAndPropertyListContainerElement.getClientRects()[0];
        // There is only the left-outside-displaying handled
        //  because the container is by default aligned
        //  to the term's right edge.
        // "Math.floor" is used because client rects may have non-integer values
        if (termActionListAndPropertyListContainerElementClientRects.left < 0) {
            termActionListAndPropertyListContainerElement.style.right = `${
                (!termActionListAndPropertyListContainerElement.style.right ?
                termActionListAndPropertyListContainerElementClientRects.left - 20 :
                termActionListAndPropertyListContainerElement.style.right - termActionListAndPropertyListContainerElementClientRects.left - 20)
            }px`;
        }
    });

    // Fix the displaying of the the container for the term's
    //  source list partially outside the viewport
    termToggleSourcesViewActionElement.addEventListener("click", function () {
        const termSourceListContainerElementClientRects = termSourceListContainerElement.getClientRects()[0];
        if (termSourceListContainerElementClientRects) {
            // If the panel is not hidden (i.e. it is displayed)
            // There is only the right-outside-displaying handled
            //  because the container is by default aligned
            //  to the term's left edge.
            const bodyElementClientRects = document.getElementsByTagName("body")[0].getClientRects()[0];
            // "Math.floor" is used because client rects may have non-integer values
            if (Math.floor(termSourceListContainerElementClientRects.right) - 20 >  Math.floor(bodyElementClientRects.width)) {
                termSourceListContainerElement.style.left = `${
                    -(termSourceListContainerElementClientRects.right - bodyElementClientRects.width - 20)
                }px`;
            }
        }
    })

    return termElement;
}