import populateCbOptions from "./populateCbOptions.js";

function populateSelectFilters(content) {
    let activities= [];
    content.forEach((e) => {
        activities.push({id: e.id, text: e.name})
    });
    populateCbOptions(document.getElementById("activity-select"), activities)
}
export default populateSelectFilters