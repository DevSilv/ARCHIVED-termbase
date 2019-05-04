function createGroupElement(groupContent, sources) {
    // The parameter "groupContent" is expected to be a native JavaScript object.
    // The function returns an HTML element.

    const groupElement = document.createElement("LI");
    groupElement.classList.add("group");

    // GROUP'S HEADER

    const groupHeaderElement = document.createElement("HEADER");
    groupElement.appendChild(groupHeaderElement);
    groupHeaderElement.classList.add("group__header");

    // Group's name

    const groupNameElement = document.createElement("H4");
    groupHeaderElement.appendChild(groupNameElement);
    groupNameElement.classList.add("group__name");

    const groupNameValue = document.createTextNode(groupContent["name"]);
    groupNameElement.appendChild(groupNameValue);

    // GROUP'S ACTIONS

    const groupActionListElement = document.createElement("UL");
    groupHeaderElement.appendChild(groupActionListElement);
    groupActionListElement.classList.add("group__action-list");

    // "Remove group" action

    const groupRemoveActionListItemElement = document.createElement("LI");
    groupActionListElement.appendChild(groupRemoveActionListItemElement);

    const groupRemoveActionElement = document.createElement("BUTTON");
    groupRemoveActionListItemElement.appendChild(groupRemoveActionElement);
    groupRemoveActionElement.classList.add("group__action", "group__remove-action");

    // TODO: How to create an HTML entity in JavaScript?
    const groupRemoveActionValue = document.createTextNode("×");
    groupRemoveActionElement.appendChild(groupRemoveActionValue);
    groupRemoveActionElement.addEventListener("click", function () {
        // somewhat too specific, but very intuitive, I like it
        this.parentNode.parentNode.parentNode.parentNode.remove();
    });

    // TERMS

    const termListElement = document.createElement("UL");
    groupElement.appendChild(termListElement);
    termListElement.classList.add("term-list");
    if (groupContent["terms"]) {
        for (let termContent of groupContent["terms"]) {
            const termElement = createTermElement(termContent, sources);
            termListElement.appendChild(termElement);
        }
    }

    // NEW TERM FORM

    // New term form content

    const newTermFormElementContent = {
        "container": {
            "basic-css-class": "new-item-form--basic--right",
            "full-css-class": "new-item-form--full--right",
            "basic-container-css-class": "new-item-form-container--basic--right",
            "full-container-css-class": "new-item-form-container--full--right"
        },
        "fields": [{
            "label": "New term's name",
            "element-type": "INPUT",
            "id": "add-term-name-input",
            "attributes": [],
            "values": undefined,
            "initial-value": "",
            "always-visible": true,
            "return-data-name": "name",
            "is-array": false
        }, {
            "label": "Other names",
            "element-type": "INPUT",
            "id": "add-term-other-names-input",
            "attributes": [],
            "values": undefined,
            "initial-value": "",
            "always-visible": false,
            "return-data-name": "other-names",
            "is-array": true
        }, {
            "label": "Source",
            "element-type": "INPUT",
            "id": "add-term-source-input",
            "attributes": [],
            "values": undefined,
            "initial-value": "",
            "always-visible": false,
            "return-data-name": "sources",
            "is-array": true
        }, {
            "label": "Experience",
            "element-type": "SELECT",
            "id": "add-term-experience-input",
            "attributes": [],
            "values": [
                "Only read about",
                "Used once",
                "Used many times"
            ],
            "initial-value": 0,
            "always-visible": false,
            "return-data-name": "experience",
            "is-array": false
        }, {
            "label": "Is to learn",
            "element-type": "INPUT",
            "id": "new-term-is-to-learn-input",
            "attributes": [{
                "name": "type",
                "value": "checkbox"
            }],
            "values": undefined,
            "initial-value": false,
            "always-visible": false,
            "return-data-name": "is-to-learn",
            "is-array": false
        }, {
            "label": "Is a project done",
            "element-type": "INPUT",
            "id": "new-term-is-project-done-input",
            "attributes": [{
                "name": "type",
                "value": "checkbox"
            }],
            "values": undefined,
            "initial-value": false,
            "always-visible": false,
            "return-data-name": "is-project-done",
            "is-array": false
        }]
    };

    // New term form element

    const newTermFormElement = createNewItemFormElement(
        newTermFormElementContent,
        function (termContent) {
            const termElement = createTermElement(termContent);
            termListElement.appendChild(termElement);
        }
    );
    groupElement.appendChild(newTermFormElement);

    return groupElement;
}