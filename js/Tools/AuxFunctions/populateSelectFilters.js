import populateCbOptions from "./populateCbOptions.js";

function populateSelectFilters(content) {

    let activities= [];

    content.forEach((e) => {
        activities.push({id: e.id, text: e.name})
    });

    activities.pop()

    populateCbOptions(document.getElementById("activities"), activities)

}

export default populateSelectFilters