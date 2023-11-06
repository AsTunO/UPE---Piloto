import createGraph from "./createBubbleGraph.js";
import filterData from "../FiltersFunctions/filterData.js";

async function generateGraph(activity) {

    let data = Promise.all([
        d3.csv("./data/see_course2060_quiz_list.csv"),
        d3.csv("./data/see_course2060_12-11_to_11-12_logs_filtered.csv"),
        d3.csv("./data/event_mapping.csv"),
        d3.csv("./data/see_course2060_quiz_grades.csv"),
        d3.csv("./data/user_list_see.csv")
    ]).then(function (filesRead) {
        return {
            quizList: filesRead[0],
            logs: filesRead[1],
            eventMapping: filesRead[2],
            quizGrades: filesRead[3],
            users: filesRead[4]
        }
    });

    const DATASTORE = await data;
    let dataToBePlotted = filterData(DATASTORE, activity)
    dataToBePlotted["totalStudents"] = (DATASTORE.users).length
    createGraph(dataToBePlotted, activity)
}

export default generateGraph