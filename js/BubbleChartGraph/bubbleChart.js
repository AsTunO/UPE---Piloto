import generateGraph from "../Tools/AuxFunctions/generateGraph.js"

function bubbleChart() {

    let activity = 0
    generateGraph(activity)
    const selectorActivities = document.getElementById('activity-select');
    const tagGraph = document.getElementById('tag');

    function updateFields() {
        activity = selectorActivities.selectedIndex
        generateGraph(activity)
        tagGraph.textContent = selectorActivities.options[selectorActivities.selectedIndex].text
    }
    selectorActivities.addEventListener('change', () => updateFields())
}

export default bubbleChart