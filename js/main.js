import createGraph from "./BubbleChart/createGraph.js";
import populateSelectFilters from "./Tools/AuxFunctions/populateSelectFilters.js";
import filterLogsByPeriodAndActivity from "./Tools/FiltersFunctions/filterLogsByPeriodAndActivity.js"

Promise.all([
    d3.csv("./data/see_course2060_quiz_list.csv"),
    d3.csv("./data/see_course2060_12-11_to_11-12_logs_filtered.csv")
]).then(function (data) {

    const quizList = data[0]
    const logs = data[1]

    const activities = populateSelectFilters(quizList)
    //const graphData = filterLogsByPeriodAndActivity(logs, activities, quizList)


    //const data_to_be_plotted = filterData(quiz_list, logs)

    const defaultData = [{ date: "Tuesday, 19", event: "course_vis", tot: 10 }, { date: "Saturday, 23", event: "resource_vis", tot: 20 }, { date: "Monday, 25", event: "assignment_vis", tot: 30 }, { date: "Saturday, 23", event: "assignment_try", tot: 40 }, { date: "Friday, 22", event: "assignment_sub", tot: 50 }]
    const domainContent = {x : ["Tuesday, 19","Wednesday, 20","Thursday, 21","Friday, 22","Saturday, 23","Sunday, 24","Monday, 25","Tuesday, 26"],
                            y: ["course_vis", "resource_vis", "forum_vis", "forum_participation", "assignment_vis", "assignment_try", "assignment_sub"]}
    
    createGraph(domainContent, defaultData)

    /*const selectorActivities = document.getElementById('activities');
    selectorActivities.addEventListener('change', () => {})*/
})