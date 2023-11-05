import getDomainsContent from "../GetsFunctions/getDomainsContent.js"
import getBubbleGraphStructure from "../GetsFunctions/getBubbleGraphStructure.js"
import getBubblesContent from "../GetsFunctions/getBubblesContent.js"
import filterLogsByActivity from "./filterLogsByActivity.js"
import sortEventsByTime from "../SortsFunctions/sortEventsByTime.js"
import filterQuizGradesByActivity from "../FiltersFunctions/filterQuizGradesByActivity.js"

function filterData(DATASTORE, activity) {

    let dataToBePlotted = {
        domainContent: null,
        bubblesContent: null
    }

    DATASTORE.logs = sortEventsByTime(filterLogsByActivity(DATASTORE.logs, DATASTORE.quizList[activity]))
    DATASTORE.quizGrades = filterQuizGradesByActivity(DATASTORE.quizGrades, DATASTORE.quizList[activity].id)
    console.log(DATASTORE.logs)
    const logsByUser = _.groupBy(DATASTORE.logs, 'userid');
    const uniqueLogs = [];

    for (const userid in logsByUser) {
        const userLogs = logsByUser[userid];
        for (const log of userLogs) {
            const event = DATASTORE.eventMapping.find((event) => {
                return log.component === event.component && log.action === event.action && log.target === event.target;
            });
            log["event"] = event.class;
        }
        const uniqueUserLogs = _.uniqBy(userLogs, (e) => e.event);
        uniqueLogs.push(...uniqueUserLogs);
    }
    DATASTORE.logs = uniqueLogs.sort((a, b) => a.userid - b.userid);
    console.log(DATASTORE.logs)

    dataToBePlotted.domainContent = getDomainsContent(DATASTORE.quizList[activity])
    let bubbleStructureData = getBubbleGraphStructure(dataToBePlotted.domainContent)
    dataToBePlotted.bubblesContent = getBubblesContent(DATASTORE, bubbleStructureData)

    return dataToBePlotted

}

export default filterData