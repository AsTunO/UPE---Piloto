import populateUlList from "../../../../../Tools/AuxFunctions/populateUlList.js";

function populateSelect(content, IDTag, idField, nameField) {

    let result = [];

    content.forEach((e) => {
        result.push({ 
            id: e[idField], 
            text: e[nameField] 
        })
    });
    populateUlList(document.getElementById("students-list"), result)

}

export default populateSelect