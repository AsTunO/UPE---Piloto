import createGraph from "./BubbleChart/createGraph.js";
import populateSelectFilters from "./Tools/AuxFunctions/populateSelectFilters.js";
import filterLogsByPeriodAndActivity from "./Tools/FiltersFunctions/filterLogsByPeriodAndActivity.js";
import filterData from "./Tools/FiltersFunctions/filterData.js";
import getDomainsContent from "./Tools/GetsFunctions/getDomainsContent.js";

Promise.all([
    d3.csv("./data/see_course2060_quiz_list.csv"),
    d3.csv("./data/see_course2060_12-11_to_11-12_logs_filtered.csv"),
    d3.csv("./data/event_mapping.csv")
]).then(function (data) {

    const quizList = data[0]
    const logs = data[1]
    const eventMapping = data[2]

    const activities = populateSelectFilters(quizList)
    const graphData = filterLogsByPeriodAndActivity(logs, activities, quizList)

    const index = 0
    const domainContent = getDomainsContent(graphData[index].logs) 
    const data_to_be_plotted = filterData(graphData[index].logs, eventMapping, domainContent)

    
    createGraph(domainContent, data_to_be_plotted)

    const selectorActivities = document.getElementById('activities');
    let tagGraph = document.getElementById('student-name-graph');
    selectorActivities.addEventListener('change', () => {
        tagGraph.textContent = selectorActivities.options[selectorActivities.selectedIndex].text;
        const index = selectorActivities.selectedIndex
        const domainContent = getDomainsContent(graphData[index].logs)
        const data_to_be_plotted = filterData(graphData[index].logs, eventMapping, domainContent)
        createGraph(domainContent, data_to_be_plotted)
    })
})