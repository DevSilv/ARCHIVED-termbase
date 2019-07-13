export default function saveContentToFile(filename, content) {
    // The parameter "filename" is the name of a file.
    // The parameter "content" is a JavaScript object.
    // The function does not return anything.

    if (!fs.existsSync("./termbase")) {
        fs.mkdirSync("./termbase");
    }

    if (!fs.existsSync("./termbase/data")) {
        fs.mkdirSync("./termbase/data");
    }

    if (!fs.existsSync(`./termbase/data/${filename}`)) {
        fs.writeFile(`./termbase/data/${filename}`, content);
    } else {
        const confirmed = confirm(`The file 'termbase/data/${filename}' already exists. Do you want to override it?`);
        if (confirmed) {
            fs.writeFile(`./termbase/data/${filename}`, content, () => { alert("Data saved."); });
        } else {
            alert("Nothing done.");
        }
    }
}