import createMarkup from "./lib/create-markup.js";
import loadContentFromFile from "./lib/load-content-from-file.js";
import saveContentToFile from './lib/save-content-to-file.js';
import "./css/index.css";

document.addEventListener("DOMContentLoaded", function () {
    // Initial loading content from file with the default name

    const content = loadContentFromFile("exampleContent.json");
    const bodyElement = document.getElementsByTagName("BODY")[0];
    const markup = createMarkup(content);
    bodyElement.appendChild(markup);

    // Event handler for loading content from file on button click

    const loadContentFromFileActionButtonElement = document.getElementsByClassName("document__load-content-from-file-action__button")[0];
    loadContentFromFileActionButtonElement.addEventListener(
        "click",
        function () {
            const newContent = loadContentFromFile("exampleContent.json");
            const markup = createMarkup(newContent);
            Array.from(bodyElement.children).forEach(x => x.remove());
            bodyElement.appendChild(markup);
        }
    );

    // Event handler for saving content to file on button click

    const saveContentToFileActionButtonElement = document.getElementsByClassName("document__save-content-to-file-action__button")[0];
    saveContentToFileActionButtonElement.addEventListener(
        "click",
        function () {
            const currentContent = {
                "document": {
                    "title": document.getElementsByClassName("document__title")[0].firstChild,
                    "author": document.getElementsByClassName("document__author")[0].firstChild,
                    "modification-dates": Array.from(
                        document.getElementsByClassName("document__modification-date")
                    ).map(elem => elem.firstChild),
                    "potential-reviewers": Array.from(
                        document.getElementsByClassName("document__potential-reviewer")
                    ).map(elem => {
                        const x = elem.firstChild.textContent.split(",");
                        return {
                            "name": x[0],
                            "contact": x[1]
                        };
                    }),
                    "reviews": Array.from(
                        document.getElementsByClassName("document__review")
                    ).map(elem => {
                        const x = elem.firstChild.textContent.split(",");
                        return {
                            "reviewer": x[0],
                            "date": x[1],
                            "remarks": x[2]
                        };
                    })
                },
                "categories": Array.from(
                    document.getElementsByClassName("category")
                ).map(categoryElem => {
                    return {
                        "name": categoryElem.getElementsByClassName("category__name")[0].firstChild,
                        "subcategories": Array.from(
                            categoryElem.getElementsByClassName("subcategory")
                        ).map(subcategoryElem => {
                            return {
                                "name": subcategoryElem.getElementsByClassName("subcategory__name")[0].firstChild,
                                "terms": Array.from(
                                    subcategoryElem.getElementsByClassName("term")
                                ).map(termElem => {
                                    const x = termElem.getElementsByClassName("term__name")[0].firstChild.textContent.split("(");
                                    return {
                                        /* get rid of the space at the end */
                                        "name": x[0].slice(0, x[0].length - 2),
                                        "other-names": x[1],
                                        "sources": Array.from(
                                            termElem.getElementsByClassName("term__source")
                                        ).map(sourceElem => sourceElem.firstChild),
                                        "experience": termElem.getElementsByClassName("term__experience-property")[0].firstChild,
                                        "is-to-learn": termElem.getElementsByClassName("term__is-to-learn-property")[0].firstChild,
                                        "is-project-done": termElem.getElementsByClassName("term__is-project-done-property")[0].firstChild
                                    };
                                })
                            };
                        })
                    };
                })
            };
            saveContentToFile("exampleContent.json", currentContent);
        }
    );
});