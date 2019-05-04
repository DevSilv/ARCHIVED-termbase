/*{
    "container": {
        "initial-css-classes": ["List of classes for item's for container element"],
        "other-css-classes" : ["Other CSS classes"]
    },
    "fields": [{
        "label": "The label for item's form field; the value for the '<LABEL>' HTML element bound to the form element.",
        "element-type": "The type of item's form field; the name of the HTML element to be created.",
        "id": "The ID of item's form field; it is needed for the attribute 'for' of '<LABEL>' HTML element.",
        "attributes": [{
            "name": "",
            "value": ""
        }],
        "values": ["List of all possible values for item's form field; shall be 'undefined' for HTML elements without the possibility of specifying a set of possible values."],
        "initial-value": "The default value for item's form field; for character inputs - the value for the attribute 'value' (?) (string (?)), for checkboxes - the value for the attribute 'checked' (boolean), for selects - the value for the attribute 'selectedindex' (number) etc.'",
        "always-visible": "The value indicating whether the form field shall be visible when not being used.",
        "return-data-name": "Return data name",
        "is-array": "boolean"
    }]
}*/

function createNewItemFormElement(formContent, formSubmitFunction) {
    const newItemFormContainerElement = document.createElement("DIV");
    newItemFormContainerElement.classList.add(formContent["container"]["basic-container-css-class"]);

    const newItemFormElement = document.createElement("SECTION");
    newItemFormContainerElement.appendChild(newItemFormElement);
    newItemFormElement.classList.add("new-item-form");
    newItemFormElement.classList.add(formContent["container"]["basic-css-class"]);

    const newItemFormFieldElementList = []; // a helper list of references to all form field elements
    const newItemFormFieldAlwaysVisibleElementList = []; // a helper list of references to always visible form field elements
    const newItemFormFieldHiddenElementList = []; // a helper list of references to hidden form field elements
    const newItemFormFieldValueRequiredElementList = []; // a helper list of references to those form field elements which require user input
    const newItemFormReturnDataMap = []; // a helper list for returning data

    for (let field of formContent["fields"]) {
        const newItemFormFieldLabelElement = document.createElement("LABEL");
        newItemFormElement.appendChild(newItemFormFieldLabelElement);
        newItemFormFieldLabelElement.classList.add(
            "new-item-form__field-container",
            "new-item-form__field-label"
        );
        if (field["always-visible"]) {
            newItemFormFieldAlwaysVisibleElementList.push(newItemFormFieldLabelElement);
        } else {
            newItemFormFieldLabelElement.classList.add("new-item-form__field--hidden");
            newItemFormFieldHiddenElementList.push(newItemFormFieldLabelElement);
        }

        const newItemFormFieldLabelValue = document.createTextNode(field["label"]);
        newItemFormFieldLabelElement.appendChild(newItemFormFieldLabelValue);

        newItemFormFieldLabelElement.setAttribute("for", field["id"]);

        const newItemFormFieldElement = document.createElement(field["element-type"]);
        newItemFormElement.appendChild(newItemFormFieldElement);
        newItemFormFieldElement.classList.add(
            "new-item-form__field-container",
            "new-item-form__field"
        );
        newItemFormFieldElementList.push(newItemFormFieldElement);
        if (field["always-visible"]) {
            newItemFormFieldAlwaysVisibleElementList.push(newItemFormFieldElement);
        } else {
            newItemFormFieldElement.classList.add("new-item-form__field--hidden");
            newItemFormFieldHiddenElementList.push(newItemFormFieldElement);
        }

        newItemFormFieldElement.setAttribute("id", field["id"]);

        field["attributes"].forEach(
            elem => newItemFormFieldElement.setAttribute(elem.name, elem.value)
        );

        switch (field["element-type"].toUpperCase()) {
            case "INPUT":
                if (field["attributes"].find(elem => elem.name === "type" && elem.value === "checkbox")) {
                    // A checkbox
                    newItemFormFieldElement.checked = field["initial-value"];
                    newItemFormFieldElement.classList.add("new-item-form__field--aligned-left");
                    newItemFormReturnDataMap.push({
                        "name": field["return-data-name"],
                        "element": newItemFormFieldElement,
                        "value-attribute-name": "checked",
                        "is-array": field["is-array"],
                        "default-value": false
                    });
                } else {
                    // A character input
                    newItemFormFieldElement.value = field["initial-value"];
                    newItemFormFieldValueRequiredElementList.push(newItemFormFieldElement);
                    newItemFormReturnDataMap.push({
                        "name": field["return-data-name"],
                        "element": newItemFormFieldElement,
                        "value-attribute-name": "value",
                        "is-array": field["is-array"],
                        "default-value": ""
                    });
                    // console.log(field["return-data-name"]);
                }
                break;
            case "SELECT":
                field["values"].forEach(elem => {
                    const newItemFormFieldOptionElement = document.createElement("OPTION");
                    newItemFormFieldElement.appendChild(newItemFormFieldOptionElement);

                    const newItemFormFieldOptionValue = document.createTextNode(elem);
                    newItemFormFieldOptionElement.appendChild(newItemFormFieldOptionValue);
                });
                newItemFormFieldElement.selectedIndex = field["initial-value"];
                newItemFormReturnDataMap.push({
                    "name": field["return-data-name"],
                    "element": newItemFormFieldElement,
                    "value-attribute-name": "selectedIndex",
                    "is-array": field["is-array"],
                    "default-value": 0
                });
                break;
        }
    }

    // Event handlers

    newItemFormFieldElementList.forEach(elem => {
        // Listener for hiding form fields on the blur of any form field
        elem.addEventListener("blur", function (event) {
            // The following condition might check also whether the user has not focused the parent
            //  but it cannot, since some elements return "null", for some reason (yet uknown to me).
            if (!event.relatedTarget ||
                !newItemFormFieldElementList.includes(event.relatedTarget)) {
                newItemFormFieldHiddenElementList.forEach(e => {
                    e.classList.add("new-item-form__field--hidden");
                });
                if (formContent["container"]["basic-css-class"] && formContent["container"]["full-css-class"]) {
                    // If empty strings, they are neither to add nor remove (assumed that empty string == false)
                    newItemFormElement.classList.add(formContent["container"]["basic-css-class"]);
                    newItemFormElement.classList.remove(formContent["container"]["full-css-class"]);
                }

                // Reset input elements' values
                newItemFormReturnDataMap.forEach(e => e["element"][e["value-attribute-name"]] = e["default-value"]);
            }
        })

        // Listener for submitting new item on enter-key-pressed
        elem.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                // Validate form input elements' values

                if (newItemFormFieldValueRequiredElementList.map(e => e.value).includes("")) {
                    // TODO: should there be the keyword "new" below, or should it not?
                    throw new Error("Fill in all the character input fields");
                }

                // Get form input elements' values

                newItemContent = {};
                newItemFormReturnDataMap.forEach(e => {
                    newItemContent[e["name"]] = e["is-array"] ? [e["element"][e["value-attribute-name"]]] : e["element"][e["value-attribute-name"]]
                });

                // Submit new item

                // console.log(newItemFormReturnDataMap);
                // console.log(newItemContent);
                formSubmitFunction(newItemContent);

                // Reset input elements' values

                newItemFormReturnDataMap.forEach(e => e["element"][e["value-attribute-name"]] = e["default-value"]);
            }
        });
    });

    // Listener for showing form fields on always-visible-fields' focus
    newItemFormFieldAlwaysVisibleElementList.forEach(elem => {
        elem.addEventListener("focus", function () {
            newItemFormFieldHiddenElementList.forEach(e => {
                e.classList.remove("new-item-form__field--hidden");
            });

            if (formContent["container"]["basic-css-class"] && formContent["container"]["full-css-class"]) {
                // If empty strings, they are neither to add nor remove (assumed that empty string == false)
                newItemFormElement.classList.add(formContent["container"]["full-css-class"]);
                newItemFormElement.classList.remove(formContent["container"]["basic-css-class"]);
            }

            if (formContent["container"]["full-container-css-class"] && formContent["container"]["basic-container-css-class"]) {
                // If empty strings, they are neither to add nor remove (assumed that empty string == false)
                newItemFormContainerElement.classList.add(formContent["container"]["full-container-css-class"]);
                newItemFormContainerElement.classList.remove(formContent["container"]["basic-container-css-class"]);
            }
        });

        elem.addEventListener("blur", function () {
            if (formContent["container"]["basic-css-class"] && formContent["container"]["full-css-class"]) {
                // If empty strings, they are neither to add nor remove (assumed that empty string == false)
                newItemFormElement.classList.add(formContent["container"]["basic-css-class"]);
                newItemFormElement.classList.remove(formContent["container"]["full-css-class"]);
            }

            if (formContent["container"]["full-container-css-class"] && formContent["container"]["basic-container-css-class"]) {
                // If empty strings, they are neither to add nor remove (assumed that empty string == false)
                newItemFormContainerElement.classList.add(formContent["container"]["basic-container-css-class"]);
                newItemFormContainerElement.classList.remove(formContent["container"]["full-container-css-class"]);
            }
        })
    });

    return newItemFormContainerElement;
}