import generateGraph from "./Tools/AuxFunctions/generateGraph.js"
import populateSelectFilters from "./Tools/AuxFunctions/populateSelectFilters.js"

let firstAccess = false
let activity = 0

d3.csv("./data/see_course2060_quiz_list.csv").then(data => {
    populateSelectFilters(data)
});

generateGraph(activity, firstAccess)

const selectorActivities = document.getElementById('activities');
const checkboxContent = document.getElementById('checkbox-content');
let tagGraph = document.getElementById('student-name-graph');

function updateFields() {

    checkboxContent.checked ? firstAccess = true : firstAccess = false
    activity = selectorActivities.selectedIndex
    generateGraph(activity, firstAccess)
    tagGraph.textContent = selectorActivities.options[selectorActivities.selectedIndex].text

}
selectorActivities.addEventListener('change', () => updateFields())
checkboxContent.addEventListener('change', () => updateFields())

