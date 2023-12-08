import filterData from "../FiltersFunctions/filterData.js";
import createGraph from "../../LineChart/createGraph.js";

let latestExecutionId = 0;

async function generateGraph(student, activity, average, datumBubble) {
    const executionId = ++latestExecutionId;

    try {
        const data = await Promise.all([
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
            };
        });

        // Verifica se essa chamada é a mais recente antes de prosseguir
        if (executionId === latestExecutionId) {
            const DATASTORE = data;
            const dataToBePlotted = filterData(DATASTORE, student, activity);

            console.log("Chamou");
            console.log(dataToBePlotted);

            createGraph(dataToBePlotted, student, datumBubble);
        }
    } catch (error) {
        console.error("Erro ao gerar gráfico: " + error.message);
    }
}

export default generateGraph;
