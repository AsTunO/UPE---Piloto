import getUserGrade from "../GetsFunctions/getUserGrade.js"
import epochToDate from "../DateFunctions/epochToDate.js"

function filterWithoutFirstAccess(DATASTORE, bubbleStructureData) {

    let bubblesData = bubbleStructureData

    DATASTORE.logs.forEach((current) => {
        DATASTORE.eventMapping.forEach((event) => {
            if (current.component == event.component && current.action == event.action && current.target == event.target) {
                if (event.class != "forum_followup" && event.class != "message_read" && event.class != "message_sent") {
                    bubblesData.forEach((currentBubble) => {
                        if ((event.class == currentBubble.event) && (d3.timeFormat("%A, %d")(epochToDate(current.t)) == currentBubble.date)) {
                            currentBubble.totalCases += 1
                            currentBubble.totalSumOfGrades += getUserGrade(current.userid, DATASTORE)
                        }
                    })
                }
            }
        })
    })
    return bubblesData
}

export default filterWithoutFirstAccess