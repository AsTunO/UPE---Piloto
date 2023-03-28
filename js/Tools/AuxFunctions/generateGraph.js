import createGraph from "../../BubbleChart/createGraph.js";
import filterData from "../FiltersFunctions/filterData.js";
import populateSelectFilters from "../AuxFunctions/populateSelectFilters.js"

async function generateGraph(activity, firstAccess) {

    let data = Promise.all([
        d3.csv("./data/see_course2060_quiz_list.csv"),
        d3.csv("./data/see_course2060_12-11_to_11-12_logs_filtered.csv"),
        d3.csv("./data/event_mapping.csv"),
        d3.csv("./data/see_course2060_quiz_grades.csv")
    ]).then(function (filesRead) {
        return {
            quizList: filesRead[0],
            logs: filesRead[1],
            eventMapping: filesRead[2],
            quizGrades: filesRead[3]
        }
    });
    
    const DATASTORE = await data;
    populateSelectFilters(DATASTORE.quizList)
    let dataToBePlotted = filterData(DATASTORE, activity, firstAccess)
    createGraph(dataToBePlotted, firstAccess)
}

export default generateGraph