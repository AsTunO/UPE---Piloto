import populateCbOptions from "./populateCbOptions.js";

function populateSelect(content, IDTag, idField, nameField) {

    let result = [];

    content.forEach((e) => {
        result.push({ 
            id: e[idField], 
            text: e[nameField] 
        })
    });
 
    populateCbOptions(document.getElementById(IDTag), result)
}

export default populateSelect