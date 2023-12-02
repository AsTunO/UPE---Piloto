import filterData from "../FiltersFunctions/filterData.js";
import createGraph from "../../LineChart/createGraph.js";
import getUserGrade from "../GetsFunctions/getUserGrade.js";
import setStudentGrade from "../SetsFunctions/setStudentGrade.js";

async function generateGraph(student, activity, average, datumBubble) {

    let data = Promise.all([
        d3.csv("./data/see_course2060_12-11_to_11-12_logs_filtered.csv"),
        d3.csv("./data/event_mapping.csv"),
        d3.csv("./data/see_course2060_quiz_grades.csv"),
        d3.csv("./data/see_course2060_quiz_list.csv")
    ]).then(function (filesRead) {
        return {
            logs: filesRead[0],
            eventMapping: filesRead[1],
            quizGrades: filesRead[2],
            quizList: filesRead[3]
        }
    });

    const DATASTORE = await data;
    let dataToBePlotted = filterData(DATASTORE, student, activity)


    createGraph(dataToBePlotted, student, datumBubble)

}

export default generateGraph