function createMarkup(content) {
    // The parameter "content" is expected to be a native JavaScript object.
    // The function returns an HTML element.

    const documentContainer = document.createElement("DIV");
    documentContainer.classList.add("document");

    // DOCUMENT'S HEADER

    const documentHeaderElement = document.createElement("HEADER");
    documentContainer.appendChild(documentHeaderElement);
    documentHeaderElement.classList.add("document__header");

    const documentTitleElement = document.createElement("H1");
    documentHeaderElement.appendChild(documentTitleElement);
    documentTitleElement.classList.add("document__header__header-field", "document__title");
    
    const documentTitleValue = document.createTextNode(content["document"]["title"]);
    documentTitleElement.appendChild(documentTitleValue);

    // Author

    const documentAuthorContainerElement = document.createElement("DETAILS");
    documentHeaderElement.appendChild(documentAuthorContainerElement);
    documentAuthorContainerElement.classList.add("document__header__header-field", "document__author");
    
    const documentAuthorHeaderElement = document.createElement("SUMMARY");
    documentAuthorContainerElement.appendChild(documentAuthorHeaderElement);
    documentAuthorHeaderElement.classList.add("document__author__header");
    
    const documentAuthorTitleElement = document.createElement("H3");
    documentAuthorHeaderElement.appendChild(documentAuthorTitleElement);
    
    const documentAuthorTitleValue = document.createTextNode("Author");
    documentAuthorTitleElement.appendChild(documentAuthorTitleValue);
    
    const documentAuthorElement = document.createElement("P");
    documentAuthorContainerElement.appendChild(documentAuthorElement);
    
    const documentAuthorValue = document.createTextNode(content["document"]["author"]);
    documentAuthorElement.appendChild(documentAuthorValue);

    // Modifications

    // TODO: auto-handling updating of the modification dates' list

    const documentModificationDateListContainerElement = document.createElement("DETAILS");
    documentHeaderElement.appendChild(documentModificationDateListContainerElement);
    documentModificationDateListContainerElement.classList.add("document__header__header-field", "document__modification-date-list");
    
    const documentModificationDateListHeaderElement = document.createElement("SUMMARY");
    documentModificationDateListContainerElement.appendChild(documentModificationDateListHeaderElement);
    documentModificationDateListHeaderElement.classList.add("document__modification-date-list__header");
    
    const documentModificationDateListTitleElement = document.createElement("H3");
    documentModificationDateListHeaderElement.appendChild(documentModificationDateListTitleElement);
    
    const documentModificationDateListTitleValue = document.createTextNode("Modifications");
    documentModificationDateListTitleElement.appendChild(documentModificationDateListTitleValue);
    
    const documentModificationDateListElement = document.createElement("UL");
    documentModificationDateListContainerElement.appendChild(documentModificationDateListElement);
    for (let modificationDate of content["document"]["modification-dates"]) {
        const documentModificationDateListItemElement = document.createElement("LI");
        documentModificationDateListElement.appendChild(documentModificationDateListItemElement);
        
        const documentModificationDateElement = document.createElement("P");
        documentModificationDateListItemElement.appendChild(documentModificationDateElement);
        documentModificationDateElement.classList.add("document__modification-date");
        
        const documentModificationDateValue = document.createTextNode(modificationDate);
        documentModificationDateElement.appendChild(documentModificationDateValue);
    }

    // Potential reviewers

    const documentPotentialReviewerListContainerElement = document.createElement("DETAILS");
    documentHeaderElement.appendChild(documentPotentialReviewerListContainerElement);
    documentPotentialReviewerListContainerElement.classList.add("document__header__header-field", "document__potential-reviewer-list");
    
    const documentPotentialReviewerListHeaderElement = document.createElement("SUMMARY");
    documentPotentialReviewerListContainerElement.appendChild(documentPotentialReviewerListHeaderElement);
    documentPotentialReviewerListHeaderElement.classList.add("document__potential-reviewer-list__header");
    
    const documentPotentialReviewerListTitleElement = document.createElement("H3");
    documentPotentialReviewerListHeaderElement.appendChild(documentPotentialReviewerListTitleElement);
    
    const documentPotentialReviewerListTitleValue = document.createTextNode("Potential reviewers");
    documentPotentialReviewerListTitleElement.appendChild(documentPotentialReviewerListTitleValue);
    
    const documentPotentialReviewerListElement = document.createElement("UL");
    documentPotentialReviewerListContainerElement.appendChild(documentPotentialReviewerListElement);
    for (let potentialReviewer of content["document"]["potential-reviewers"]) {
        const documentPotentialReviewerListItemElement = document.createElement("LI");
        documentPotentialReviewerListElement.appendChild(documentPotentialReviewerListItemElement);
        
        const documentPotentialReviewerElement = document.createElement("P");
        documentPotentialReviewerListItemElement.appendChild(documentPotentialReviewerElement);
        documentPotentialReviewerElement.classList.add("document__potential-reviewer");
        
        const documentPotentialReviewerValue = document.createTextNode(
            potentialReviewer["name"] + "," + potentialReviewer["contact"]
        );
        documentPotentialReviewerElement.appendChild(documentPotentialReviewerValue);
    }

    // Reviews

    const documentReviewListContainerElement = document.createElement("DETAILS");
    documentHeaderElement.appendChild(documentReviewListContainerElement);
    documentReviewListContainerElement.classList.add("document__header__header-field", "document__review-list");
    
    const documentReviewListHeaderElement = document.createElement("SUMMARY");
    documentReviewListContainerElement.appendChild(documentReviewListHeaderElement);
    documentReviewListHeaderElement.classList.add("document__review-list__header");
    
    const documentReviewListTitleElement = document.createElement("H3");
    documentReviewListHeaderElement.appendChild(documentReviewListTitleElement);
    
    const documentReviewListTitleValue = document.createTextNode("Reviews");
    documentReviewListTitleElement.appendChild(documentReviewListTitleValue);
    
    const documentReviewListElement = document.createElement("UL");
    documentReviewListContainerElement.appendChild(documentReviewListElement);
    if (content["document"]["reviews"].length === 0) {
        const documentNoReviewListItemElement = document.createElement("LI");
        documentReviewListElement.appendChild(documentNoReviewListItemElement);
        
        const documentNoReviewElement = document.createElement("P");
        documentNoReviewListItemElement.appendChild(documentNoReviewElement);
        
        const documentNoReviewValue = document.createTextNode("(currently no reviews)");
        documentNoReviewElement.appendChild(documentNoReviewValue);
    } else {
        for (let review of content["document"]["reviews"]) {
            const documentReviewListItemElement = document.createElement("LI");
            documentReviewListElement.appendChild(documentReviewListItemElement);
            
            const documentReviewElement = document.createElement("P");
            documentReviewListItemElement.appendChild(documentReviewElement);
            documentReviewElement.classList.add("document__review");
            
            const documentReviewValue = document.createTextNode(
                review["reviewer"] + "," + review["date"] + "," + review["remarks"]
            );
            documentReviewElement.appendChild(documentReviewValue);
        }
    }

    // Document's actions

    const documentActionListElement = document.createElement("UL");
    documentHeaderElement.appendChild(documentActionListElement);
    documentActionListElement.classList.add("document__header__header-field", "document__action-list");

    // Load the content from file

    // TIP: event handlers for loading the content from file on button click are defined elsewhere.

    const documentLoadContentFromFileActionListItemElement = document.createElement("LI");
    documentActionListElement.appendChild(documentLoadContentFromFileActionListItemElement);
    documentLoadContentFromFileActionListItemElement.classList.add("document__action", "document__load-content-from-file-action");

    const documentLoadContentFromFileActionButtonElement = document.createElement("BUTTON");
    documentLoadContentFromFileActionListItemElement.appendChild(documentLoadContentFromFileActionButtonElement);
    documentLoadContentFromFileActionButtonElement.classList.add("document__action__button", "document__load-content-from-file-action__button");
    
    const loadContentFromFileActionButtonValue = document.createTextNode("Load from file...");
    documentLoadContentFromFileActionButtonElement.appendChild(loadContentFromFileActionButtonValue);

    // Save the content to file

    // TIP: event handlers for saving the content to file on button click are defined elsewhere.

    const documentSaveContenteToFileActionListItemElement = document.createElement("LI");
    documentActionListElement.appendChild(documentSaveContenteToFileActionListItemElement);
    documentSaveContenteToFileActionListItemElement.classList.add("document__action", "document__save-content-to-file-action");

    const documentSaveContenteToFileActionButtonElement = document.createElement("BUTTON");
    documentSaveContenteToFileActionListItemElement.appendChild(documentSaveContenteToFileActionButtonElement);
    documentSaveContenteToFileActionButtonElement.classList.add("document__action__button", "document__save-content-to-file-action__button");
    
    const documentSaveContenteToFileActionButtonValue = document.createTextNode("Save to file...");
    documentSaveContenteToFileActionButtonElement.appendChild(documentSaveContenteToFileActionButtonValue);

    // List of categories

    const categoryListElement = document.createElement("UL");
    documentContainer.appendChild(categoryListElement);
    categoryListElement.classList.add("category-list");
    for (let categoryContent of content["categories"]) {
        const categoryElement = createCategoryElement(categoryContent, content["sources"]);
        categoryListElement.appendChild(categoryElement);
    }

    // New category form

    const newCategoryFormElementContent = {
        "container": {
            "basic-css-class": "new-item-form--basic--left",
            "full-css-class": "new-item-form--full--left",
            "basic-container-css-class": "new-item-form-container--basic--left",
            "full-container-css-class": "new-item-form-container--full--left"
        },
        "fields": [{
            "label": "New category's name",
            "element-type": "INPUT",
            "id": "add-category-name-input",
            "attributes": [],
            "values": undefined,
            "initial-value": "",
            "always-visible": true,
            "return-data-name": "name",
            "is-array": false
        }]
    };

    const newCategoryFormElement = createNewItemFormElement(
        newCategoryFormElementContent,
        function (categoryContent) {
            const categoryElement = createCategoryElement(categoryContent, content["sources"]);
            categoryListElement.appendChild(categoryElement);
        }
    );
    documentContainer.appendChild(newCategoryFormElement);

    return documentContainer;
}