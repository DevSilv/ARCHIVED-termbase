import createSubcategoryElement from "./create-subcategory-element.js";
import createNewItemFormElement from "./create-new-item-form-element.js";
import "../css/category.css";

export default function createCategoryElement(categoryContent, sources) {
    // The parameter "categoryContent" is expected to be a native JavaScript object.
    // The function returns an HTML element.

    const categoryElement = document.createElement("LI");
    categoryElement.classList.add("category");

    // CATEGORY'S HEADER

    const categoryHeaderElement = document.createElement("HEADER");
    categoryElement.appendChild(categoryHeaderElement);
    categoryHeaderElement.classList.add("category__header");

    // Category's name

    const categoryNameElement = document.createElement("H2");
    categoryHeaderElement.appendChild(categoryNameElement);
    categoryNameElement.classList.add("category__name");

    const categoryNameValue = document.createTextNode(categoryContent["name"]);
    categoryNameElement.appendChild(categoryNameValue);

    // Category's actions

    const categoryActionListElement = document.createElement("UL");
    categoryHeaderElement.appendChild(categoryActionListElement);
    categoryActionListElement.classList.add("category__action-list");

    // Remove category action

    const removeCategoryActionListItemElement = document.createElement("LI");
    categoryActionListElement.appendChild(removeCategoryActionListItemElement);

    const removeCategoryActionElement = document.createElement("BUTTON");
    removeCategoryActionListItemElement.appendChild(removeCategoryActionElement);
    removeCategoryActionElement.classList.add("category__action", "category__remove-action");

    // TODO: How to create an HTML entity in JavaScript?
    const removeCategoryActionValue = document.createTextNode("×");
    removeCategoryActionElement.appendChild(removeCategoryActionValue);
    removeCategoryActionElement.addEventListener("click", function () {
        // somewhat too specific, but very intuitive, I like it
        this.parentNode.parentNode.parentNode.parentNode.remove();
    });

    // SUBCATEGORIES

    const subcategoryListElement = document.createElement("UL");
    categoryElement.appendChild(subcategoryListElement);
    subcategoryListElement.classList.add("subcategory-list");
    if (categoryContent["subcategories"]) {
        for (let subcategoryContent of categoryContent["subcategories"]) {
            const subcategoryElement = createSubcategoryElement(subcategoryContent, sources);
            subcategoryListElement.appendChild(subcategoryElement);
        }
    }

    // NEW SUBCATEGORY FORM

    // New subcategory form's content

    const newSubcategoryFormElementContent = {
        "container": {
            "basic-css-class": "new-item-form--basic--left",
            "full-css-class": "new-item-form--full--left",
            "basic-container-css-class": "new-item-form-container--basic--left",
            "full-container-css-class": "new-item-form-container--full--left"
        },
        "fields": [{
            "label": "New subcategory's name",
            "element-type": "INPUT",
            "id": "add-subcategory-name-input",
            "attributes": [],
            "values": undefined,
            "initial-value": "",
            "always-visible": true,
            "return-data-name": "name",
            "is-array": false
        }]
    };

    // New subcategory form's element

    const newSubcategoryFormElement = createNewItemFormElement(
        newSubcategoryFormElementContent,
        function (subcategoryContent) {
            const subcategoryElement = createSubcategoryElement(subcategoryContent, sources);
            subcategoryListElement.appendChild(subcategoryElement);
        }
    );
    categoryElement.appendChild(newSubcategoryFormElement);

    return categoryElement;
}