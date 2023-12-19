import populateUlList from "../../../../../Tools/AuxFunctions/populateUlList.js";

function populateSelect(content, IDTag, idField, nameField) {

    let result = [];

    content.forEach((e) => {
        result.push({ 
            id: e[idField], 
            text: e[nameField] 
        });
    });

    result.sort((a, b) => {
        const textA = a.text.toUpperCase();
        const textB = b.text.toUpperCase();

        if (textA < textB) {
            return -1;
        }
        if (textA > textB) {
            return 1;
        }
        return 0;
    });

    console.log(result);
    populateUlList(document.getElementById("students-list"), result);
}

export default populateSelect;
