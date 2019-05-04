function createSubcategoryElement(subcategoryContent, sources) {
    // The parameter "subcategoryContent" is expected to be a native JavaScript object.
    // The function returns an HTML element.

    const subcategoryElement = document.createElement("LI");
    subcategoryElement.classList.add("subcategory");

    // SUBCATEGORY'S HEADER

    const subcategoryHeaderElement = document.createElement("HEADER");
    subcategoryElement.appendChild(subcategoryHeaderElement);
    subcategoryHeaderElement.classList.add("subcategory__header");

    // Subcategory's name

    const subcategoryNameElement = document.createElement("H3");
    subcategoryHeaderElement.appendChild(subcategoryNameElement);
    subcategoryNameElement.classList.add("subcategory__name");

    const subcategoryNameValue = document.createTextNode(subcategoryContent["name"]);
    subcategoryNameElement.appendChild(subcategoryNameValue);

    // SUBCATEGORY'S ACTIONS

    const subcategoryActionListElement = document.createElement("UL");
    subcategoryHeaderElement.appendChild(subcategoryActionListElement);
    subcategoryActionListElement.classList.add("subcategory__action-list");

    // Action "remove"

    const subcategoryRemoveActionListItemElement = document.createElement("LI");
    subcategoryActionListElement.appendChild(subcategoryRemoveActionListItemElement);

    const subcategoryRemoveActionElement = document.createElement("BUTTON");
    subcategoryRemoveActionListItemElement.appendChild(subcategoryRemoveActionElement);
    subcategoryRemoveActionElement.classList.add("subcategory__action", "subcategory__remove-action");

    // TODO: How to create an HTML entity in JavaScript?
    const subcategoryRemoveActionValue = document.createTextNode("×");
    subcategoryRemoveActionElement.appendChild(subcategoryRemoveActionValue);
    subcategoryRemoveActionElement.addEventListener("click", function () {
        // somewhat too specific, but very intuitive, I like it
        this.parentNode.parentNode.parentNode.parentNode.remove();
    });

    // GROUPS

    const groupListElement = document.createElement("UL");
    subcategoryElement.appendChild(groupListElement);
    groupListElement.classList.add("group-list");
    if (subcategoryContent["groups"]) {
        for (let groupContent of subcategoryContent["groups"]) {
            const groupElement = createGroupElement(groupContent, sources);
            groupListElement.appendChild(groupElement);
        }
    }

    // NEW GROUP FORM

    // New group form content

    const newGroupFormElementContent = {
        "container": {
            "basic-css-class": "new-item-form--basic--left",
            "full-css-class": "new-item-form--full--left",
            "basic-container-css-class": "new-item-form-container--basic--left",
            "full-container-css-class": "new-item-form-container--full--left"
        },
        "fields": [{
            "label": "New group's name",
            "element-type": "INPUT",
            "id": "add-group-name-input",
            "attributes": [],
            "values": undefined,
            "initial-value": "",
            "always-visible": true,
            "return-data-name": "name",
            "is-array": false
        }]
    };

    // New group form element

    const newGroupFormElement = createNewItemFormElement(
        newGroupFormElementContent,
        function (groupContent) {
            const groupElement = createGroupElement(groupContent, sources);
            groupListElement.appendChild(groupElement);
        }
    );
    subcategoryElement.appendChild(newGroupFormElement);

    return subcategoryElement;
}